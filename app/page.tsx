import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { LogoBar } from "@/components/LogoBar";
import BackgroundBoxesDemo from "@/components/background-boxes-demo";
import { ProcessSection } from "@/components/ProcessSection";
import { ServicesSection } from "@/components/ServicesSection";
import { MapSection } from "@/components/MapSection";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full font-sans bg-zinc-100">
      <div className="w-full min-h-screen bg-background">
        <Navbar />
        <HeroSection />
      </div>
      <MapSection />
      <ServicesSection />
      <ProcessSection />
    </div>
  );
}
