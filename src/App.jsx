import React, { useState } from 'react';
import CountdownScene from './components/CountdownScene';
import CelebrationScene from './components/CelebrationScene';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [isCelebration, setIsCelebration] = useState(false);

  // Auto-detect if date passed on load
  React.useEffect(() => {
    const target = new Date('2026-02-12T13:30:00');
    if (new Date() >= target) {
      setIsCelebration(true);
    }
  }, []);

  const handleCountdownComplete = () => {
    setIsCelebration(true);
  };

  return (
    <div className="relative min-h-screen font-sans text-white bg-black h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {!isCelebration ? (
          <motion.div
            key="countdown"
            className="w-full h-full"
            exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
            transition={{ duration: 1 }}
          >
            <CountdownScene onComplete={handleCountdownComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="celebration"
            className="w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <CelebrationScene />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
