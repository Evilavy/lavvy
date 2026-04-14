import { ArrowDown } from "lucide-react";

const logos = ["HubSpot", "WordPress", "Webflow", "Google Ads"];

export function LogoBar() {
  return (
    <div className="relative z-10 flex items-stretch gap-3 px-6 pb-8">
      {logos.map((name) => (
        <div
          key={name}
          className="flex-1 flex items-center justify-center rounded-2xl bg-brand-muted/60 px-6 py-5"
        >
          <span className="text-lg font-semibold tracking-wide text-brand-foreground">
            {name === "WordPress" ? `Ⓦ ${name}` : name === "Webflow" ? `⩔ ${name}` : name}
          </span>
        </div>
      ))}
      <div className="flex items-center justify-between gap-4 rounded-2xl bg-primary px-6 py-5 min-w-[160px]">
        <span className="text-sm font-semibold text-primary-foreground">Our Work</span>
        <ArrowDown className="w-5 h-5 text-primary-foreground" />
      </div>
    </div>
  );
}
