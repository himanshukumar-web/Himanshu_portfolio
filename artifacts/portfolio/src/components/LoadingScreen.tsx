import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Wait for fade out animation
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        >
          <div className="relative flex flex-col items-center justify-center">
            {/* Animated outer ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute w-32 h-32 rounded-full border-t-2 border-r-2 border-accent border-opacity-70 shadow-[0_0_30px_rgba(0,212,255,0.4)]"
            />
            
            {/* Inner pulsating ring */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-24 h-24 rounded-full border border-primary opacity-50 shadow-[0_0_20px_rgba(0,102,255,0.6)]"
            />
            
            {/* Center Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <h1 className="text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-br from-accent to-primary animate-pulse">
                HK
              </h1>
            </motion.div>

            {/* Loading text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-16 text-sm text-accent/80 font-mono tracking-widest uppercase"
            >
              INITIALIZING...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
