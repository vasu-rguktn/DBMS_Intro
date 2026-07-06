
import { motion } from 'framer-motion';
import { Rocket, ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const handleScroll = () => {
    const nextSection = document.getElementById('story-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      
      {/* Background glowing effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-neon-purple)] opacity-20 blur-[150px] rounded-full pointer-events-none"></div>
      
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 flex flex-col items-center text-center"
      >
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="mb-8"
        >
          <Rocket size={80} className="text-[var(--color-neon-cyan)] drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]" />
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight glow-text-purple">
          Mission Database Galaxy
        </h1>
        
        <p className="text-xl md:text-3xl text-gray-300 font-light max-w-2xl mb-12">
          "Can you save the universe from Data Chaos?"
        </p>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 240, 255, 0.6)" }}
          whileTap={{ scale: 0.95 }}
          onClick={handleScroll}
          className="glass-panel px-8 py-4 rounded-full flex items-center gap-3 text-lg font-semibold text-white transition-all border border-[var(--color-neon-cyan)] hover:bg-[var(--color-neon-cyan)] hover:text-black"
        >
          Start Mission
          <ChevronDown size={24} />
        </motion.button>

      </motion.div>
    </section>
  );
};

export default HeroSection;
