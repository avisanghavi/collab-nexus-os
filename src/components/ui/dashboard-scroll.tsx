"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { MacbookScroll } from "@/components/ui/macbook-scroll";

interface DashboardScrollProps {
  children?: React.ReactNode;
  logos: Array<{
    src: string;
    name: string;
  }>;
  scatteredPositions: Array<{
    x: number;
    y: number;
    rotate: number;
  }>;
  macbookSrc?: string;
}

export const DashboardScroll = ({
  logos,
  scatteredPositions,
  macbookSrc,
}: DashboardScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Animation phases:
  // 0-0.2: Dashboard tilts and logos start gathering
  // 0.2-0.4: Logos slide into MacBook
  // 0.4+: MacBook scroll takes over
  
  const dashboardTilt = useTransform(scrollYProgress, [0, 0.2], [45, 0]);
  const dashboardScale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  const dashboardOpacity = useTransform(scrollYProgress, [0.15, 0.25], [1, 0]);
  
  const logoGatherProgress = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const logoSlideProgress = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const logoOpacity = useTransform(scrollYProgress, [0.35, 0.4], [1, 0]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Initial dashboard panel with logos */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        {/* Tilted dashboard panel */}
        <motion.div
          className="absolute"
          style={{
            rotateX: dashboardTilt,
            scale: dashboardScale,
            opacity: dashboardOpacity,
            transformPerspective: 1200,
            transformStyle: "preserve-3d",
          }}
        >
          <div className="relative w-[900px] h-[500px] bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50">
            {/* Dashboard grid pattern */}
            <div className="absolute inset-0 bg-grid-white/[0.02] rounded-3xl" />
            
            {/* Dashboard header */}
            <div className="absolute top-8 left-8 right-8">
              <h3 className="text-2xl font-bold text-white/90">Mission Control</h3>
              <p className="text-white/60 mt-2">Your unified workspace</p>
            </div>
            
            {/* Center line to guide logos */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          </div>
        </motion.div>

        {/* Logos that animate from scattered to gathered to MacBook */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {logos.map((logo, index) => {
            const scattered = scatteredPositions[index];
            
            // Phase 1: Scattered on dashboard
            const scatteredX = scattered.x;
            const scatteredY = scattered.y + 50; // Adjust down to be on dashboard
            
            // Phase 2: Gathered in center (2 rows)
            const isTopRow = index < 5;
            const positionInRow = index % 5;
            const gatheredX = (positionInRow - 2) * 80;
            const gatheredY = isTopRow ? -30 : 30;
            
            // Phase 3: Final position in MacBook (should match MacBook screen center)
            const macbookX = 0;
            const macbookY = 100; // Adjust to align with MacBook screen
            
            // Combine animations
            const currentX = useTransform(
              [logoGatherProgress, logoSlideProgress],
              ([gather, slide]) => {
                const gatherPos = scatteredX + (gatheredX - scatteredX) * gather;
                return gatherPos + (macbookX - gatherPos) * slide;
              }
            );
            
            const currentY = useTransform(
              [logoGatherProgress, logoSlideProgress],
              ([gather, slide]) => {
                const gatherPos = scatteredY + (gatheredY - scatteredY) * gather;
                return gatherPos + (macbookY - gatherPos) * slide;
              }
            );
            
            const currentRotate = useTransform(
              logoGatherProgress,
              [0, 1],
              [scattered.rotate, 0]
            );
            
            const currentScale = useTransform(
              [logoGatherProgress, logoSlideProgress],
              ([gather, slide]) => {
                const gatherScale = 1 - 0.2 * gather;
                return gatherScale * (1 - 0.3 * slide);
              }
            );

            return (
              <motion.div
                key={`logo-${index}`}
                className="absolute"
                style={{
                  x: currentX,
                  y: currentY,
                  rotate: currentRotate,
                  scale: currentScale,
                  opacity: logoOpacity,
                }}
              >
                <div className="w-16 h-16 rounded-2xl bg-white/95 backdrop-blur shadow-xl p-3 relative group transition-all duration-300 hover:scale-110 hover:shadow-2xl">
                  <img
                    src={logo.src}
                    alt={`${logo.name} logo`}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50">
                    <div className="text-xs font-semibold text-white whitespace-nowrap bg-slate-800 px-4 py-2 rounded-xl shadow-2xl border border-slate-700">
                      {logo.name}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* MacBook appears as logos fade */}
      <motion.div
        style={{
          opacity: useTransform(scrollYProgress, [0.3, 0.4], [0, 1]),
        }}
        className="relative -mt-[100vh]"
      >
        {macbookSrc && (
          <MacbookScroll
            src={macbookSrc}
            showGradient={false}
          />
        )}
      </motion.div>

      {/* Spacer for scroll */}
      <div className="h-[200vh]" />
    </div>
  );
};