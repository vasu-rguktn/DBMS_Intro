import { useState, useEffect } from 'react';

import { motion } from 'framer-motion';
import { Bot, ChevronDown } from 'lucide-react';

const storyLines = [
  "Year 2150.",
  "Humanity has colonized hundreds of planets.",
  "Every planet generates massive amounts of data.",
  "Students. Hospitals. Banks. Payments. Universities.",
  "Everything is stored in random files.",
  "Chaos has begun.",
  "Your mission: Discover why Database Management Systems were invented."
];

const StorySection = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );
    
    const element = document.getElementById('story-section');
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible && currentLine < storyLines.length) {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, 1500); // Reveal next line every 1.5s
      return () => clearTimeout(timer);
    }
  }, [isVisible, currentLine]);

  const handleScroll = () => {
    const nextSection = document.getElementById('daily-life-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="story-section" className="min-h-screen flex flex-col items-center justify-center relative px-4 py-20">
      <div className="glass-panel p-8 md:p-12 rounded-3xl max-w-4xl w-full flex flex-col items-center text-center">
        
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mb-8 p-4 bg-[var(--color-galaxy-700)] rounded-full border border-[var(--color-neon-blue)]"
        >
          <Bot size={64} className="text-[var(--color-neon-blue)] glow-text-cyan" />
        </motion.div>

        <div className="space-y-6 text-xl md:text-2xl text-gray-200 font-medium min-h-[300px]">
          {storyLines.map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: index < currentLine ? 1 : 0, 
                y: index < currentLine ? 0 : 20 
              }}
              transition={{ duration: 0.5 }}
              className={index === storyLines.length - 1 ? "text-[var(--color-neon-cyan)] font-bold mt-8 text-3xl" : ""}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: currentLine >= storyLines.length ? 1 : 0 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 87, 255, 0.6)" }}
          whileTap={{ scale: 0.95 }}
          onClick={handleScroll}
          disabled={currentLine < storyLines.length}
          className={`mt-12 glass-panel px-8 py-4 rounded-full flex items-center gap-3 text-lg font-semibold transition-all border border-[var(--color-neon-blue)] hover:bg-[var(--color-neon-blue)] hover:text-white ${currentLine < storyLines.length ? 'pointer-events-none' : ''}`}
        >
          Continue
          <ChevronDown size={24} />
        </motion.button>

      </div>
    </section>
  );
};

export default StorySection;

