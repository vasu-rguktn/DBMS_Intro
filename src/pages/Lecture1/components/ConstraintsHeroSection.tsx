import { motion } from 'framer-motion';
import { Database, LockKeyhole, Play } from 'lucide-react';

interface Props {
  onStart: () => void;
}

const ConstraintsHeroSection = ({ onStart }: Props) => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-4 py-20 overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-neon-purple)] opacity-20 blur-[150px] rounded-full pointer-events-none"></div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="z-10 flex flex-col items-center text-center w-full max-w-4xl glass-panel p-8 md:p-16 rounded-[40px] border-[var(--color-neon-purple)] shadow-[0_0_50px_rgba(176,38,255,0.2)]"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="mb-8 flex gap-4"
        >
          <Database size={64} className="text-[var(--color-neon-cyan)] drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]" />
          <LockKeyhole size={64} className="text-[var(--color-neon-purple)] drop-shadow-[0_0_15px_rgba(176,38,255,0.8)]" />
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-cyan)] to-[var(--color-neon-purple)]">
          Database Constraints
        </h1>
        
        <h2 className="text-2xl md:text-3xl text-gray-200 font-medium mb-8 max-w-2xl">
          Can you discover the database rules behind your daily social media experience?
        </h2>

        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed">
          You use social media every day, but have you ever wondered how its database prevents duplicate usernames, invalid accounts, duplicate likes, or comments on posts that do not exist?
          <br /><br />
          Complete the challenges below and discover the database constraints working behind the scenes.
        </p>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 240, 255, 0.6)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="px-10 py-5 bg-gradient-to-r from-[var(--color-neon-cyan)] to-[var(--color-neon-blue)] text-gray-900 font-extrabold rounded-full text-2xl flex items-center gap-3 shadow-lg"
        >
          <Play size={28} className="fill-gray-900" />
          Start Challenge
        </motion.button>

      </motion.div>
    </section>
  );
};

export default ConstraintsHeroSection;
