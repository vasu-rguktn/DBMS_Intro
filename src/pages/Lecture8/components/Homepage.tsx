import { motion } from 'framer-motion';
import { Database, Zap, Cpu, DatabaseBackup } from 'lucide-react';

const Homepage = ({ onStart }: { onStart: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Animated background elements simulating data flow */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30"
            style={{ 
              top: `${Math.random() * 100}%`,
              left: '-100%',
              width: '100%'
            }}
            animate={{ left: '100%' }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <div className="z-10 max-w-4xl mx-auto text-center glass-panel p-12 rounded-3xl border border-white/10 shadow-2xl relative backdrop-blur-md bg-galaxy-800/80">
        
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Today you are not <span className="text-red-400 line-through decoration-red-500/50 decoration-4">writing SQL</span>.
        </motion.h1>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-3xl md:text-5xl font-bold mb-16 glow-text-cyan text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
        >
          Today you will learn how databases THINK.
        </motion.h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-16 relative">
          
          <ProcessStep icon={<Database className="w-8 h-8 text-blue-400" />} title="SQL" delay={2} />
          
          <ProcessArrow delay={2.5} />
          
          <ProcessStep icon={<Cpu className="w-8 h-8 text-purple-400" />} title="Relational Algebra" delay={3} highlight />
          
          <ProcessArrow delay={3.5} />
          
          <ProcessStep icon={<Zap className="w-8 h-8 text-yellow-400" />} title="Optimizer" delay={4} />
          
          <ProcessArrow delay={4.5} />
          
          <ProcessStep icon={<DatabaseBackup className="w-8 h-8 text-green-400" />} title="Result" delay={5} />

        </div>

        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 6, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="px-10 py-5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full font-bold text-xl shadow-[0_0_30px_rgba(0,240,255,0.4)] border border-cyan-400/50 flex items-center justify-center mx-auto gap-3"
        >
          Join Snapchat DB Team <Zap className="w-6 h-6" />
        </motion.button>
      </div>
    </motion.div>
  );
};

const ProcessStep = ({ icon, title, delay, highlight = false }: { icon: React.ReactNode, title: string, delay: number, highlight?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className={`flex flex-col items-center p-4 rounded-xl ${highlight ? 'bg-purple-900/40 border border-purple-500/50 shadow-[0_0_20px_rgba(176,38,255,0.3)]' : 'bg-white/5 border border-white/10'}`}
  >
    <div className="mb-2 p-3 bg-black/30 rounded-full">
      {icon}
    </div>
    <span className="font-semibold text-sm md:text-base">{title}</span>
  </motion.div>
);

const ProcessArrow = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.3 }}
    className="hidden md:block text-gray-400"
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  </motion.div>
);

export default Homepage;
