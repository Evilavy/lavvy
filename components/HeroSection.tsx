"use client";
import { Calendar } from "lucide-react";
import { Boxes } from "@/components/ui/background-boxes";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white">
      {/* Animated boxes background */}
      <Boxes />
      {/* Fade mask */}
      <div className="pointer-events-none absolute inset-0 bg-white z-10 [mask-image:radial-gradient(ellipse_50%_60%_at_50%_50%,transparent_20%,white_60%)]" />

      <div className="relative z-20 flex flex-col items-center text-center px-4 pt-28 pb-16 pointer-events-none">
        {/* Service tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {["Strategy", "UX/UI Design", "Development", "SEO & Support"].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-5 py-2 text-sm text-brand-foreground bg-white"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Headline */}
        <h1 className="max-w-5xl text-5xl md:text-7xl lg:text-[4.5rem] font-bold leading-[1.05] tracking-tight">
          Un site web qui vous ramène des clients, pas juste du trafic
        </h1>

        {/* Subheadline */}
        <p className="mt-8 max-w-xl text-base leading-relaxed text-brand-foreground">
          On conçoit des sites clairs, rapides et efficaces pour les entreprises qui veulent être visibles et convertir en ligne.        </p>

        {/* CTA */}
        <div className="mt-10 flex items-center gap-3">
          <div className="relative">
            <button className="pointer-events-auto flex items-center gap-3 rounded-2xl bg-white px-7 py-4 text-base font-semibold text-brand-dark shadow-lg transition-transform hover:scale-[1.02]">
              <Calendar className="w-5 h-5" />
              Obtenir mon audit gratuit
            </button>
            <p>Réponse en moins de 24h — sans engagement</p>
          </div>
          <div className="relative">
            <div className="h-14 w-14 rounded-lg overflow-hidden border-2 border-[#0967c2]">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
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
