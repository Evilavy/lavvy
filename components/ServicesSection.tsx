import { Lightbulb, Smartphone, Code, HeadphonesIcon } from "lucide-react";
import Image from "next/image";
import constructionImage from "@/assets/construction.png";

const services = [
  {
    title: "Strategy-first Approach",
    description:
      "We don't dive into design blindly. Every project starts with clear positioning, audience insights, and conversion goals so your website is built with purpose.",
    icon: Lightbulb,
  },
  {
    title: "Tailored UX/UI Design",
    description:
      "We create intuitive, high-converting interfaces tailored to your users and sales funnel. No templates, just smart, scalable design.",
    icon: Smartphone,
  },
  {
    title: "Future-proof Development",
    description:
      "Built on platforms like WordPress, Webflow, or HubSpot CMS, our sites are fast, flexible, and ready to evolve with your business.",
    icon: Code,
  },
  {
    title: "Long-term Support & Growth",
    description:
      "Beyond launch, we stay hands-on with ongoing improvements, performance tracking, SEO, and scalable support plans.",
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