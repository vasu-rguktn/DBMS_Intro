import { motion } from 'framer-motion';
import { Layers, Maximize2, ShieldAlert } from 'lucide-react';

export function ClosureTab() {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h2 className="text-3xl font-bold mb-6 text-indigo-300 flex items-center gap-2"><Maximize2 /> Attribute Closure & Minimal Cover</h2>
      <div className="bg-indigo-900/20 border border-indigo-500/30 p-6 rounded-xl mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Attribute Closure (X⁺)</h3>
        <p className="text-slate-300">The set of all attributes that can be functionally determined by X using a given set of functional dependencies.</p>
      </div>
      <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-600/50">
        <h3 className="text-xl font-bold text-white mb-4">Minimal Cover Process</h3>
        <ol className="list-decimal pl-5 space-y-4 text-slate-300">
          <li><strong>Ensure one attribute on RHS:</strong> Convert A → BC into A → B and A → C.</li>
          <li><strong>Remove extraneous LHS attributes:</strong> Check if an attribute on the left can be removed without changing implication.</li>
          <li><strong>Remove redundant FDs:</strong> Check if an entire dependency can be removed while preserving equivalence.</li>
        </ol>
      </div>
    </motion.div>
  );
}

export function TwoNFTab() {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h2 className="text-3xl font-bold mb-6 text-indigo-300 flex items-center gap-2"><Layers /> Second Normal Form (2NF)</h2>
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50 mb-6">
        <p className="text-slate-300 text-lg">A relation is in 2NF if:</p>
        <ul className="list-disc pl-8 mt-2 space-y-2 text-slate-300">
          <li>It is in 1NF, and</li>
          <li>Every non-prime attribute is fully functionally dependent on every candidate key.</li>
        </ul>
      </div>
      <p className="text-slate-400 bg-indigo-900/10 p-4 rounded-lg">
        <strong>Transformation:</strong> Decompose to remove partial dependencies, separating the duplicated information.
      </p>
    </motion.div>
  );
}

export function ThreeNFTab() {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h2 className="text-3xl font-bold mb-6 text-indigo-300 flex items-center gap-2"><ShieldAlert /> 3NF & BCNF</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-indigo-950/40 p-6 rounded-xl border border-indigo-500/30">
          <h3 className="text-xl font-bold text-white mb-2">Third Normal Form (3NF)</h3>
          <p className="text-slate-300 text-sm mb-4">For every non-trivial FD X → A, at least one is true:</p>
          <ul className="list-disc pl-5 space-y-2 text-slate-400 text-sm">
            <li>X is a superkey, OR</li>
            <li>A is a prime attribute.</li>
          </ul>
        </div>
        <div className="bg-purple-950/40 p-6 rounded-xl border border-purple-500/30">
          <h3 className="text-xl font-bold text-white mb-2">Boyce-Codd Normal Form (BCNF)</h3>
          <p className="text-slate-300 text-sm mb-4">For every non-trivial FD X → Y:</p>
          <ul className="list-disc pl-5 space-y-2 text-slate-400 text-sm">
            <li>X is a superkey.</li>
          </ul>
          <p className="text-xs text-purple-300 mt-4">BCNF is stronger than 3NF.</p>
        </div>
      </div>
    </motion.div>
  );
}

export function DecompositionTab() {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h2 className="text-3xl font-bold mb-6 text-indigo-300">Decomposition</h2>
      <p className="text-slate-300 mb-6">Decomposition means splitting one relation into smaller relations to reduce redundancy.</p>
      <div className="space-y-6">
        <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-600/50">
          <h3 className="text-xl font-bold text-green-400 mb-2">Lossless-Join Decomposition</h3>
          <p className="text-slate-300">Joining the decomposed relations recreates exactly the original relation without spurious tuples.</p>
        </div>
        <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-600/50">
          <h3 className="text-xl font-bold text-yellow-400 mb-2">Dependency Preservation</h3>
          <p className="text-slate-300">Functional dependencies can be enforced by checking the decomposed relations without needing to join them back together.</p>
        </div>
      </div>
    </motion.div>
  );
}
