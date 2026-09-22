import { motion } from 'framer-motion';
import { Maximize2, Layers } from 'lucide-react';
import { ActivityClosure } from './ActivityModules';
import { ActivityMinimalCover, ActivityDecomposition } from './ActivityModulesPart2';
import { TwoNFGate, ThreeNFGate, BCNFGate } from './NormalFormGates';

export function ClosureTab() {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-indigo-500/20">
        <div>
          <h2 className="text-3xl font-bold text-indigo-300 flex items-center gap-2">
            <Maximize2 /> Attribute Closure & Minimal Cover
          </h2>
          <p className="text-xs text-indigo-200 mt-1">Calculating X⁺ & Reducing Dependency Sets</p>
        </div>
      </div>

      <div className="p-5 bg-indigo-950/40 border border-indigo-500/30 rounded-2xl space-y-3 text-xs text-slate-300 leading-relaxed">
        <h3 className="text-base font-bold text-white">Attribute Closure (X⁺) Definition</h3>
        <p>
          The closure of attribute set X, written as <strong>X⁺</strong>, is the set of ALL attributes in relation schema R that can be functionally determined by X under a given set of dependencies F.
        </p>
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[11px] text-amber-300 space-y-1">
          <div>Given F = {'{ MissionID → SpacecraftID, SpacecraftID → SpacecraftName, MissionID → CommanderID, CommanderID → CommanderName }'}</div>
          <div>Calculate MissionID⁺:</div>
          <div className="text-emerald-400 font-bold">MissionID⁺ = {"{ MissionID, SpacecraftID, SpacecraftName, CommanderID, CommanderName }"}</div>
        </div>
      </div>

      <ActivityClosure />
      <ActivityMinimalCover />
    </motion.div>
  );
}

export function TwoNFTab() {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <TwoNFGate />
    </motion.div>
  );
}

export function ThreeNFTab() {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
      <ThreeNFGate />
      <BCNFGate />
    </motion.div>
  );
}

export function DecompositionTab() {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-indigo-500/20">
        <div>
          <h2 className="text-3xl font-bold text-indigo-300 flex items-center gap-2">
            <Layers /> Schema Decomposition Properties
          </h2>
          <p className="text-xs text-indigo-200 mt-1">Lossless-Join & Dependency Preservation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
        <div className="p-5 bg-slate-900/80 rounded-2xl border border-emerald-500/40 space-y-2">
          <h3 className="text-base font-bold text-emerald-400">1. Lossless-Join Decomposition</h3>
          <p className="leading-relaxed">
            A decomposition of R into R1 and R2 is <strong>lossless</strong> if natural join R1 ⋈ R2 produces EXACTLY the original relation R without spurious rows.
          </p>
          <div className="font-mono text-[11px] text-emerald-300 bg-slate-950 p-2 rounded">
            Condition: (R1 ∩ R2) → R1  OR  (R1 ∩ R2) → R2
          </div>
        </div>

        <div className="p-5 bg-slate-900/80 rounded-2xl border border-amber-500/40 space-y-2">
          <h3 className="text-base font-bold text-amber-400">2. Dependency Preservation</h3>
          <p className="leading-relaxed">
            A decomposition preserves dependencies if all original functional dependencies in F can be enforced directly within decomposed tables without performing joins.
          </p>
          <div className="font-mono text-[11px] text-amber-300 bg-slate-950 p-2 rounded">
            Condition: (F1 ∪ F2)⁺ = F⁺
          </div>
        </div>
      </div>

      <ActivityDecomposition />
    </motion.div>
  );
}
