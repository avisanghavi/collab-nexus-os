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
  // 0-0.2: Dashboard un-tilts and scales to normal
  // 0.1-0.3: Logos fade in scattered on dashboard
  // 0.3-0.45: Logos organize into grid
  // 0.45-0.6: Logos flow into MacBook center
  // 0.5-0.7: MacBook fades in and takes over

  // Dashboard animations - visible from the start
  const dashboardRotateX = useTransform(scrollYProgress, [0, 0.2], [45, 0]);
  const dashboardScale = useTransform(scrollYProgress, [0, 0.2], [0.85, 1]);
  const dashboardY = useTransform(scrollYProgress, [0, 0.2], [150, 0]);
  const dashboardOpacity = useTransform(scrollYProgress, [0.45, 0.55], [1, 0]);

  // Logo animations
  const logoOpacityInitial = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  const logoOrganizeProgress = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);
  const logoToMacBookProgress = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);
  const logoFinalOpacity = useTransform(scrollYProgress, [0.55, 0.6], [1, 0]);

  // MacBook animations
  const macbookOpacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);
  const macbookScale = useTransform(scrollYProgress, [0.5, 0.7], [0.9, 1]);

  return (
    <div ref={containerRef} className="relative min-h-[300vh]">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* Dashboard Panel - Always visible initially */}
        <motion.div
          className="absolute"
          style={{
            rotateX: dashboardRotateX,
            scale: dashboardScale,
            y: dashboardY,
            opacity: dashboardOpacity,
            transformPerspective: 1500,
            transformStyle: "preserve-3d",
          }}
        >
          <div className="relative w-[1000px] h-[550px] bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50">
            {/* Grid pattern background */}
            <div
              className="absolute inset-0 rounded-3xl opacity-20"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                                  linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }}
            />

            {/* Dashboard header */}
            <div className="absolute top-10 left-10 right-10">
              <h3 className="text-3xl font-bold text-white mb-2">Mission Control</h3>
              <p className="text-white/70 text-lg">All your tools, unified</p>
            </div>

            {/* Dashboard content areas (subtle) */}
            <div className="absolute top-28 left-10 right-10 bottom-10 grid grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white/5 rounded-xl border border-white/10" />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Animated Logos */}
        {logos.map((logo, index) => {
          const scattered = scatteredPositions[index];

          // Grid position (2 rows, 5 columns)
          const row = Math.floor(index / 5);
          const col = index % 5;
          const gridX = (col - 2) * 80;
          const gridY = row === 0 ? -40 : 40;

          // Animate from scattered to grid
          const xToGrid = useTransform(
            logoOrganizeProgress,
            [0, 1],
            [scattered.x, gridX]
          );

          const yToGrid = useTransform(
            logoOrganizeProgress,
            [0, 1],
            [scattered.y, gridY]
          );

          const rotateToGrid = useTransform(
            logoOrganizeProgress,
            [0, 1],
            [scattered.rotate, 0]
          );

          // Then from grid to MacBook center
          const xToMacBook = useTransform(
            logoToMacBookProgress,
            [0, 1],
            [gridX, 0]
          );

          const yToMacBook = useTransform(
            logoToMacBookProgress,
            [0, 1],
            [gridY, 0]
          );

          const scaleToMacBook = useTransform(
            logoToMacBookProgress,
            [0, 1],
            [1, 0.7]
          );

          // Combine animations
          const currentX = useTransform(
            [logoOrganizeProgress, logoToMacBookProgress],
            ([_organize, toMacBook]: number[]) => {
              if ((toMacBook as number) > 0) return xToMacBook.get();
              return xToGrid.get();
            }
          );

          const currentY = useTransform(
            [logoOrganizeProgress, logoToMacBookProgress],
            ([_organize, toMacBook]: number[]) => {
              if ((toMacBook as number) > 0) return yToMacBook.get();
              return yToGrid.get();
            }
          );

          const currentOpacity = useTransform(
            [logoOpacityInitial, logoFinalOpacity],
            ([initial, final]: number[]) => (initial as number) * (final as number)
          );

          return (
            <motion.div
              key={`logo-${index}`}
              className="absolute pointer-events-none"
              style={{
                left: '50%',
                top: '50%',
                x: currentX,
                y: currentY,
                rotate: rotateToGrid,
                scale: scaleToMacBook,
                opacity: currentOpacity,
                zIndex: 10,
              }}
            >
              <div className="w-16 h-16 rounded-2xl bg-white shadow-2xl p-3.5 backdrop-blur">
                <img
                  src={logo.src}
                  alt={`${logo.name} integration`}
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          );
        })}

        {/* MacBook appears as logos fade */}
        <motion.div
          className="absolute"
          style={{
            opacity: macbookOpacity,
            scale: macbookScale,
            zIndex: 5,
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
