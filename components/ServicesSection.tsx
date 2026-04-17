import { Lightbulb, Smartphone, Code, HeadphonesIcon } from "lucide-react";
import Image from "next/image";
import constructionImage from "@/assets/construction.png";

const services = [
  {
    title: "Approche stratégique",
    description:
      "On ne plonge pas dans le design les yeux fermés. Chaque projet commence par un positionnement clair, une analyse de votre audience et des objectifs de conversion précis.",
    icon: Lightbulb,
  },
  {
    title: "Design UX/UI sur-mesure",
    description:
      "On crée des interfaces intuitives et performantes, adaptées à vos utilisateurs et à votre tunnel de vente. Pas de templates, juste du design intelligent et évolutif.",
    icon: Smartphone,
  },
  {
    title: "Développement pérenne",
    description:
      "Conçus sur WordPress, Webflow ou HubSpot CMS, nos sites sont rapides, flexibles et prêts à évoluer avec votre activité.",
    icon: Code,
  },
  {
    title: "Accompagnement & croissance",
    description:
      "Après le lancement, on reste présents : améliorations continues, suivi des performances, SEO et plans de support évolutifs.",
    icon: HeadphonesIcon,
  },
];

const awards = [
  { name: "Clutch", rating: "4.9 ★★★★★" },
  { name: "awwwards.", subtitle: "🏆" },
  { name: "Google", rating: "5.0 ★★★★★" },
  { name: "DESIGNRUSH", subtitle: "★★★" },
];

export function ServicesSection() {
  return (
    <section className="relative z-10 px-4 pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Left column — dark card with headline + awards */}
        <div className="relative min-h-[600px] overflow-hidden rounded-3xl bg-card">
          <Image
            src={constructionImage}
            alt="Strategy"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, 100vw"
            priority
          />
        </div>

        {/* Right columns — 2x2 service cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="flex flex-col justify-between rounded-3xl bg-secondary/30 p-8 min-h-[280px]"
                style={{ backgroundColor: "#E4E9EC" }}
              >
                <div>
                  <h3 className="text-2xl md:text-3xl font-black leading-tight tracking-tight text-olive-dark">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-olive-dark/70">
                    {service.description}
                  </p>
                </div>
                <Icon className="w-8 h-8 mt-8 text-olive-dark/50" strokeWidth={1.5} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}