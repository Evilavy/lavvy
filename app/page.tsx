import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProcessSection } from "@/components/ProcessSection";
import { ServicesSection } from "@/components/ServicesSection";
import { MapSection } from "@/components/MapSection";
import SlackIntro from "@/components/animata/hero/slack-intro";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full font-sans bg-[#1e3a5f]">
      <div className="w-full min-h-screen bg-background">
        <Navbar />
        <HeroSection />
      </div>
      <MapSection />
      <div className="mx-4 mb-4 rounded-3xl overflow-hidden">
        <SlackIntro />
      </div>
      <ServicesSection />
      <ProcessSection />
    </div>
  );
}
