import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSpreadsheet, TableProperties, Search, ChevronDown, CheckCircle2, Database } from 'lucide-react';

const files = [
  "student.xlsx",
  "attendance_final.xlsx",
  "attendance_latest.xlsx",
  "student_copy_final.xlsx",
  "marks_real_final.xlsx",
  "data_2023_old.csv",
  "temp_grades.txt",
  "students_new_final.xlsx"
];

const ChaosSection = () => {
  const [isActivated, setIsActivated] = useState(false);

  const handleScroll = () => {
    const nextSection = document.getElementById('usage-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="chaos-section" className="min-h-screen flex flex-col items-center justify-center relative px-4 py-20 overflow-hidden">
      
      <div className="z-10 text-center mb-12 relative h-[100px]">
        <AnimatePresence mode="wait">
          {!isActivated ? (
            <motion.div
              key="chaos-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-full"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-red-400 glow-text-red mb-4">
                Data Chaos
              </h2>
              <div className="flex items-center justify-center gap-2 text-xl text-gray-300">
                <Search className="text-red-400" />
                <span>Challenge: Find Roll No 210034</span>
                <span className="text-red-500 font-bold ml-2">(Impossible)</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="dbms-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-full"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-neon-cyan)] glow-text-cyan mb-4">
                Data Order
              </h2>
              <div className="flex items-center justify-center gap-2 text-xl text-gray-300">
                <CheckCircle2 className="text-[var(--color-neon-cyan)]" />
                <span>Roll No 210034 Found in 0.001s</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative w-full max-w-5xl h-[400px] mb-12 flex items-center justify-center">
        <AnimatePresence>
          {!isActivated && files.map((file, i) => (
            <motion.div
              key={`file-${i}`}
              className="absolute glass-panel p-4 rounded-xl flex items-center gap-3 border-red-500/30 text-red-200"
              initial={{ 
                x: (Math.random() - 0.5) * 800, 
                y: (Math.random() - 0.5) * 300,
                rotate: (Math.random() - 0.5) * 60,
                opacity: 0
              }}
              animate={{ 
                x: (Math.random() - 0.5) * 600, 
                y: (Math.random() - 0.5) * 200,
                rotate: (Math.random() - 0.5) * 90,
                opacity: 1
              }}
              exit={{ 
                scale: 0, 
                opacity: 0,
                transition: { duration: 0.5, delay: i * 0.1 }
              }}
              transition={{ 
                duration: 5 + Math.random() * 5, 
                repeat: Infinity, 
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
            >
              <FileSpreadsheet size={32} className="text-red-400" />
              <span className="font-mono text-sm">{file}</span>
            </motion.div>
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {isActivated && (
            <motion.div
              key="organized-table"
              initial={{ opacity: 0, scale: 0.8, rotateX: 45 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 1, delay: 0.8, type: 'spring' }}
              className="w-full max-w-3xl glass-panel rounded-xl overflow-hidden border-[var(--color-neon-cyan)] shadow-[0_0_30px_rgba(0,240,255,0.2)]"
            >
              <div className="bg-[var(--color-galaxy-700)] p-4 border-b border-gray-700 flex items-center gap-3">
                <TableProperties className="text-[var(--color-neon-cyan)]" />
                <span className="font-bold text-white tracking-widest">STUDENT_DATABASE</span>
              </div>
              <div className="p-0 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[var(--color-galaxy-800)] text-[var(--color-neon-cyan)] text-sm uppercase">
                      <th className="p-4 border-b border-gray-700">Roll No</th>
                      <th className="p-4 border-b border-gray-700">Name</th>
                      <th className="p-4 border-b border-gray-700">Attendance</th>
                      <th className="p-4 border-b border-gray-700">Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800 hover:bg-white/5 transition-colors">
                      <td className="p-4 font-mono">210033</td>
                      <td className="p-4 text-gray-300">Alex Chen</td>
                      <td className="p-4 text-gray-300">92%</td>
                      <td className="p-4 text-gray-300">88</td>
                    </tr>
                    <tr className="bg-[var(--color-neon-cyan)]/20 border-b border-gray-800 text-white font-bold">
                      <td className="p-4 font-mono text-[var(--color-neon-cyan)]">210034</td>
                      <td className="p-4">Sarah Connor</td>
                      <td className="p-4">98%</td>
                      <td className="p-4">95</td>
                    </tr>
                    <tr className="border-b border-gray-800 hover:bg-white/5 transition-colors">
                      <td className="p-4 font-mono">210035</td>
                      <td className="p-4 text-gray-300">John Doe</td>
                      <td className="p-4 text-gray-300">75%</td>
                      <td className="p-4 text-gray-300">62</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="h-[100px] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {!isActivated ? (
            <motion.button
              key="activate-btn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(176, 38, 255, 0.8)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsActivated(true)}
              className="px-8 py-4 bg-[var(--color-neon-purple)] text-white font-bold rounded-full text-xl flex items-center gap-3 shadow-[0_0_15px_rgba(176,38,255,0.5)]"
            >
              <Database size={24} />
              ACTIVATE DBMS
            </motion.button>
          ) : (
            <motion.div
              key="success-msg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="flex flex-col items-center"
            >
              <p className="text-2xl text-[var(--color-neon-cyan)] font-bold mb-6">
                This is why DBMS exists.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleScroll}
                className="glass-panel px-6 py-2 rounded-full border border-[var(--color-neon-cyan)] hover:bg-[var(--color-neon-cyan)] hover:text-black transition-all flex items-center gap-2"
              >
                Continue <ChevronDown size={20} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
};

export default ChaosSection;
