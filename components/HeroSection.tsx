"use client";
import { useState } from "react";
import { Calendar, Sparkles, Video } from "lucide-react";
import { HeroShader } from "@/components/HeroShader";

export function HeroSection() {
  const [shaderEnabled, setShaderEnabled] = useState(true);
  const tags = ["Strategy", "UX/UI Design", "Development", "SEO & Support"];

  return (
    <section className="relative min-h-screen flex flex-col items-center overflow-hidden bg-black">
      {/* Mobile background image */}
      <div
        className="absolute inset-0 z-0 block lg:hidden"
        style={{
          backgroundImage: "url('/mobile.png')",
          backgroundSize: "cover",
          backgroundPosition: "center calc(50% - 50px)",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Desktop : vidéo avec shader CRT ou brute */}
      <div className="absolute inset-0 z-0 hidden lg:block">
        {shaderEnabled ? (
          <HeroShader />
        ) : (
          <div className="absolute inset-0 overflow-hidden">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              style={{ transform: "scale(1.2) translateY(8%)" }}
              src="/max.webm"
              autoPlay
              muted
              playsInline
              loop
              preload="auto"
            />
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => setShaderEnabled((v) => !v)}
        className="pointer-events-auto fixed top-24 right-5 z-30 hidden lg:inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/45 px-4 py-2 text-sm text-white backdrop-blur-sm transition-colors hover:bg-black/60"
        aria-pressed={shaderEnabled}
        aria-label={
          shaderEnabled
            ? "Désactiver l'effet sur la vidéo de fond"
            : "Activer l'effet sur la vidéo de fond"
        }
      >
        {shaderEnabled ? (
          <>
            <Sparkles className="h-4 w-4 shrink-0" aria-hidden />
            Effet CRT
          </>
        ) : (
          <>
            <Video className="h-4 w-4 shrink-0" aria-hidden />
            Vidéo brute
          </>
        )}
      </button>

      {/* Tags — mobile only, collés en haut */}
      <div className="relative z-20 flex lg:hidden flex-wrap justify-center gap-3 px-4 pt-28 pointer-events-none">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/40 px-5 py-2 text-sm text-white bg-white/10 backdrop-blur-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Main content — centré desktop, poussé en bas mobile */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 pb-16 mt-auto lg:mt-0 lg:py-28 pointer-events-none">
        {/* Tags — desktop only */}
        <div className="hidden lg:flex flex-wrap justify-center gap-3 mb-12">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/40 px-5 py-2 text-sm text-white bg-white/10 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Headline */}
        <h1
          className="max-w-5xl text-3xl md:text-5xl lg:text-[4rem] font-bold leading-[1.05] tracking-tight"
          style={{
            background:
              "linear-gradient(160deg, #ffffff 0%, #ddeeff 40%, #c8e1ff 60%, #ffffff 80%, #dceeff 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter:
              "drop-shadow(0 0 14px rgba(0,0,0,0.75)) drop-shadow(0 0 36px rgba(0,0,0,0.55))",
          }}
        >
          La brique manquante de votre activité : un site web qui convertit.
        </h1>

        {/* Subheadline */}
        <p className="mt-16 lg:mt-30 max-w-xl text-base leading-relaxed text-white">
          On conçoit des sites clairs, rapides et efficaces pour les entreprises qui veulent être visibles et convertir en ligne.
        </p>

        {/* CTA */}
        <div className="mt-10 flex items-end gap-3">
          <div className="relative flex flex-col items-start">
            <button className="pointer-events-auto flex items-center gap-3 rounded-2xl bg-white px-7 py-4 text-base font-semibold text-brand-dark shadow-lg transition-transform hover:scale-[1.02]">
              <Calendar className="w-5 h-5" />
              Obtenir mon audit gratuit
            </button>
            <p className="text-xs text-white mt-2">Réponse en moins de 24h — sans engagement</p>
          </div>
        </div>
      </div>
    </section>
  );
}
