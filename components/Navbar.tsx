import { ChevronDown } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5">
      <div className="flex items-center gap-10">
        <span className="text-3xl font-bold tracking-tight text-[#08559E]">Studio Lavvy</span>
        <div className="hidden md:flex items-center gap-6">
          <button className="flex items-center gap-1 text-sm text-brand-foreground hover:text-foreground transition-colors">
            by Industry <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <button className="flex items-center gap-1 text-sm text-brand-foreground hover:text-foreground transition-colors">
            by CMS <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <a href="#" className="text-sm text-brand-foreground hover:text-foreground transition-colors">About</a>
          <a href="#" className="text-sm text-brand-foreground hover:text-foreground transition-colors">Process</a>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-3">
        <a href="#" className="text-sm text-brand-foreground hover:text-foreground transition-colors">Case Studies</a>
        <a
          href="#"
          className="ml-4 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
        >
          Action Plan
        </a>
        <a
          href="#"
          className="rounded-lg border border-foreground px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/10"
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
