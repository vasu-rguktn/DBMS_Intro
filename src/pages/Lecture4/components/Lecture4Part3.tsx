import { motion } from 'framer-motion';
import { Route, Zap } from 'lucide-react';

export function JourneyTab() {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h2 className="text-3xl font-bold mb-6 text-indigo-300 flex items-center gap-2"><Route /> Complete Normalization Journey</h2>
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
        <ol className="list-decimal pl-5 space-y-4 text-slate-300 font-medium">
          <li>Find non-atomic values.</li>
          <li>Convert to 1NF.</li>
          <li>Identify candidate keys.</li>
          <li>Identify functional dependencies.</li>
          <li>Calculate attribute closure.</li>
          <li>Find partial dependencies.</li>
          <li>Convert to 2NF.</li>
          <li>Find transitive dependencies.</li>
          <li>Convert to 3NF.</li>
          <li>Check BCNF.</li>
          <li>Decompose relations.</li>
          <li>Check lossless join and dependency preservation.</li>
        </ol>
        <div className="mt-8 text-center text-2xl font-bold text-green-400">
          MISSION DATABASE NORMALIZED 🚀
        </div>
      </div>
    </motion.div>
  );
}

export function FlashcardsTab() {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h2 className="text-3xl font-bold mb-6 text-indigo-300 flex items-center gap-2"><Zap /> Flash Cards & Traps</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-indigo-950/40 p-6 rounded-xl border border-indigo-500/30">
          <h3 className="text-xl font-bold text-white mb-4">Example Flashcard</h3>
          <p className="text-slate-300 mb-2"><strong>Term:</strong> 1NF</p>
          <p className="text-slate-300 mb-2"><strong>Definition:</strong> Atomic values, no repeating groups.</p>
          <p className="text-slate-300"><strong>Common Mistake:</strong> Thinking 1NF means no duplicate rows.</p>
        </div>
        <div className="bg-red-950/40 p-6 rounded-xl border border-red-500/30">
          <h3 className="text-xl font-bold text-white mb-4">Common Trap</h3>
          <p className="text-red-300 mb-2">❌ "Every decomposition is lossless."</p>
          <p className="text-green-300">✅ Losslessness must be established; decomposition can introduce spurious tuples if done incorrectly.</p>
        </div>
      </div>
    </motion.div>
  );
}
