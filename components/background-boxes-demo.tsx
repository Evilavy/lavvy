"use client";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";

export default function BackgroundBoxesDemo() {
  return (
    <div className="h-96 relative w-full overflow-hidden bg-white flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-white z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <h1 className={cn("md:text-4xl text-xl text-blue-900 relative z-20 font-light tracking-tight")}>
        Tailwind is Awesome
      </h1>
      <p className="text-center mt-2 text-blue-400 relative z-20 text-sm font-light">
        Framer motion is the best animation library ngl
      </p>
    </div>
  );
}
