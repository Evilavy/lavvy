"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// GLSL shaders
// ---------------------------------------------------------------------------

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// CRT effect: barrel distortion + slot-mask phosphor pattern + brightness grade
const FRAG = /* glsl */ `
  precision highp float;

  uniform sampler2D uTex;
  uniform vec2      uRes;         // taille du canvas en pixels physiques (après DPR)
  uniform float     uCanvasAspect;  // ratio W/H du canvas (mis à jour au resize)
  uniform float     uVideoAspect;   // ratio W/H de la vidéo source
  uniform float     uVideoOffsetY;  // décalage vertical (-0.5 = haut, +0.5 = bas)
  varying vec2      vUv;

  // ======================================================================
  // TUNING — tous les paramètres visuels ici, dans l'ordre de pipeline
  // ======================================================================

  // Exposition globale — c'est LE curseur principal si trop blanc ou trop sombre.
  // 1.0 = neutre  |  0.7 = assombri  |  1.3 = surexposé
  const float EXPOSURE     = 0.88;

  // Courbure de l'écran (distorsion en barrique).
  // 0.0 = écran plat  |  0.1 = légère courbure  |  0.3 = vieux CRT bombé
  const float BARREL       = 0.14;

  // Boost lumineux appliqué uniquement aux hautes lumières.
  // 1.0 = aucun boost  |  1.15 = pop subtil  |  1.5 = fort (éviter >1.3)
  const float BRIGHTNESS   = 1.08;

  // Relève les noirs (lueur résiduelle CRT dans le noir).
  // 0.0 = noirs purs  |  0.05 = imperceptible mais réaliste  |  0.2 = visible
  const float SHADOW_LIFT  = 0.04;

  // Taille d'une cellule phosphor et opacité du grain — passées en uniforms
  // pour pouvoir les ajuster dynamiquement selon la taille de l'écran.
  uniform float uCell;        // calculé en JS : physicalWidth / ~600 triads
  uniform float uMaskOpacity; // 0 sur mobile, 0.45 sur desktop

  // Seuil luma pour le bloom — pixels EN DESSOUS ne blooment PAS.
  // 0.6 = seulement les reflets très clairs  |  0.3 = zones claires  |  0.0 = tout (banding!)
  const float BLOOM_THRESH = 0.6;

  // Intensité du bloom additif final.
  // 0.0 = pas de bloom  |  0.15 = halo doux  |  0.5 = fort
  const float BLOOM_INT    = 0.18;

  // Largeur du fondu vers le noir sur les bords INTÉRIEURS du barrel.
  // C'est ce qui évite la coupure franche.
  // 0.03 = très serré (fondu fin)  |  0.10 = large dégradé  |  0.20 = très progressif
  const float VIGNETTE     = 0.01;


  // ======================================================================
  // Fonctions internes (normalement pas besoin de modifier)
  // ======================================================================

  float luma(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }

  // Distorsion en barrique
  vec2 barrel(vec2 uv) {
    vec2 c = uv - 0.5;
    return uv + c * dot(c, c) * BARREL;
  }

  // object-fit: cover — recadre la vidéo pour remplir le canvas sans déformer.
  // Si le canvas est plus large que la vidéo → rogne haut/bas.
  // Si le canvas est plus haut que la vidéo → rogne gauche/droite.
  vec2 coverUv(vec2 uv) {
    vec2 scale = uCanvasAspect > uVideoAspect
      ? vec2(1.0, uCanvasAspect / uVideoAspect)
      : vec2(uVideoAspect / uCanvasAspect, 1.0);
    return (uv - 0.5) / scale + 0.5 + vec2(0.0, uVideoOffsetY);
  }

  // Slot-mask : bandes phosphor R/G/B horizontales, rangées alternées.
  vec3 slotMask(vec2 pix, vec3 col) {
    float row  = floor(pix.y / uCell);
    float xOff = mod(row, 2.0) > 0.5 ? uCell * 0.5 : 0.0;

    float tx  = mod(pix.x + xOff, uCell * 3.0);
    float chan = floor(tx / uCell);  // 0=R  1=G  2=B
    vec3  sel  = vec3(
      step(chan, 0.5),
      step(0.5, chan) * step(chan, 1.5),
      step(1.5, chan)
    );

    float lx = fract(tx / uCell);
    float h  = smoothstep(0.0, 0.2, lx) * (1.0 - smoothstep(0.8, 1.0, lx));

    return col * sel * 2.8 * h;
  }


  // Grade : boost highlights + relève les noirs
  vec3 grade(vec3 c) {
    float l = luma(c);
    c *= mix(1.0, BRIGHTNESS, smoothstep(0.2, 1.0, l));  // boost highlights
    c += SHADOW_LIFT * smoothstep(0.3, 0.0, l);          // lift shadows
    return c;
  }

  // Bloom pur Gaussian — utilise des poids constants pour éviter tout banding.
  // Les poids luma du bloom précédent causaient les "couches de couleurs" sur les dégradés.
  vec3 bloom(vec2 uv, vec2 texel) {
    // Poids gaussiens 1D normalisés pour kernel 5-tap : [0.06, 0.24, 0.40, 0.24, 0.06]
    float w[5];
    w[0] = 0.0625; w[1] = 0.25; w[2] = 0.375; w[3] = 0.25; w[4] = 0.0625;

    vec3 acc = vec3(0.0);
    for (int i = -2; i <= 2; i++) {
      for (int j = -2; j <= 2; j++) {
        vec2 off = vec2(float(i), float(j)) * texel * 4.0;
        vec3 s   = texture2D(uTex, uv + off).rgb;
        // Seuil dur : seuls les pixels au-dessus de BLOOM_THRESH contribuent
        float contrib = max(0.0, luma(s) - BLOOM_THRESH);
        acc += s * contrib * w[i + 2] * w[j + 2];
      }
    }
    return acc;  // additif — pas de division, l'amplitude est déjà calibrée
  }

  void main() {
    vec2 distUv  = barrel(vUv);
    vec2 texel   = 1.0 / uRes;

    // Noir pur hors du barrel
    if (distUv.x < 0.0 || distUv.x > 1.0 || distUv.y < 0.0 || distUv.y > 1.0) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
      return;
    }

    // Applique le cover APRÈS le barrel pour que le recadrage
    // suive la courbure de l'écran (comportement naturel)
    vec2 videoUv = coverUv(distUv);
    vec3 raw = texture2D(uTex, videoUv).rgb;

    // 1. Exposition + grade
    vec3 col = grade(raw * EXPOSURE);

    // 2. Slot-mask (mixé pour préserver la netteté de l'image si uMaskOpacity faible)
    col = mix(col, slotMask(distUv * uRes, col), uMaskOpacity);

    // 3. Bloom additif interne
    col += bloom(videoUv, texel) * BLOOM_INT;

    // 4. Vignette de bord : fondu progressif vers le noir sur les marges du barrel.
    //    edgeDist = 0 à l'exact bord du barrel, augmente vers le centre.
    //    smoothstep(0, VIGNETTE, edgeDist) → 0 au bord → 1 à l'intérieur.
    float edgeDist = min(min(distUv.x, 1.0 - distUv.x), min(distUv.y, 1.0 - distUv.y));
    float vignette = smoothstep(0.0, VIGNETTE, edgeDist);
    col *= vignette;

    gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
  }
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

// requestVideoFrameCallback is a newer API not yet in all TS lib targets.
type VideoFrameCallback = VideoFrameRequestCallback;
type VideoWithRVFC = HTMLVideoElement & {
  requestVideoFrameCallback(cb: VideoFrameCallback): number;
  cancelVideoFrameCallback(handle: number): void;
};

export function HeroShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ---- Video element with manual loop --------------------------------
    const video = document.createElement("video") as VideoWithRVFC;
    video.src = "/max.webm";
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";

    // ---- Three.js WebGL renderer ----------------------------------------
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    // Full-screen quad — no projection needed; shader writes clip-space directly
    const camera = new THREE.PerspectiveCamera();
    const geometry = new THREE.PlaneGeometry(2, 2);

    // Use THREE.VideoTexture but we control needsUpdate ourselves
    const texture = new THREE.VideoTexture(video);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    const uRes = new THREE.Vector2(1, 1);
    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        uTex: { value: texture },
        uRes: { value: uRes },
        uCanvasAspect: { value: 1.0 },
        uVideoAspect: { value: 16 / 9 },
        uCell: { value: 2.5 },
        uMaskOpacity: { value: 0.0 },
        uVideoOffsetY: { value: 0.08 },
      },
      depthTest: false,
      depthWrite: false,
    });

    scene.add(new THREE.Mesh(geometry, material));

    // ---- Resize --------------------------------------------------------
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) return;

      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      uRes.set(w * dpr, h * dpr);
      material.uniforms.uCanvasAspect.value = w / h;

      // Slot-mask : adapter la taille des cellules à la résolution physique.
      // On vise ~600 triads sur la largeur → cellule = physicalWidth / 1800.
      // Minimum 1.5px pour que le pattern reste perceptible sur grand écran.
      // Sur mobile (< 600 CSS px) on désactive complètement le grain.
      const physW = w * dpr;
      material.uniforms.uCell.value = Math.max(2.5, physW / 1200);
      material.uniforms.uMaskOpacity.value = 0.0;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ---- Render loop ---------------------------------------------------
    let rafId = 0;
    const renderLoop = () => {
      rafId = requestAnimationFrame(renderLoop);
      renderer.render(scene, camera);
    };
    rafId = requestAnimationFrame(renderLoop);

    // ---- Frame-accurate texture updates via requestVideoFrameCallback --
    // This API fires exactly once per new video frame that is ready for display.
    // It prevents Three.js from ever sampling a "pre-buffered" frame that the
    // browser has decoded speculatively for loop preparation — which is the
    // root cause of the visible jump.
    let rvfcHandle = 0;

    const onVideoFrame: VideoFrameCallback = (_now, metadata) => {
      texture.needsUpdate = true;

      // Manual loop: seek to 0 near the end to avoid browser pre-buffering jump
      if (video.duration > 0 && metadata.mediaTime >= video.duration - 0.1) {
        video.currentTime = 0;
        // Don't re-register here; the seeked listener will re-register
        return;
      }

      rvfcHandle = video.requestVideoFrameCallback(onVideoFrame);
    };

    // Fallback for browsers without requestVideoFrameCallback (Firefox, Safari <17)
    const useFallback = typeof video.requestVideoFrameCallback !== "function";
    let fallbackLoopGuard = false;

    const onTimeUpdate = () => {
      texture.needsUpdate = true;
      if (!fallbackLoopGuard && video.duration > 0 && video.currentTime >= video.duration - 0.1) {
        fallbackLoopGuard = true;
        video.currentTime = 0;
        video.play().finally(() => { fallbackLoopGuard = false; });
      }
    };

    if (useFallback) {
      video.addEventListener("timeupdate", onTimeUpdate);
    }

    // After a manual seek completes, resume frame callbacks
    video.addEventListener("seeked", () => {
      if (!useFallback && video.duration > 0) {
        rvfcHandle = video.requestVideoFrameCallback(onVideoFrame);
      }
    });

    video.addEventListener("loadedmetadata", () => {
      // Mettre à jour le ratio réel de la vidéo
      material.uniforms.uVideoAspect.value =
        video.videoWidth / Math.max(video.videoHeight, 1);
      video.play().then(() => {
        if (!useFallback) {
          rvfcHandle = video.requestVideoFrameCallback(onVideoFrame);
        }
      });
    });


    video.load();

    // ---- Cleanup -------------------------------------------------------
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      if (!useFallback) {
        video.cancelVideoFrameCallback(rvfcHandle);
      } else {
        video.removeEventListener("timeupdate", onTimeUpdate);
      }
      video.pause();
      video.src = "";
      texture.dispose();
      material.dispose();
      geometry.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
