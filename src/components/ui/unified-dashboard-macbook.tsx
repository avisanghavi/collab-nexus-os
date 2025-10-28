"use client";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

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

export const UnifiedDashboardMacbook = ({
  logos,
  scatteredPositions,
  macbookSrc,
}: UnifiedDashboardMacbookProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Animation timeline:
  // 0-0.3: Dashboard un-tilts and centers
  // 0.0-0.05: Logos visible scattered
  // 0.3-0.45: Logos consolidate to center and disappear
  // 0.35-0.5: Loading text with typing animation appears
  // 0.5-0.55: Loading text fades out, dashboard begins transformation
  // 0.55-0.7: Dashboard morphs into MacBook screen (size, border, color)
  // 0.65-0.8: MacBook frame materializes around the screen
  // 0.8-1: Final polish

  // Dashboard animations
  const dashboardY = useTransform(scrollYProgress,
    [0, 0.1, 0.3, 0.55, 0.7],
    [300, 100, 0, 0, -50] // Moves up slightly as it slots into MacBook
  );
  const dashboardRotateX = useTransform(scrollYProgress,
    [0, 0.3, 0.55, 0.7],
    [45, 0, 0, -20] // Un-tilts, then tilts back slightly to match MacBook screen angle
  );

  // Dashboard to MacBook screen transformation
  // Use viewport-based initial size, then shrink to fixed MacBook dimensions
  const dashboardWidth = useTransform(scrollYProgress,
    [0, 0.55, 0.7],
    [1200, 1200, 800] // Start large, then shrink to MacBook screen width
  );
  const dashboardHeight = useTransform(scrollYProgress,
    [0, 0.55, 0.7],
    [700, 700, 500] // Start large, then shrink to MacBook screen height
  );
  const dashboardScale = useTransform(scrollYProgress,
    [0.55, 0.7],
    [1, 0.76] // Scale down to 76% (0.8 * 0.95)
  );

  // Logo to Jarvis orb animations
  const logoOpacity = useTransform(scrollYProgress,
    [0, 0.05, 0.3, 0.45],
    [1, 1, 1, 0]
  );
  const logoToOrb = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);
  const logoScale = useTransform(scrollYProgress, [0.3, 0.45], [1, 0.3]);

  // Loading text animations
  const loadingTextOpacity = useTransform(scrollYProgress,
    [0.35, 0.4, 0.48, 0.53],
    [0, 1, 1, 0]
  );

  // MacBook frame animations (appears after screen transformation)
  const macbookFrameOpacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);

  // Dashboard content to MacBook content transition
  const macbookContentOpacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[400vh]"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-white">

        {/* Main Dashboard/Screen Container */}
        <motion.div
          className="absolute flex items-center justify-center"
          style={{
            y: dashboardY,
            rotateX: dashboardRotateX,
            scale: dashboardScale,
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
                        className="object-cover object-left-top h-full w-full"
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
              transform: "translateY(calc(-50% + 440px))",
              width: "800px",
            }}
          >
            <div
              className="relative -z-10 h-[19rem] w-full overflow-hidden rounded-2xl"
              style={{
                transform: "perspective(800px) rotateX(25deg) translateZ(0px)",
                transformOrigin: "top",
                transformStyle: "preserve-3d",
                background: "linear-gradient(to bottom, #D3D3D3 0%, #C0C0C0 40%, #A8A8A8 100%)",
              }}
            >
              {/* Above keyboard bar */}
              <div className="relative h-10 w-full">
                <div className="absolute inset-x-0 mx-auto h-4 w-[80%] bg-[#050505]" />
              </div>

              {/* Keyboard and speakers */}
              <div className="relative flex">
                <div className="mx-auto h-full w-[10%] overflow-hidden">
                  <SpeakerGrid />
                </div>
                <div className="mx-auto h-full w-[80%] flex items-center justify-center">
                  <div className="scale-[1.1] origin-center">
                    <Keypad />
                  </div>
                </div>
                <div className="mx-auto h-full w-[10%] overflow-hidden">
                  <SpeakerGrid />
                </div>
              </div>

              {/* Trackpad */}
              <Trackpad />

              {/* Bottom edge gradient */}
              <div className="absolute inset-x-0 bottom-0 mx-auto h-2 w-20 rounded-tl-3xl rounded-tr-3xl bg-gradient-to-t from-[#272729] to-[#050505]" />
            </div>
          </motion.div>
        </motion.div>

        {/* Logos Layer (on top of dashboard) */}
        {logos.map((logo, index) => {
          const scattered = scatteredPositions[index];

          const currentX = useTransform(
            logoToOrb,
            [0, 1],
            [scattered.x, 0]
          );

          const currentY = useTransform(
            logoToOrb,
            [0, 1],
            [scattered.y, 0]
          );

          const currentRotate = useTransform(
            logoToOrb,
            [0, 1],
            [scattered.rotate, 0]
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
              }}
            >
              <div className="w-16 h-16 rounded-2xl bg-white shadow-2xl p-3.5 transform-gpu">
                <img
                  src={logo.src}
                  alt={`${logo.name} integration`}
                  className="w-full h-full object-contain"
                  loading="eager"
                />
              </div>
            </motion.div>
          );
        })}

        {/* Loading Text Animation */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            opacity: loadingTextOpacity,
            zIndex: 25,
          }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent flex items-center justify-center gap-1">
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "auto" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                style={{ display: "inline-block", overflow: "hidden", whiteSpace: "nowrap" }}
              >
                Unifying your workspace
              </motion.span>
              <div className="flex gap-1">
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                >
                  .
                </motion.span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                >
                  .
                </motion.span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                >
                  .
                </motion.span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const Trackpad = () => {
  return (
    <div
      className="w-[40%] mx-auto h-40 rounded-xl my-1"
      style={{
        boxShadow: "0px 0px 1px 1px #00000020 inset",
      }}
    ></div>
  );
};

export const Keypad = () => {
  return (
    <div className="mx-1 h-full rounded-md bg-[#050505] p-1 [transform:translateZ(0)] [will-change:transform]">
      {/* First Row */}
      <Row>
        <KBtn
          className="w-10 items-end justify-start pl-[4px] pb-[2px]"
          childrenClassName="items-start"
        >
          esc
        </KBtn>
        <KBtn>F1</KBtn>
        <KBtn>F2</KBtn>
        <KBtn>F3</KBtn>
        <KBtn>F4</KBtn>
        <KBtn>F5</KBtn>
        <KBtn>F6</KBtn>
        <KBtn>F7</KBtn>
        <KBtn>F8</KBtn>
        <KBtn>F9</KBtn>
        <KBtn>F10</KBtn>
        <KBtn>F11</KBtn>
        <KBtn>F12</KBtn>
        <KBtn>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
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
        <KBtn>`</KBtn>
        <KBtn>1</KBtn>
        <KBtn>2</KBtn>
        <KBtn>3</KBtn>
        <KBtn>4</KBtn>
        <KBtn>5</KBtn>
        <KBtn>6</KBtn>
        <KBtn>7</KBtn>
        <KBtn>8</KBtn>
        <KBtn>9</KBtn>
        <KBtn>0</KBtn>
        <KBtn>-</KBtn>
        <KBtn>=</KBtn>
        <KBtn className="w-10 items-end justify-end pr-[4px] pb-[2px]">
          del
        </KBtn>
      </Row>

      {/* Third Row */}
      <Row>
        <KBtn className="w-10 items-end justify-start pl-[4px] pb-[2px]">
          tab
        </KBtn>
        <KBtn>Q</KBtn>
        <KBtn>W</KBtn>
        <KBtn>E</KBtn>
        <KBtn>R</KBtn>
        <KBtn>T</KBtn>
        <KBtn>Y</KBtn>
        <KBtn>U</KBtn>
        <KBtn>I</KBtn>
        <KBtn>O</KBtn>
        <KBtn>P</KBtn>
        <KBtn>[</KBtn>
        <KBtn>]</KBtn>
        <KBtn className="w-10 items-end justify-end pr-[4px] pb-[2px]">
          \
        </KBtn>
      </Row>

      {/* Fourth Row */}
      <Row>
        <KBtn className="w-[2.8rem] items-end justify-start pl-[4px] pb-[2px]">
          caps
        </KBtn>
        <KBtn>A</KBtn>
        <KBtn>S</KBtn>
        <KBtn>D</KBtn>
        <KBtn>F</KBtn>
        <KBtn>G</KBtn>
        <KBtn>H</KBtn>
        <KBtn>J</KBtn>
        <KBtn>K</KBtn>
        <KBtn>L</KBtn>
        <KBtn>;</KBtn>
        <KBtn>'</KBtn>
        <KBtn className="w-[2.85rem] items-end justify-end pr-[4px] pb-[2px]">
          return
        </KBtn>
      </Row>

      {/* Fifth Row */}
      <Row>
        <KBtn className="w-[3.65rem] items-end justify-start pl-[4px] pb-[2px]">
          shift
        </KBtn>
        <KBtn>Z</KBtn>
        <KBtn>X</KBtn>
        <KBtn>C</KBtn>
        <KBtn>V</KBtn>
        <KBtn>B</KBtn>
        <KBtn>N</KBtn>
        <KBtn>M</KBtn>
        <KBtn>,</KBtn>
        <KBtn>.</KBtn>
        <KBtn>/</KBtn>
        <KBtn className="w-[3.65rem] items-end justify-end pr-[4px] pb-[2px]">
          shift
        </KBtn>
      </Row>

      {/* Bottom Row - Simplified */}
      <Row>
        <KBtn>fn</KBtn>
        <KBtn>ctrl</KBtn>
        <KBtn>⌥</KBtn>
        <KBtn className="w-8">⌘</KBtn>
        <KBtn className="w-[8.2rem]"></KBtn>
        <KBtn className="w-8">⌘</KBtn>
        <KBtn>⌥</KBtn>
        <div className="w-[4.9rem] mt-[2px] h-6 flex gap-[2px]">
          <KBtn className="w-6 h-6">◄</KBtn>
          <div className="flex flex-col gap-[2px]">
            <KBtn className="w-6 h-[11px]">▲</KBtn>
            <KBtn className="w-6 h-[11px]">▼</KBtn>
          </div>
          <KBtn className="w-6 h-6">►</KBtn>
        </div>
      </Row>
    </div>
  );
};

export const KBtn = ({
  className,
  children,
  childrenClassName,
  backlit = true,
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
    >
      <div
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-[3.5px] bg-[#0A090D]",
          className,
        )}
        style={{
          boxShadow:
            "0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset",
        }}
      >
        <div
          className={cn(
            "flex w-full flex-col items-center justify-center text-[5px] text-neutral-200",
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
      className="mt-2 flex h-40 gap-[2px] px-[0.5px]"
      style={{
        backgroundImage:
          "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
        backgroundSize: "3px 3px",
      }}
    ></div>
  );
};

function cn(...inputs: (string | undefined | boolean)[]) {
  return inputs.filter(Boolean).join(" ");
}
