"use client";
import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import WaitlistModal from "../WaitlistModal";

// Performance optimization: Use reduce motion preference
const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

interface UnifiedDashboardMacbookProps {
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

// Mobile Version Component
const MobileVersion = ({ logos }: { logos: UnifiedDashboardMacbookProps["logos"] }) => {
  const [isWaitlistOpen, setIsWaitlistOpen] = React.useState(false);

  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      {/* Logos Section */}
      <div className="flex-1 flex flex-col items-end justify-end px-4 py-8 pb-32">
        {/* Logos Grid - Jumbled and overlapping layout */}
        <div className="w-full h-64 relative">
          {logos.slice(0, 10).map((logo, index) => {
            // Create random-looking positions that are jumbled
            const positions = [
              { x: "5%", y: "55%", rotate: "-15deg" },
              { x: "18%", y: "50%", rotate: "20deg" },
              { x: "32%", y: "60%", rotate: "-10deg" },
              { x: "48%", y: "53%", rotate: "25deg" },
              { x: "62%", y: "57%", rotate: "-20deg" },
              { x: "78%", y: "65%", rotate: "15deg" },
              { x: "12%", y: "95%", rotate: "-25deg" },
              { x: "43%", y: "90%", rotate: "10deg" },
              { x: "68%", y: "100%", rotate: "-15deg" },
              { x: "28%", y: "110%", rotate: "20deg" },
            ];
            
            const pos = positions[index];
            
            return (
              <motion.div
                key={`logo-${logo.name}`}
                className="absolute w-14 h-14 rounded-xl bg-white shadow-lg p-3 flex items-center justify-center hover:shadow-xl transition-shadow"
                style={{
                  left: pos.x,
                  top: pos.y,
                  rotate: pos.rotate,
                }}
                whileHover={{ scale: 1.1, zIndex: 10 }}
              >
                <img
                  src={logo.src}
                  alt={`${logo.name} integration - Connect ${logo.name} with HeyJarvis unified dashboard`}
                  className="w-full h-full object-contain"
                  loading="eager"
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Waitlist Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-br from-white via-gray-50 to-white">
        <motion.div
          className="w-full max-w-sm text-center relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Subtle gradient orbs in background */}
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl -z-10" />

          {/* Main Heading */}
          <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-4">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Ready to Transform
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Your Workflow?
            </span>
          </h2>

          {/* Decorative line */}
          <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full" />

          {/* CTA Button */}
          <motion.button
            onClick={() => setIsWaitlistOpen(true)}
            className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden text-sm mb-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Join the Waitlist</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white" />
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white" />
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white" />
            </div>
            <p className="text-xs text-gray-600 font-medium ml-2">
              Join other <span className="text-gray-900 font-semibold">B2B SaaS</span> co
            </p>
          </div>
        </motion.div>
      </div>

      {/* Waitlist Modal */}
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </div>
  );
};

// Desktop Version Component
const DesktopVersion = ({
  logos,
  scatteredPositions,
  macbookSrc,
  containerRef,
}: UnifiedDashboardMacbookProps & { containerRef: React.RefObject<HTMLDivElement> }) => {
  const [isWaitlistOpen, setIsWaitlistOpen] = React.useState(false);

  // Scroll animation (only used on desktop)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Animation timeline (with screen detachment):
  // 0-0.12: Dashboard un-tilts and centers (logos scattered)
  // 0.08-0.22: Logos organize into grid then funnel into dashboard
  // 0.22-0.40: Dashboard morphs into MacBook screen
  // 0.40-0.55: MacBook frame materializes, title visible
  // 0.55-0.68: MacBook stays visible (hold)
  // 0.68-0.78: Screen DETACHES from MacBook and floats forward (scale up, z-translate)
  // 0.78-0.85: MacBook frame fades out, screen continues forward
  // 0.85-1.0: Dashboard expands to full size with waitlist CTA

  // Dashboard animations (stays in MacBook, doesn't detach)
  const dashboardY = useTransform(scrollYProgress,
    [0, 0.08, 0.12, 0.22, 0.40, 0.68],
    [200, 100, 50, 0, -50, -50] // Start lower, centers into MacBook, stays put
  );
  const dashboardRotateX = useTransform(scrollYProgress,
    [0, 0.12, 0.22, 0.40, 0.68],
    [45, 0, 0, -20, -20] // Un-tilts, matches MacBook angle, holds
  );

  // Dashboard to MacBook screen transformation (stays at MacBook size during detachment)
  const dashboardWidth = useTransform(scrollYProgress,
    [0, 0.22, 0.40, 0.68],
    [1200, 1200, 800, 800] // Start large, shrink to MacBook, hold
  );
  const dashboardHeight = useTransform(scrollYProgress,
    [0, 0.22, 0.40, 0.68],
    [700, 700, 500, 500] // Start large, shrink to MacBook, hold
  );
  const dashboardScale = useTransform(scrollYProgress,
    [0.22, 0.40, 0.68],
    [1, 0.76, 0.76] // Scale down to MacBook size, hold
  );
  
  // Z-axis stays at 0 for main dashboard (no movement)
  const dashboardZ = useTransform(scrollYProgress,
    [0, 1],
    [0, 0]
  );

  // Dashboard container opacity (stays visible)
  const dashboardContainerOpacity = useTransform(scrollYProgress,
    [0, 1],
    [1, 1] // Always visible
  );


  // Logo funnel animations
  const logoOpacity = useTransform(scrollYProgress,
    [0, 0.08, 0.12, 0.22],
    [1, 1, 1, 0]
  );
  const logoToFunnel = useTransform(scrollYProgress, [0.08, 0.22], [0, 1]); // Controls funnel movement
  const logoScale = useTransform(scrollYProgress, [0.08, 0.22], [1, 0]); // Shrinks as it funnels in

  // Loading text animations (disabled - logos go straight to dashboard)
  const loadingTextOpacity = useTransform(scrollYProgress,
    [0, 1],
    [0, 0]
  );

  // MacBook frame animations (appears after screen transformation, stays visible even during detachment)
  const macbookFrameOpacity = useTransform(scrollYProgress, [0.40, 0.50, 0.85, 0.90], [0, 1, 1, 0]);
  
  // Detached screen animations (the screen that floats away)
  const detachedScreenOpacity = useTransform(scrollYProgress, [0.68, 0.70, 1.0], [0, 1, 1]);
  const detachedScreenZ = useTransform(scrollYProgress, [0.68, 0.90, 1.0], [0, 200, 0]);
  const detachedScreenScale = useTransform(scrollYProgress, [0.68, 0.90, 1.0], [0.76, 0.85, 0.85]);
  const detachedScreenRotateX = useTransform(scrollYProgress, [0.68, 0.85, 1.0], [-20, 0, 0]);
  const detachedScreenY = useTransform(scrollYProgress, [0.68, 0.90, 1.0], [-50, 0, 0]);
  
  // Dashboard to Waitlist CTA transition on detached screen
  const detachedDashboardOpacity = useTransform(scrollYProgress, [0.68, 0.82, 0.88], [1, 0.3, 0]);
  const detachedCTAOpacity = useTransform(scrollYProgress, [0.82, 0.88, 0.95], [0, 0.7, 1]);

  // Dashboard content to MacBook content transition (fades out when screen detaches)
  const macbookContentOpacity = useTransform(scrollYProgress, [0.35, 0.40, 0.68, 0.72], [0, 1, 1, 0]);

  // Title animation (appears after MacBook is complete, stays visible, then fades out with MacBook)
  const titleOpacity = useTransform(scrollYProgress, [0.45, 0.50, 0.75, 0.82], [0, 1, 1, 0]);

  // Desktop version - original complex animation
  return (
    <div
      ref={containerRef}
      className={`relative h-[890vh]`}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-visible bg-gradient-to-b from-gray-50 to-white">

        {/* Main Dashboard/Screen Container */}
        <motion.div
          className="absolute flex items-center justify-center"
          style={{
            y: dashboardY,
            z: dashboardZ,
            rotateX: dashboardRotateX,
            scale: dashboardScale,
            opacity: dashboardContainerOpacity,
            transformPerspective: 1500,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          {/* Dashboard that becomes MacBook screen */}
          <motion.div
            className="relative"
            style={{
              width: dashboardWidth,
              height: dashboardHeight,
              transformStyle: "preserve-3d",
              willChange: "width, height",
            }}
          >
            {/* Outer bezel/frame */}
            <motion.div
              className="absolute inset-0 bg-[#010101] rounded-2xl overflow-hidden p-2"
              style={{
                boxShadow: "0px 2px 0px 2px rgb(92, 92, 92)",
              }}
            >
              {/* Inner bezel */}
              <div className="absolute inset-0 bg-[#272729] rounded-lg" />

              {/* Actual screen content */}
              <div className="relative h-full w-full bg-white rounded-lg overflow-hidden shadow-2xl">
                {/* MacBook Screen Content (fades in as dashboard transforms) */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    opacity: macbookContentOpacity,
                  }}
                >
                  <div className="h-full w-full bg-[#272729] rounded-lg overflow-hidden">
                    {macbookSrc && (
                      <img
                        src={macbookSrc}
                        alt="MacBook Display"
                        className="object-cover object-center h-full w-full"
                        loading="eager"
                        style={{
                          backfaceVisibility: 'hidden',
                          transform: 'translateZ(0)',
                        }}
                      />
                    )}
                  </div>
                </motion.div>

              </div>
            </motion.div>
          </motion.div>

          {/* MacBook Base (appears after transformation) */}
          <motion.div
            className="absolute pointer-events-none [perspective:800px]"
            style={{
              opacity: macbookFrameOpacity,
              top: "50%",
              transform: "translateY(calc(-50% + 449px))",
              width: "800px",
              maxWidth: "90vw",
            }}
          >
            <div
              className="relative -z-10 w-full h-[19.5rem] rounded-2xl overflow-hidden"
              style={{
                transform: "perspective(800px) rotateX(25deg) translateZ(0px)",
                transformOrigin: "top",
                transformStyle: "preserve-3d",
                background: "linear-gradient(to bottom, #DCDCDC 0%, #C8C8C8 50%, #B5B5B5 100%)",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(0, 0, 0, 0.15)",
              }}
            >
              {/* Hinge area - recessed notch */}
              <div className="relative h-10 w-full flex items-center justify-center">
                <div
                  className="absolute h-4 w-[80%] bg-[#050505]"
                  style={{
                    top: "0",
                    borderRadius: "0 0 4px 4px",
                    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.5)",
                  }}
                />
              </div>

              {/* Keyboard deck with gradient */}
              <div 
                className="relative flex items-center h-36"
                style={{
                  background: "linear-gradient(to bottom, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.08) 100%)",
                }}
              >
                <div className="mx-auto w-[12%] h-full overflow-hidden py-1">
                  <SpeakerGrid />
                </div>
                <div className="mx-auto w-[76%] h-full flex items-center justify-center py-1">
                  <div className="origin-center" style={{ transform: 'scaleX(1.25) scaleY(0.8)' }}>
                    <Keypad />
                  </div>
                </div>
                <div className="mx-auto w-[12%] h-full overflow-hidden py-1">
                  <SpeakerGrid />
                </div>
              </div>

              {/* Trackpad */}
              <div className="flex justify-center py-.7">
                <Trackpad />
              </div>

              {/* Bottom aluminum base - fixed */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-4 flex items-center justify-center relative"
                style={{
                  background: "linear-gradient(to bottom, #B8B8B8 0%, #A8A8A8 100%)",
                  borderBottomLeftRadius: "1rem",
                  borderBottomRightRadius: "1rem",
                }}
              >
                {/* Bottom notch for depth - black */}
                <div 
                  className="h-2 w-20"
                  style={{
                    marginBottom: "-0.3rem",
                    background: "linear-gradient(to bottom, #1a1a1a 0%, #000000 100%)",
                    borderTopLeftRadius: "0.5rem",
                    borderTopRightRadius: "0.5rem",
                    boxShadow: "inset 0 1px 1px rgba(0,0,0,0.5)",
                  }}
                />
                
                {/* SOC-2 Compliant text - bottom right */}
                <div 
                  className="absolute bottom-1 right-4 text-[6px] font-light tracking-wide"
                  style={{
                    color: "#888888",
                    textShadow: "0 0.5px 0.5px rgba(0,0,0,0.3)",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    letterSpacing: "0.5px",
                  }}
                >
                  SOC-2 COMPLIANT
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Detached Screen (floats forward from MacBook) */}
        <motion.div
          className="absolute flex items-center justify-center pointer-events-none"
          style={{
            y: detachedScreenY,
            z: detachedScreenZ,
            rotateX: detachedScreenRotateX,
            scale: detachedScreenScale,
            opacity: detachedScreenOpacity,
            transformPerspective: 1500,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          <motion.div
            className="relative"
            style={{
              width: 800,
              height: 500,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Screen bezel */}
            <div className="absolute inset-0 bg-[#010101] rounded-2xl overflow-hidden p-2">
              <div className="absolute inset-0 bg-[#272729] rounded-lg" />
              
              {/* Screen content - Dashboard morphing to ROI Calculator */}
              <div className="relative h-full w-full bg-white rounded-lg overflow-hidden shadow-2xl">
                {/* Dashboard Image (fades out as it lifts) */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    opacity: detachedDashboardOpacity,
                  }}
                >
                  <div className="h-full w-full bg-[#272729] rounded-lg overflow-hidden">
                    {macbookSrc && (
                      <img
                        src={macbookSrc}
                        alt="Dashboard"
                        className="object-cover object-center h-full w-full"
                        loading="eager"
                        style={{
                          backfaceVisibility: 'hidden',
                          transform: 'translateZ(0)',
                        }}
                      />
                    )}
                  </div>
                </motion.div>

                {/* Waitlist CTA (fades in as dashboard fades out) */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white rounded-lg flex items-center justify-center overflow-hidden p-12"
                  style={{
                    opacity: detachedCTAOpacity,
                  }}
                >
                  <div className="w-full max-w-3xl text-center relative">
                    {/* Subtle gradient orbs in background */}
                    <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10" />
                    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -z-10" />
                    
                    {/* Main Heading */}
                    <h2 className="text-4xl font-light tracking-tight mb-4">
                      <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                        Ready to Transform
                      </span>
                      <br />
                      <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Your Workflow?
                      </span>
                    </h2>
                    
                    {/* Decorative line */}
                    <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full" />

                    {/* CTA Button */}
                    <button 
                      onClick={() => setIsWaitlistOpen(true)}
                      className="group relative px-10 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-base font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
                    >
                      <span className="relative z-10">Join the Waitlist</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>

                    {/* Social Proof */}
                    <div className="mt-5 flex items-center justify-center gap-2">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white" />
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white" />
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white" />
                      </div>
                      <p className="text-xs text-gray-600 font-medium ml-2">
                        Join other <span className="text-gray-900 font-semibold">B2B SaaS</span> co on the waitlist
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Arc Reactor Core - Iron Man style arc reactor */}
        <motion.div
          className="fixed pointer-events-none"
          style={{
            left: "50%",
            top: "calc(50% + 40px)",
            x: useTransform(logoToFunnel, [0, 1], [0, 0]),
            y: useTransform(logoToFunnel, [0, 1], [0, 0]),
            opacity: useTransform(logoToFunnel, [0, 0.3, 0.65, 1], [0, 1, 1, 0]),
            zIndex: 15,
            willChange: "opacity, transform",
            scale: 1,
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          <motion.div
            className="relative w-36 h-36"
            style={{
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
              filter: "drop-shadow(0 0 60px rgba(96, 165, 250, 0.9))",
            }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Outer glow halo */}
            <motion.div
              className="absolute -inset-4 rounded-full will-change-transform"
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                background: "radial-gradient(circle, transparent 60%, rgba(96, 165, 250, 0.3) 70%, rgba(96, 165, 250, 0.1) 100%)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              initial={false}
            />

            {/* Holographic outer ring 1 */}
            <motion.div
              className="absolute -inset-2 rounded-full will-change-transform"
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                border: "1px solid rgba(96, 165, 250, 0.4)",
                background: "transparent",
              }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              initial={false}
            />

            {/* Holographic outer ring 2 */}
            <motion.div
              className="absolute -inset-1 rounded-full will-change-transform"
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                border: "1px solid rgba(147, 197, 253, 0.5)",
                background: "transparent",
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              initial={false}
            />

            {/* Main outer energy ring - Bright blue */}
            <motion.div
              className="absolute inset-0 rounded-full will-change-transform"
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                border: "4px solid rgba(96, 165, 250, 1)",
                background: "transparent",
                boxShadow: "0 0 100px rgba(96, 165, 250, 1), 0 0 50px rgba(96, 165, 250, 0.8), inset 0 0 60px rgba(147, 197, 253, 0.4)",
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.9, 1, 0.9],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              initial={false}
            />

            {/* Concentric circle 1 */}
            <motion.div
              className="absolute inset-2 rounded-full will-change-transform"
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                border: "1px solid rgba(147, 197, 253, 0.6)",
                background: "transparent",
              }}
              animate={{
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              initial={false}
            />

            {/* Concentric circle 2 */}
            <motion.div
              className="absolute inset-4 rounded-full will-change-transform"
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                border: "1px solid rgba(191, 219, 254, 0.5)",
                background: "transparent",
              }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              initial={false}
            />
            
            {/* Middle rotating ring with segments - Light blue */}
            <motion.div
              className="absolute inset-6 rounded-full will-change-transform"
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                border: "3px solid rgba(147, 197, 253, 1)",
                background: "transparent",
                boxShadow: "0 0 70px rgba(147, 197, 253, 1), inset 0 0 40px rgba(191, 219, 254, 0.4)",
              }}
              animate={{
                rotate: 360,
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              initial={false}
            />

            {/* Concentric circle 3 */}
            <motion.div
              className="absolute inset-8 rounded-full will-change-transform"
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                border: "1px solid rgba(224, 242, 254, 0.6)",
                background: "transparent",
              }}
              animate={{
                opacity: [0.5, 0.9, 0.5],
              }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              initial={false}
            />

            {/* Concentric circle 4 */}
            <motion.div
              className="absolute inset-10 rounded-full will-change-transform"
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                border: "1px solid rgba(240, 249, 255, 0.7)",
                background: "transparent",
              }}
              animate={{
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              initial={false}
            />
            
            {/* Inner counter-rotating ring - Bright white */}
            <motion.div
              className="absolute inset-12 rounded-full will-change-transform"
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                border: "3px solid rgba(255, 255, 255, 1)",
                background: "transparent",
                boxShadow: "0 0 50px rgba(224, 242, 254, 1), inset 0 0 30px rgba(255, 255, 255, 0.6)",
              }}
              animate={{
                rotate: -360,
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              initial={false}
            />

            {/* Innermost holographic circle */}
            <motion.div
              className="absolute inset-[52px] rounded-full will-change-transform"
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.5)",
                background: "transparent",
              }}
              animate={{
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              initial={false}
            />
            
            {/* Core background sphere */}
            <motion.div
              className="absolute inset-3 rounded-full will-change-transform"
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                background: "radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 1) 0%, rgba(240, 249, 255, 1) 20%, rgba(224, 242, 254, 0.9) 40%, rgba(191, 219, 254, 0.6) 70%, rgba(147, 197, 253, 0.3) 100%)",
                boxShadow: "0 0 80px rgba(96, 165, 250, 1), inset 0 0 60px rgba(255, 255, 255, 0.7)",
              }}
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              initial={false}
            />

            {/* Inner detail circle 1 - White */}
            <motion.div
              className="absolute inset-[18%] rounded-full will-change-transform"
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                border: "1.5px solid rgba(255, 255, 255, 0.8)",
                background: "transparent",
              }}
              animate={{
                opacity: [0.6, 1, 0.6],
                rotate: 360,
              }}
              transition={{ 
                opacity: { duration: 1.3, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 8, repeat: Infinity, ease: "linear" }
              }}
              initial={false}
            />

            {/* Inner detail circle 2 - Light Blue */}
            <motion.div
              className="absolute inset-[22%] rounded-full will-change-transform"
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                border: "1px solid rgba(147, 197, 253, 0.7)",
                background: "transparent",
              }}
              animate={{
                opacity: [0.5, 0.9, 0.5],
              }}
              transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              initial={false}
            />

            {/* Inner detail circle 3 - White */}
            <motion.div
              className="absolute inset-[26%] rounded-full will-change-transform"
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                border: "1.5px solid rgba(255, 255, 255, 0.9)",
                background: "transparent",
              }}
              animate={{
                opacity: [0.7, 1, 0.7],
                rotate: -360,
              }}
              transition={{ 
                opacity: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 6, repeat: Infinity, ease: "linear" }
              }}
              initial={false}
            />

            {/* Inner detail circle 4 - Light Blue */}
            <motion.div
              className="absolute inset-[30%] rounded-full will-change-transform"
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                border: "1px solid rgba(191, 219, 254, 0.8)",
                background: "transparent",
              }}
              animate={{
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              initial={false}
            />

            {/* Inner detail circle 5 - White */}
            <motion.div
              className="absolute inset-[34%] rounded-full will-change-transform"
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                border: "1.5px solid rgba(255, 255, 255, 1)",
                background: "transparent",
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.6)",
              }}
              animate={{
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              initial={false}
            />

            {/* Inner detail circle 6 - Light Blue */}
            <motion.div
              className="absolute inset-[38%] rounded-full will-change-transform"
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                border: "1px solid rgba(147, 197, 253, 0.9)",
                background: "transparent",
              }}
              animate={{
                opacity: [0.5, 0.95, 0.5],
                rotate: 360,
              }}
              transition={{ 
                opacity: { duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 },
                rotate: { duration: 10, repeat: Infinity, ease: "linear" }
              }}
              initial={false}
            />

            {/* Inner detail circle 7 - White */}
            <motion.div
              className="absolute inset-[42%] rounded-full will-change-transform"
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                border: "1.5px solid rgba(255, 255, 255, 0.95)",
                background: "transparent",
                boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
              }}
              animate={{
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.08, 1],
              }}
              transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              initial={false}
            />

            {/* Ultra-bright white center core */}
            <motion.div
              className="absolute inset-[30%] rounded-full will-change-opacity"
              style={{
                background: "radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 30%, rgba(240, 249, 255, 0.8) 60%, transparent 100%)",
                boxShadow: "0 0 100px rgba(224, 242, 254, 1), 0 0 60px rgba(255, 255, 255, 1), inset 0 0 50px rgba(255, 255, 255, 1)",
              }}
              animate={{
                opacity: [0.95, 1, 0.95],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              initial={false}
            />
          </motion.div>
        </motion.div>

        {/* Logos Layer (on top of dashboard) - Swirl Effect */}
        {logos.map((logo, index) => {
          const scattered = scatteredPositions[index];
          const totalLogos = logos.length;

          // Calculate organized grid position (where logos organize before funneling)
          const cols = 4;
          const row = Math.floor(index / cols);
          const col = index % cols;
          const gridSpacing = 120;
          const gridX = (col - 1.5) * gridSpacing;
          const gridY = (row - 1) * gridSpacing;

          // X position: scattered → orbit → spiral into arc reactor
          const currentX = useTransform(
            logoToFunnel,
            (progress) => {
              if (progress === 0) return scattered.x;
              
              // First phase (0-0.6): Move to orbital path around reactor
              if (progress < 0.6) {
                const orbitProgress = progress / 0.6;
                const distanceFromOrigin = Math.sqrt(scattered.x * scattered.x + scattered.y * scattered.y);
                const orbitRadius = 150; // Consistent orbit radius
                const orbitAngle = Math.atan2(scattered.y, scattered.x);
                
                // Interpolate from scattered position to orbital path
                const currentRadius = distanceFromOrigin * (1 - orbitProgress) + orbitRadius * orbitProgress;
                const currentAngle = orbitAngle + orbitProgress * Math.PI * 2; // Start rotating towards orbit
                return Math.cos(currentAngle) * currentRadius;
              }
              
              // Second phase (0.6-1): Spiral into center
              const spiralProgress = (progress - 0.6) / 0.4;
              const sharedAngle = spiralProgress * Math.PI * 2;
              const spiralRadius = (1 - spiralProgress) * 150;
              return Math.cos(sharedAngle) * spiralRadius;
            }
          );

          // Y position: scattered → orbit → spiral into arc reactor (synchronized with X)
          const currentY = useTransform(
            logoToFunnel,
            (progress) => {
              if (progress === 0) return scattered.y;
              
              // First phase (0-0.6): Move to orbital path around reactor
              if (progress < 0.6) {
                const orbitProgress = progress / 0.6;
                const distanceFromOrigin = Math.sqrt(scattered.x * scattered.x + scattered.y * scattered.y);
                const orbitRadius = 150;
                const orbitAngle = Math.atan2(scattered.y, scattered.x);
                
                const currentRadius = distanceFromOrigin * (1 - orbitProgress) + orbitRadius * orbitProgress;
                const currentAngle = orbitAngle + orbitProgress * Math.PI * 2;
                return Math.sin(currentAngle) * currentRadius;
              }
              
              // Second phase (0.6-1): Spiral into center
              const spiralProgress = (progress - 0.6) / 0.4;
              const sharedAngle = spiralProgress * Math.PI * 2;
              const spiralRadius = (1 - spiralProgress) * 150;
              return Math.sin(sharedAngle) * spiralRadius;
            }
          );

          // Rotation: continuous spin as logos swirl into reactor
          const currentRotate = useTransform(
            logoToFunnel,
            [0, 1],
            [scattered.rotate, scattered.rotate + 360] // Single spin during swirl
          );

          return (
            <motion.div
              key={`logo-${index}`}
              className="absolute left-1/2 top-1/2 translate-x -translate-y-1/2 pointer-events-none"
              style={{
                x: currentX,
                y: currentY,
                rotate: currentRotate,
                scale: logoScale,
                opacity: logoOpacity,
                zIndex: 20,
                willChange: "transform, opacity",
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
              }}
              initial={false}
            >
              <div className="rounded-2xl bg-white shadow-2xl transform-gpu w-16 h-16 p-3.5">
                <img
                  src={logo.src}
                  alt={`${logo.name} integration - Connect ${logo.name} with HeyJarvis unified dashboard for seamless productivity`}
                  className="w-full h-full object-contain"
                  loading="eager"
                />
              </div>
            </motion.div>
          );
        })}

        {/* Loading Animation - Multiple layers converging into one (Apple-style) */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            opacity: loadingTextOpacity,
            zIndex: 25,
          }}
        >
          <div className="relative w-96 h-48 flex items-center justify-center">
            {/* Multiple horizontal lines that converge into one */}
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="absolute h-1 rounded-full"
                style={{
                  background: "linear-gradient(90deg, rgba(6, 182, 212, 0.3) 0%, rgba(59, 130, 246, 0.6) 30%, rgba(139, 92, 246, 0.8) 50%, rgba(168, 85, 247, 0.6) 70%, rgba(217, 70, 239, 0.3) 100%)",
                }}
                initial={{ width: "70%", y: (index - 1) * 40 }}
                animate={{
                  width: ["70%", "85%", "70%"],
                  y: [(index - 1) * 40, 0, (index - 1) * 40],
                  opacity: [0.4, 0.9, 0.4],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: [0.4, 0.0, 0.2, 1], // Apple's easing curve
                  delay: index * 0.15,
                }}
              />
            ))}

            {/* Central unified layer */}
            <motion.div
              className="absolute h-1 rounded-full"
              style={{
                background: "linear-gradient(90deg, rgba(6, 182, 212, 0.6) 0%, rgba(59, 130, 246, 0.8) 25%, rgba(139, 92, 246, 1) 50%, rgba(168, 85, 247, 0.8) 75%, rgba(217, 70, 239, 0.6) 100%)",
              }}
              animate={{
                width: ["50%", "75%", "50%"],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: [0.4, 0.0, 0.2, 1],
              }}
            />
          </div>
        </motion.div>

        {/* Title - One Layer. Infinite Clarity. */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none text-center px-6"
          style={{
            opacity: titleOpacity,
            top: "14%",
            zIndex: 25,
          }}
        >
          <h2 className="text-4xl md:text-6xl font-bold drop-shadow-2xl whitespace-nowrap">
            <span className="text-black">One Layer.</span>{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Infinite Clarity.
            </span>
          </h2>
        </motion.div>
      </div>

      {/* Waitlist Modal */}
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </div>
  );
};

export const UnifiedDashboardMacbook = ({
  logos,
  scatteredPositions,
  macbookSrc,
}: UnifiedDashboardMacbookProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isHydrated) {
    return (
      <div className="relative h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (isMobile) {
    return <MobileVersion logos={logos} />;
  }

  return (
    <DesktopVersion
      logos={logos}
      scatteredPositions={scatteredPositions}
      macbookSrc={macbookSrc}
      containerRef={containerRef}
    />
  );
};

export const Trackpad = () => {
  return (
    <div
      className="w-[50%] mx-auto h-28 rounded-xl"
      style={{
        background: "linear-gradient(to bottom, #A8A8A8 0%, #B8B8B8 100%)",
        boxShadow: "inset 0 3px 8px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(255,255,255,0.2)",
        border: "1px solid rgba(80,80,80,0.4)",
      }}
    >
      {/* Trackpad glass surface */}
      <div 
        className="w-full h-full rounded-xl"
        style={{
          background: "linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 50%, rgba(255,255,255,0.05) 100%)",
          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.2)",
        }}
      />
    </div>
  );
};

export const Keypad = () => {
  return (
    <div className="mx-1 h-full rounded-md bg-[#050505] p-1.5 [transform:translateZ(0)] [will-change:transform]">
      {/* First Row */}
      <Row>
        <KBtn
          className="w-10 items-end justify-start pl-[4px] pb-[2px]"
          childrenClassName="items-start"
          backlit={true}
        >
          esc
        </KBtn>
        <KBtn backlit={true}>F1</KBtn>
        <KBtn backlit={true}>F2</KBtn>
        <KBtn backlit={true}>F3</KBtn>
        <KBtn backlit={true}>F4</KBtn>
        <KBtn backlit={true}>F5</KBtn>
        <KBtn backlit={true}>F6</KBtn>
        <KBtn backlit={true}>F7</KBtn>
        <KBtn backlit={true}>F8</KBtn>
        <KBtn backlit={true}>F9</KBtn>
        <KBtn backlit={true}>F10</KBtn>
        <KBtn backlit={true}>F11</KBtn>
        <KBtn backlit={true}>F12</KBtn>
        <KBtn>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-3 h-3 opacity-60"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
            />
          </svg>
        </KBtn>
      </Row>

      {/* Second Row */}
      <Row>
        <KBtn backlit={true}>`</KBtn>
        <KBtn backlit={true}>1</KBtn>
        <KBtn backlit={true}>2</KBtn>
        <KBtn backlit={true}>3</KBtn>
        <KBtn backlit={true}>4</KBtn>
        <KBtn backlit={true}>5</KBtn>
        <KBtn backlit={true}>6</KBtn>
        <KBtn backlit={true}>7</KBtn>
        <KBtn backlit={true}>8</KBtn>
        <KBtn backlit={true}>9</KBtn>
        <KBtn backlit={true}>0</KBtn>
        <KBtn backlit={true}>-</KBtn>
        <KBtn backlit={true}>=</KBtn>
        <KBtn className="w-10 items-end justify-end pr-[4px] pb-[2px]" backlit={true}>
          del
        </KBtn>
      </Row>

      {/* Third Row */}
      <Row>
        <KBtn className="w-10 items-end justify-start pl-[4px] pb-[2px]" backlit={true}>
          tab
        </KBtn>
        <KBtn backlit={true}>Q</KBtn>
        <KBtn backlit={true}>W</KBtn>
        <KBtn backlit={true}>E</KBtn>
        <KBtn backlit={true}>R</KBtn>
        <KBtn backlit={true}>T</KBtn>
        <KBtn backlit={true}>Y</KBtn>
        <KBtn backlit={true}>U</KBtn>
        <KBtn backlit={true}>I</KBtn>
        <KBtn backlit={true}>O</KBtn>
        <KBtn backlit={true}>P</KBtn>
        <KBtn backlit={true}>[</KBtn>
        <KBtn backlit={true}>]</KBtn>
        <KBtn className="w-10 items-end justify-end pr-[4px] pb-[2px]" backlit={true}>
          \
        </KBtn>
      </Row>

      {/* Fourth Row */}
      <Row>
        <KBtn className="w-[2.8rem] items-end justify-start pl-[4px] pb-[2px]" backlit={true}>
          caps
        </KBtn>
        <KBtn backlit={true}>A</KBtn>
        <KBtn backlit={true}>S</KBtn>
        <KBtn backlit={true}>D</KBtn>
        <KBtn backlit={true}>F</KBtn>
        <KBtn backlit={true}>G</KBtn>
        <KBtn backlit={true}>H</KBtn>
        <KBtn backlit={true}>J</KBtn>
        <KBtn backlit={true}>K</KBtn>
        <KBtn backlit={true}>L</KBtn>
        <KBtn backlit={true}>;</KBtn>
        <KBtn backlit={true}>'</KBtn>
        <KBtn className="w-[2.85rem] items-end justify-end pr-[4px] pb-[2px]" backlit={true}>
          return
        </KBtn>
      </Row>

      {/* Fifth Row */}
      <Row>
        <KBtn className="w-[3.65rem] items-end justify-start pl-[4px] pb-[2px]" backlit={true}>
          shift
        </KBtn>
        <KBtn backlit={true}>Z</KBtn>
        <KBtn backlit={true}>X</KBtn>
        <KBtn backlit={true}>C</KBtn>
        <KBtn backlit={true}>V</KBtn>
        <KBtn backlit={true}>B</KBtn>
        <KBtn backlit={true}>N</KBtn>
        <KBtn backlit={true}>M</KBtn>
        <KBtn backlit={true}>,</KBtn>
        <KBtn backlit={true}>.</KBtn>
        <KBtn backlit={true}>/</KBtn>
        <KBtn className="w-[3.65rem] items-end justify-end pr-[4px] pb-[2px]" backlit={true}>
          shift
        </KBtn>
      </Row>

      {/* Bottom Row - Simplified */}
      <Row>
        <KBtn backlit={true}>fn</KBtn>
        <KBtn backlit={true}>ctrl</KBtn>
        <KBtn backlit={true}>⌥</KBtn>
        <KBtn className="w-8" backlit={true}>⌘</KBtn>
        <KBtn className="w-[8.2rem]"></KBtn>
        <KBtn className="w-8" backlit={true}>⌘</KBtn>
        <KBtn backlit={true}>⌥</KBtn>
        <div className="w-[4.9rem] mt-[2px] h-6 flex gap-[2px]">
          <KBtn className="w-6 h-6" backlit={true}>◄</KBtn>
          <div className="flex flex-col gap-[2px]">
            <KBtn className="w-6 h-[11px]" backlit={true}>▲</KBtn>
            <KBtn className="w-6 h-[11px]" backlit={true}>▼</KBtn>
          </div>
          <KBtn className="w-6 h-6" backlit={true}>►</KBtn>
        </div>
      </Row>
    </div>
  );
};

export const KBtn = ({
  className,
  children,
  childrenClassName,
  backlit = false,
}: {
  className?: string;
  children?: React.ReactNode;
  childrenClassName?: string;
  backlit?: boolean;
}) => {
  return (
    <div
      className={cn(
        "[transform:translateZ(0)] rounded-[4px] p-[0.5px] [will-change:transform]",
        backlit && "bg-white/[0.2] shadow-xl shadow-white",
      )}
      style={{
        boxShadow: "0 2px 3px rgba(0,0,0,0.4)",
      }}
    >
      <div
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-[3.5px] bg-gradient-to-b from-[#1a1a1d] to-[#0a0a0d]",
          className,
        )}
        style={{
          boxShadow:
            "inset 0 0.5px 1px rgba(255,255,255,0.1), inset 0 -1px 2px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.6)",
        }}
      >
        <div
          className={cn(
            "flex w-full flex-col items-center justify-center text-[5px] text-neutral-300",
            childrenClassName,
            backlit && "text-white",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export const Row = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-[2px] mb-[2px] w-full flex-shrink-0">
      {children}
    </div>
  );
};

export const SpeakerGrid = () => {
  return (
    <div
      className="flex h-full gap-[2px] px-[0.5px]"
      style={{
        backgroundImage:
          "radial-gradient(circle, #555555 0.75px, transparent 0.75px)",
        backgroundSize: "3px 3px",
      }}
    ></div>
  );
};

function cn(...inputs: (string | undefined | boolean)[]) {
  return inputs.filter(Boolean).join(" ");
}
