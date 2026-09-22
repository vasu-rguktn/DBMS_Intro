import { motion } from 'framer-motion';
import { Network, KeyRound, Lightbulb } from 'lucide-react';

export function FdTab() {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h2 className="text-3xl font-bold mb-6 text-indigo-300 flex items-center gap-2"><Network /> Functional Dependencies</h2>
      <div className="space-y-6 text-slate-300">
        <p>A functional dependency describes a constraint between attributes, written as <strong>X → Y</strong>.</p>
        <p>Read it as: "If two tuples have the same value of X, they must have the same value of Y."</p>
        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>X</strong> is the determinant.</li>
            <li><strong>Y</strong> is functionally dependent on X.</li>
          </ul>
        </div>
        <div className="bg-indigo-900/20 border border-indigo-500/30 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-4">Important Dependency Rules</h3>
          <div className="space-y-4">
            <div><strong className="text-indigo-400">Trivial FD:</strong> X → Y is trivial if Y ⊆ X. (e.g., {'{MissionID, SpacecraftID} → MissionID'})</div>
            <div><strong className="text-indigo-400">Non-Trivial FD:</strong> X → Y where Y is not a subset of X. (e.g., MissionID → MissionName)</div>
            <div><strong className="text-indigo-400">Full Functional Dependency:</strong> Y is dependent on the whole of X and not any proper subset of X.</div>
            <div><strong className="text-indigo-400">Partial Dependency:</strong> A non-prime attribute depends on only part of a composite candidate key.</div>
            <div><strong className="text-indigo-400">Transitive Dependency:</strong> If X → Y and Y → Z, then X determines Z through Y.</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function KeysTab() {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h2 className="text-3xl font-bold mb-6 text-indigo-300 flex items-center gap-2"><KeyRound /> Keys & Prime Attributes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-300">
        <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-600/50">
          <h3 className="text-xl font-bold text-white mb-2">Prime Attribute</h3>
          <p>An attribute that is part of at least one candidate key.</p>
        </div>
        <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-600/50">
          <h3 className="text-xl font-bold text-white mb-2">Non-Prime Attribute</h3>
          <p>An attribute that is not part of any candidate key.</p>
        </div>
      </div>
      <div className="mt-6 bg-indigo-900/20 border border-indigo-500/30 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-white mb-4">Candidate Key</h3>
        <p className="text-slate-300 mb-4">A candidate key is a minimal set of attributes that uniquely identifies each tuple.</p>
        <ul className="list-disc pl-5 space-y-2 text-slate-400">
          <li>Must uniquely identify tuples.</li>
          <li>Must be minimal (no unnecessary attributes).</li>
          <li>A relation may have multiple candidate keys.</li>
          <li>One is selected as the primary key.</li>
        </ul>
      </div>
    </motion.div>
  );
}

export function AxiomsTab() {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h2 className="text-3xl font-bold mb-6 text-indigo-300 flex items-center gap-2"><Lightbulb /> Armstrong's Axioms</h2>
      <div className="space-y-6">
        <div className="bg-slate-800/80 border border-slate-600/50 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-yellow-400 mb-2">1. Reflexivity</h3>
          <p className="text-slate-300">If Y ⊆ X, then <strong>X → Y</strong></p>
        </div>
        <div className="bg-slate-800/80 border border-slate-600/50 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-green-400 mb-2">2. Augmentation</h3>
          <p className="text-slate-300">If <strong>X → Y</strong>, then <strong>XZ → YZ</strong></p>
        </div>
        <div className="bg-slate-800/80 border border-slate-600/50 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-purple-400 mb-2">3. Transitivity</h3>
          <p className="text-slate-300">If <strong>X → Y</strong> and <strong>Y → Z</strong>, then <strong>X → Z</strong></p>
        </div>
      </div>
    </motion.div>
  );
}
