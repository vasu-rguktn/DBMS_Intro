
import { motion } from 'framer-motion';
import { Rocket, CheckCircle2, ChevronRight } from 'lucide-react';

const achievements = [
  "What is Data",
  "What is a Database",
  "Why DBMS is required",
  "Where DBMS is used",
  "Why every modern application depends on databases"
];

const MissionCompleteSection = () => {
  return (
    <section id="mission-complete-section" className="min-h-screen flex flex-col items-center justify-center relative px-4 py-20 overflow-hidden">
      
      {/* Background celebration effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-neon-cyan)] opacity-20 blur-[150px] rounded-full pointer-events-none"></div>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, type: 'spring' }}
        className="z-10 flex flex-col items-center text-center w-full max-w-3xl glass-panel p-8 md:p-16 rounded-[40px] border-[var(--color-neon-cyan)] shadow-[0_0_50px_rgba(0,240,255,0.2)]"
      >
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="mb-8"
        >
          <Rocket size={100} className="text-white fill-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
        </motion.div>
        
        <h2 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-cyan)] to-[var(--color-neon-purple)]">
          Mission Complete!
        </h2>
        
        <p className="text-2xl text-white font-medium mb-12">
          Congratulations Commander!
        </p>

        <div className="w-full text-left bg-[var(--color-galaxy-900)]/50 rounded-2xl p-8 mb-12 border border-gray-700">
          <h3 className="text-xl text-gray-300 font-bold mb-6 uppercase tracking-wider">Today you discovered:</h3>
          <ul className="space-y-4">
            {achievements.map((item, idx) => (
              <motion.li 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="flex items-center gap-3 text-lg md:text-xl text-white"
              >
                <CheckCircle2 className="text-[var(--color-neon-cyan)] flex-shrink-0" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-gray-400 mb-4 uppercase tracking-widest text-sm font-bold">Next Mission</p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(176, 38, 255, 0.8)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-gradient-to-r from-[var(--color-neon-purple)] to-[var(--color-neon-blue)] text-white font-bold rounded-full text-2xl flex items-center gap-3 shadow-lg"
          >
            Learning SQL
            <ChevronRight size={28} />
          </motion.button>
        </div>

      </motion.div>
    </section>
  );
};

export default MissionCompleteSection;
