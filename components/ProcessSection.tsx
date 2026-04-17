"use client";

import { useRef, useEffect } from "react";

const steps = [
  {
    num: "01",
    title: "Phase de découverte",
    desc: "On prend le temps de comprendre vos objectifs, vos points de douleur, votre audience et ce qui vous différencie vraiment de la concurrence.",
  },
  {
    num: "02",
    title: "Lancement de projet",
    desc: "On pose les bases : périmètre, jalons, outils et processus. Tout le monde est aligné avant de plonger dans le travail.",
  },
  {
    num: "03",
    title: "Design & développement",
    desc: "On conçoit des interfaces sur-mesure, pensées pour convertir, puis on développe un site rapide, robuste et évolutif.",
  },
  {
    num: "04",
    title: "Lancement & support",
    desc: "On lance et on reste là. Suivi des performances, optimisations continues, SEO et support à long terme pour que votre site grandisse avec vous.",
  },
];

export function ProcessSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const wrapper = wrapperRef.current;
      const track = trackRef.current;
      if (!wrapper || !track) return;

      const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
      const scrolled = window.scrollY - wrapperTop;
      const totalScrollable = wrapper.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

      const maxTranslate = track.scrollWidth - window.innerWidth;
      track.style.transform = `translateX(-${progress * maxTranslate}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={wrapperRef} style={{ height: "350vh" }}>
      <div className="sticky top-0 bg-white overflow-hidden" style={{ height: "100vh" }}>
        <div style={{ paddingTop: "max(0px, calc(50vh - 300px))" }}>
        <div
          ref={trackRef}
          className="flex"
          style={{ width: "max-content", willChange: "transform", height: "600px" }}
        >
          {/* Title column */}
          <div
            className="flex flex-col justify-between py-16 px-14 min-w-[460px]"
            style={{ height: "600px" }}
          >
            <span className="text-xs tracking-[0.2em] uppercase" style={{ color: "#0967c2" }}>
              (Processus)
            </span>
            <h2 className="text-[#111] text-[7rem] font-black leading-[0.88] uppercase tracking-tight">
              Notre<br />façon<br />de faire
            </h2>
          </div>

          {/* Step cards */}
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="relative flex flex-col justify-between py-16 px-14 min-w-[300px]"
              style={{ height: "600px", border: "1px solid #0967c2" }}
            >
              <span className="text-xs tracking-[0.2em] uppercase" style={{ color: "#0967c2" }}>
                Étape {i + 1}.
              </span>
              <div>
                <h3 className="text-[#111] text-4xl font-bold leading-tight">
                  {step.title}
                </h3>
                <p className="mt-5 text-base leading-relaxed max-w-[320px]" style={{ color: "#555" }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}

          {/* Trailing space so last card doesn't end at viewport edge */}
          <div className="min-w-[160px]" />
        </div>
        </div>
      </div>
    </div>
  );
}
