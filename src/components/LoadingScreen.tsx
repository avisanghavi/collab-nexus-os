import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen: React.FC<{ onFinish?: () => void }> = ({ onFinish }) => {
  const [typedText, setTypedText] = useState('');
  const [showTagline, setShowTagline] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const jarvisText = 'HeyJarvis';

  useEffect(() => {
    const timeline = async () => {
      // 1. Logo Reveal (0-1s) - Typing effect (faster)
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= jarvisText.length) {
          setTypedText(jarvisText.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 100); // Faster typing (was 150ms)

      // 2. Pulse + Tagline (1-1.8s)
      setTimeout(() => {
        setShowTagline(true);
      }, 1000); // Faster (was 1500ms)

      // 3. Loading Indicator (1.8-3s)
      setTimeout(() => {
        setShowProgress(true);

        // Progress bar animation (faster)
        const progressInterval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 100) {
              clearInterval(progressInterval);
              return 100;
            }
            return prev + 8; // Faster progress (was 5)
          });
        }, 30); // Faster interval (was 40ms)

      }, 1800); // Faster (was 3000ms)

      // 4. Fade Out (3-3.8s)
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          if (onFinish) onFinish();
        }, 800); // Faster fade (was 1000ms)
      }, 3000); // Much faster (was 5000ms)
    };

    timeline();
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 1 }}
      style={{ 
        WebkitBackfaceVisibility: 'hidden',
        WebkitPerspective: 1000,
        WebkitTransform: 'translate3d(0,0,0)',
        transform: 'translate3d(0,0,0)'
      }}
    >
      {/* Main Jarvis Logo */}
      <div className="relative px-4">
        {/* Simplified glow background - no blur for Safari performance */}
        {showTagline && (
          <motion.div
            className="absolute inset-0 -inset-x-8 -inset-y-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [0.98, 1.02, 0.98]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
        
        <motion.h1
          className="text-7xl md:text-9xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 whitespace-nowrap relative z-10"
          style={{ willChange: 'transform' }}
        >
          {typedText}
          {typedText.length < jarvisText.length && (
            <motion.span
              className="text-blue-600"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              |
            </motion.span>
          )}
        </motion.h1>
      </div>

      {/* Tagline */}
      <AnimatePresence>
        {showTagline && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl md:text-2xl text-gray-600 mt-6 font-light tracking-wide"
          >
            Connecting Your Workspace.
          </motion.p>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      <AnimatePresence>
        {showProgress && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 w-80 max-w-[80vw] h-1 bg-gray-200 rounded-full overflow-hidden"
          >
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-100 ease-linear"
              style={{ 
                width: `${progress}%`,
                willChange: 'width'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LoadingScreen;
