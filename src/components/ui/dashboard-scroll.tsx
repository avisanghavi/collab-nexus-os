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
    offset: ["start end", "end start"],
  });

  // Three-phase animation:
  // Phase 1 (0-0.3): Logos scatter and organize into grid
  // Phase 2 (0.3-0.5): Logos flow into MacBook position
  // Phase 3 (0.5+): Logos fade, MacBook appears with its scroll animation

  // Logo animations - organize from scattered to grid
  const logoOrganizeProgress = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // Logos flow toward MacBook screen center and fade
  const logoScale = useTransform(scrollYProgress, [0.4, 0.5], [1, 0.7]);
  const logoOpacity = useTransform(scrollYProgress, [0.45, 0.55], [1, 0]);

  // MacBook animations
  const macbookOpacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);
  const macbookY = useTransform(scrollYProgress, [0.5, 0.6], [50, 0]);

  return (
    <div ref={containerRef} className="relative min-h-[300vh]">
      {/* Sticky container for the entire animation sequence */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* Animated Logos */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {logos.map((logo, index) => {
            const scattered = scatteredPositions[index];

            // Grid organization (2 rows, 5 columns)
            const row = Math.floor(index / 5);
            const col = index % 5;
            const gridX = (col - 2) * 90;
            const gridY = row === 0 ? -40 : 40;

            // Combined transform: Scattered -> Grid -> MacBook Center
            // X position: scattered.x -> gridX -> 0
            const logoX = useTransform(
              scrollYProgress,
              [0, 0.3, 0.5],
              [scattered.x, gridX, 0]
            );

            // Y position: scattered.y -> gridY -> 0
            const logoY = useTransform(
              scrollYProgress,
              [0, 0.3, 0.5],
              [scattered.y, gridY, 0]
            );

            // Rotation: scattered.rotate -> 0
            const logoRotate = useTransform(
              logoOrganizeProgress,
              [0, 1],
              [scattered.rotate, 0]
            );

            return (
              <motion.div
                key={`logo-${index}`}
                className="absolute"
                style={{
                  x: logoX,
                  y: logoY,
                  rotate: logoRotate,
                  scale: logoScale,
                  opacity: logoOpacity,
                }}
              >
                <div className="w-16 h-16 rounded-2xl bg-white/95 backdrop-blur shadow-xl p-3 relative group hover:scale-110 transition-transform">
                  <img
                    src={logo.src}
                    alt={`${logo.name} logo`}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50">
                    <div className="text-xs font-semibold text-foreground whitespace-nowrap bg-card px-4 py-2 rounded-xl shadow-2xl border-2 border-border">
                      {logo.name}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* MacBook Container */}
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: macbookOpacity,
            y: macbookY,
          }}
        >
          {macbookSrc && (
            <MacbookScroll
              src={macbookSrc}
              showGradient={false}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};
