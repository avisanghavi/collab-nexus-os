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
      // 1. Logo Reveal (0-1.5s) - Typing effect
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= jarvisText.length) {
          setTypedText(jarvisText.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 150);

      // 2. Pulse + Tagline (1.5-3s)
      setTimeout(() => {
        setShowTagline(true);
      }, 1500);

      // 3. Loading Indicator (3-5s)
      setTimeout(() => {
        setShowProgress(true);

        // Progress bar animation
        const progressInterval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 100) {
              clearInterval(progressInterval);
              return 100;
            }
            return prev + 5;
          });
        }, 40);

      }, 3000);

      // 4. Fade Out (5-6s)
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          if (onFinish) onFinish();
        }, 1000);
      }, 5000);
    };

    timeline();
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 1 }}
    >
      {/* Main Jarvis Logo */}
      <div className="relative">
        <motion.h1
          className="text-6xl md:text-8xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
          animate={{
            filter: showTagline ? [
              "drop-shadow(0 0 20px rgba(147,51,234,0.3))",
              "drop-shadow(0 0 40px rgba(147,51,234,0.5))",
              "drop-shadow(0 0 20px rgba(147,51,234,0.3))"
            ] : "drop-shadow(0 0 0px rgba(147,51,234,0))"
          }}
          transition={{
            filter: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
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

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 text-6xl md:text-8xl font-extrabold tracking-wide text-blue-600/10 blur-xl"
          animate={{
            opacity: showTagline ? [0.3, 0.7, 0.3] : 0
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {typedText}
        </motion.div>
      </div>

      {/* Tagline */}
      <AnimatePresence>
        {showTagline && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl md:text-2xl text-gray-600 mt-6 font-light tracking-wide"
          >
            The future of work.
          </motion.p>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      <AnimatePresence>
        {showProgress && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            className="mt-8 w-80 max-w-[80vw] h-1 bg-gray-200 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LoadingScreen;
