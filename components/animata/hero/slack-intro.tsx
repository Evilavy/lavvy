"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export interface CircleProps {
    height?: string;
    width?: string;
    bgColor?: string;
    borderRadius?: string;
}

interface CylinderProps {
    text?: string;
    height?: string;
    width?: string;
    bgColor?: string;
    textColor?: string;
}

interface LineProps {
    className?: string;
    animationEnd: boolean;
}

function Circle({
    height = "h-8 md:h-16",
    width = "w-8 md:w-16",
    bgColor = "bg-[#0967c2]",
    borderRadius = "rounded-full",
}: CircleProps) {
    return <div className={cn(height, width, borderRadius, bgColor)} />;
}

function Cylinder({
    text,
    height = "h-8 md:h-16",
    width = "w-24 md:w-48",
    bgColor = "bg-[#1e3a5f]",
    textColor = "text-[#06112a]",
}: CylinderProps) {
    return (
        <div
            className={cn(
                "relative flex items-center justify-center rounded-full",
                height,
                width,
                bgColor,
            )}
        >
            {text && (
                <span className={cn("px-4 text-xl font-bold md:px-6 md:text-5xl whitespace-nowrap", textColor)}>
                    {text}
                </span>
            )}
        </div>
    );
}

function LineOne({ className, animationEnd }: LineProps) {
    return (
        <div
            className={cn(
                className,
                "duration-500",
                animationEnd
                    ? "animate-out fade-out slide-out-to-left-full"
                    : "animate-in fade-in slide-in-from-right-full",
            )}
        >
            <Circle bgColor="bg-[#0967c2]" borderRadius="rounded-t-full rounded-bl-full" />
            <Circle bgColor="bg-[#00d7ff]" />
            <Cylinder bgColor="bg-[#0967c2]" />
            <Cylinder bgColor="bg-[#1e3a5f]" width="w-56 md:w-[300px]" />
            <Cylinder bgColor="bg-[#0967c2]" />
        </div>
    );
}

function LineTwo({ className, animationEnd }: LineProps) {
    return (
        <div
            className={cn(
                className,
                "duration-700",
                animationEnd
                    ? "animate-out fade-out slide-out-to-right-full"
                    : "animate-in fade-in slide-in-from-left-full",
            )}
        >
            <Circle bgColor="bg-[#00d7ff]" />
            <Cylinder text="Stratégie" bgColor="bg-white" textColor="text-[#06112a]" width="w-64 md:w-[400px]" />
            <Circle bgColor="bg-[#00d7ff]" borderRadius="rounded-t-full rounded-bl-full" />
            <Circle bgColor="bg-[#0967c2]" />
            <Cylinder bgColor="bg-[#0967c2]" />
        </div>
    );
}

function LineThree({ className, animationEnd }: LineProps) {
    return (
        <div
            className={cn(
                className,
                "duration-700",
                animationEnd
                    ? "animate-out fade-out slide-out-to-left-full"
                    : "animate-in fade-in slide-in-from-right-full",
            )}
        >
            <Cylinder bgColor="bg-[#1e3a5f]" />
            <Circle bgColor="bg-[#0967c2]" borderRadius="rounded-t-full rounded-br-full" />
            <Circle bgColor="bg-[#00d7ff]" />
            <Cylinder text="UX & Design" bgColor="bg-white" textColor="text-[#06112a]" width="w-64 md:w-[600px]" />
            <Circle bgColor="bg-[#0967c2]" />
            <Cylinder bgColor="bg-[#1e3a5f]" />
        </div>
    );
}

function LineFour({ className, animationEnd }: LineProps) {
    return (
        <div
            className={cn(
                className,
                "duration-700",
                animationEnd
                    ? "animate-out fade-out slide-out-to-right-full"
                    : "animate-in fade-in slide-in-from-left-full",
            )}
        >
            <Circle bgColor="bg-[#00d7ff]" />
            <Cylinder text="Développement" bgColor="bg-white" textColor="text-[#06112a]" width="w-96 md:w-[700px]" />
            <Circle bgColor="bg-[#00d7ff]" borderRadius="rounded-t-full rounded-br-full" />
        </div>
    );
}

function LineFive({ className, animationEnd }: LineProps) {
    return (
        <div
            className={cn(
                className,
                animationEnd
                    ? "animate-out fade-out slide-out-to-left-full"
                    : "animate-in fade-in slide-in-from-right-full",
            )}
        >
            <Cylinder bgColor="bg-[#0967c2]" />
            <Cylinder text="SEO & Conversion" bgColor="bg-[#00d7ff]" textColor="text-[#06112a]" width="w-32 md:w-[400px]" />
            <Circle bgColor="bg-[#0967c2]" />
            <Cylinder bgColor="bg-[#1e3a5f]" />
        </div>
    );
}

export default function SlackIntro({
    animateOut,
}: {
    /**
     * If true, the lines will animate out
     */
    animateOut?: boolean;
}) {
    const [animationEnd, setAnimationEnd] = useState(false);
    const [started, setStarted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!animateOut || !started) {
            return;
        }

        const timer = setTimeout(() => {
            setAnimationEnd(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, [animateOut, started]);

    const common = "flex duration-1000 ease-in-out fill-mode-forwards";

    return (
        <div
            ref={containerRef}
            className={cn(
                "flex flex-col items-center justify-center gap-1 overflow-hidden bg-[#06112a] py-4 md:gap-3",
            )}
        >
            {started && (
                <>
                    <LineOne className={common} animationEnd={animationEnd} />
                    <LineTwo className={common} animationEnd={animationEnd} />
                    <LineThree className={common} animationEnd={animationEnd} />
                    <LineFour className={common} animationEnd={animationEnd} />
                    <LineFive className={common} animationEnd={animationEnd} />
                </>
            )}
        </div>
    );
}
