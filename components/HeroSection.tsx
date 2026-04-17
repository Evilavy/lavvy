"use client";
import { Calendar } from "lucide-react";
import { HeroShader } from "@/components/HeroShader";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Shader background */}
      <div className="absolute inset-0 z-0">
        <HeroShader />
      </div>

      <div className="relative z-20 flex flex-col items-center text-center px-4 pt-28 pb-16 pointer-events-none">
        {/* Service tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {["Strategy", "UX/UI Design", "Development", "SEO & Support"].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/40 px-5 py-2 text-sm text-white bg-white/10 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Headline — Apple Liquid Glass text */}
        <h1
          className="max-w-5xl text-5xl md:text-7xl lg:text-[4rem] font-bold leading-[1.05] tracking-tight"
          style={{
            background:
              "linear-gradient(160deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.55) 35%, rgba(200,225,255,0.85) 60%, rgba(255,255,255,0.95) 80%, rgba(255,255,255,0.5) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter:
              "drop-shadow(0 1px 0 rgba(255,255,255,0.6)) drop-shadow(0 2px 12px rgba(180,210,255,0.35)) drop-shadow(0 4px 24px rgba(0,0,0,0.25))",
          }}
        >
          La brique manquante de votre activité : un site web qui convertit.
        </h1>

        {/* Subheadline */}
        <p className="mt-8 max-w-xl text-base leading-relaxed text-white/80">
          On conçoit des sites clairs, rapides et efficaces pour les entreprises qui veulent être visibles et convertir en ligne.        </p>

        {/* CTA */}
        <div className="mt-10 flex items-center gap-3">
          <div className="relative">
            <button className="pointer-events-auto flex items-center gap-3 rounded-2xl bg-white px-7 py-4 text-base font-semibold text-brand-dark shadow-lg transition-transform hover:scale-[1.02]">
              <Calendar className="w-5 h-5" />
              Obtenir mon audit gratuit
            </button>
            <p className="text-xs text-white">Réponse en moins de 24h — sans engagement</p>
          </div>
          <div className="relative">
            <div className="h-14 w-14 rounded-lg overflow-hidden border-2 border-[#0967c2]">
              <img
                src="https://i.scdn.co/image/ab67616100005174df3a8706ed65e617d97f62a4"
                alt="Team member"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="absolute top-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}
