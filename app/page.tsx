import { NavbarDemo } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProcessSection } from "@/components/ProcessSection";
import { ServicesSection } from "@/components/ServicesSection";
import { MapSection } from "@/components/MapSection";
import SlackIntro from "@/components/animata/hero/slack-intro";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full font-sans bg-[#ebf2f2]">
      <NavbarDemo />
      <div className="w-full min-h-screen bg-background">
        <HeroSection />
      </div>
      <MapSection />
      <ServicesSection />
      <div className="mx-4 mb-4 rounded-3xl overflow-hidden">
        <SlackIntro />
      </div>
      {/* <ProcessSection /> */}
    </div>
  );
}
