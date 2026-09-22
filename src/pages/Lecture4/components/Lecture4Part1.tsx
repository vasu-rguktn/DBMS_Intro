import { useState } from 'react';
import { motion } from 'framer-motion';
import { Network, KeyRound, Lightbulb, CheckCircle2 } from 'lucide-react';
import { ActivityFDSorter } from './ActivityModulesPart2';

export function FdTab() {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-indigo-500/20">
        <div>
          <h2 className="text-3xl font-bold text-indigo-300 flex items-center gap-2">
            <Network /> Functional Dependencies (FDs)
          </h2>
          <p className="text-xs text-indigo-200 mt-1">Constraint between attribute sets: X → Y</p>
        </div>
      </div>

      <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
        <p>
          A <strong>functional dependency</strong> describes a constraint between attributes in a relation. Written as:
        </p>
        <div className="text-center py-3 bg-slate-950 rounded-2xl border border-indigo-500/30 text-2xl font-mono font-bold text-amber-400">
          X → Y
        </div>
        <p className="text-slate-300">
          Read it as: <em>"If two tuples have the same value of X, they MUST have the same value of Y."</em>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/80">
            <span className="text-amber-400 font-bold block mb-1">X = Determinant</span>
            <span className="text-xs text-slate-400">The attribute set on the left side that determines Y.</span>
          </div>
          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/80">
            <span className="text-indigo-400 font-bold block mb-1">Y = Dependent</span>
            <span className="text-xs text-slate-400">The attribute set on the right side functionally determined by X.</span>
          </div>
        </div>

        <div className="p-4 bg-indigo-950/40 border border-indigo-500/30 rounded-2xl space-y-2">
          <h3 className="font-bold text-white text-base">Examples from SPACE_MISSION_MASTER:</h3>
          <ul className="list-disc pl-5 space-y-1 font-mono text-xs text-indigo-200">
            <li>SpacecraftID → SpacecraftName</li>
            <li>CommanderID → CommanderName</li>
            <li>ExperimentID → ExperimentName, ExperimentType</li>
            <li>GroundStationID → GroundStationName</li>
            <li>MissionID → SpacecraftID, MissionName, LaunchSite, LaunchDate, CommanderID</li>
          </ul>
          <p className="text-[11px] text-amber-300 italic pt-1 border-t border-indigo-500/20">
            ⚠️ <strong>CRITICAL RULE:</strong> Functional dependencies are based on <strong>real-world business rules & semantics</strong>, NOT simply on values currently visible in sample rows!
          </p>
        </div>

        {/* FD Rules Breakdown */}
        <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 text-xs">
          <h3 className="font-bold text-amber-400 text-sm">Important Functional Dependency Types:</h3>
          <div className="space-y-2">
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
              <strong className="text-indigo-300">Trivial FD:</strong> X → Y is trivial if Y ⊆ X (Y is a subset of X).
              <div className="font-mono text-[11px] text-slate-400 mt-0.5">Example: {"{MissionID, SpacecraftID} → MissionID"}</div>
            </div>
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
              <strong className="text-indigo-300">Non-Trivial FD:</strong> X → Y where Y is NOT a subset of X.
              <div className="font-mono text-[11px] text-slate-400 mt-0.5">Example: MissionID → MissionName</div>
            </div>
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
              <strong className="text-indigo-300">Full Functional Dependency:</strong> Y is dependent on the WHOLE of X and not on any proper subset of X.
              <div className="font-mono text-[11px] text-slate-400 mt-0.5">Example: {"{MissionID, ExperimentID} → Result"} (if Result requires both)</div>
            </div>
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
              <strong className="text-indigo-300">Partial Dependency:</strong> A non-prime attribute depends on only PART of a composite candidate key.
              <div className="font-mono text-[11px] text-slate-400 mt-0.5">Example: ExperimentID → ExperimentName when Key is {"{MissionID, ExperimentID}"}</div>
            </div>
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
              <strong className="text-indigo-300">Transitive Dependency:</strong> If X → Y and Y → Z, then X determines Z through Y.
              <div className="font-mono text-[11px] text-slate-400 mt-0.5">Example: MissionID → GroundStationID → GroundStationName</div>
            </div>
          </div>
        </div>

        {/* Activity 5 */}
        <ActivityFDSorter />
      </div>
    </motion.div>
  );
}

export function KeysTab() {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-indigo-500/20">
        <div>
          <h2 className="text-3xl font-bold text-indigo-300 flex items-center gap-2">
            <KeyRound /> Keys & Prime Attributes
          </h2>
          <p className="text-xs text-indigo-200 mt-1">Superkeys, Candidate Keys & Attribute Classification</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-300 text-xs">
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/80 space-y-2">
          <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
            <CheckCircle2 size={18} /> Prime Attribute
          </h3>
          <p className="leading-relaxed">
            An attribute that is part of <strong>AT LEAST ONE candidate key</strong> of the relation.
          </p>
          <div className="font-mono text-[11px] bg-slate-950 p-2.5 rounded-lg text-amber-300 border border-amber-500/20">
            Example: MissionID & ExperimentID in key {"{MissionID, ExperimentID}"}
          </div>
        </div>

        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/80 space-y-2">
          <h3 className="text-base font-bold text-indigo-400 flex items-center gap-2">
            <CheckCircle2 size={18} /> Non-Prime Attribute
          </h3>
          <p className="leading-relaxed">
            An attribute that is <strong>NOT part of any candidate key</strong>.
          </p>
          <div className="font-mono text-[11px] bg-slate-950 p-2.5 rounded-lg text-indigo-300 border border-indigo-500/20">
            Example: CommanderName, GroundStationName
          </div>
        </div>
      </div>

      <div className="p-6 bg-indigo-950/40 border border-indigo-500/30 rounded-2xl space-y-4 text-xs text-slate-300">
        <h3 className="text-lg font-bold text-white">Candidate Key Rules</h3>
        <p className="leading-relaxed">
          A candidate key is a <strong>minimal set of attributes</strong> that uniquely identifies each tuple in a relation.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-300">
          <li>It MUST uniquely identify all tuples in the relation (Superkey property).</li>
          <li>It MUST be minimal (no proper subset of it is a superkey).</li>
          <li>A relation may have MULTIPLE candidate keys.</li>
          <li>ONE candidate key is selected as the <strong>Primary Key (PK)</strong>.</li>
        </ul>
      </div>

      {/* Relation Example Table */}
      <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
        <div className="text-amber-400 font-bold text-sm">MISSION_EXPERIMENT Example:</div>
        <table className="w-full text-left">
          <thead className="bg-slate-900 text-slate-400 text-[10px]">
            <tr>
              <th className="p-2 text-amber-400">MissionID (Prime)</th>
              <th className="p-2 text-amber-400">ExperimentID (Prime)</th>
              <th className="p-2 text-indigo-300">ExperimentResult (Non-Prime)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300 text-[11px]">
            <tr><td className="p-2">M001</td><td className="p-2">E201</td><td className="p-2">Passed (99.4%)</td></tr>
            <tr><td className="p-2">M001</td><td className="p-2">E206</td><td className="p-2">Optimal</td></tr>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export function AxiomsTab() {
  const [activeTab, setActiveTab] = useState<'basic' | 'derived'>('basic');

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-indigo-500/20">
        <div>
          <h2 className="text-3xl font-bold text-indigo-300 flex items-center gap-2">
            <Lightbulb /> Armstrong's Axioms ("Three Laws of Dependency Gravity")
          </h2>
          <p className="text-xs text-indigo-200 mt-1">Fundamental inference rules for functional dependencies</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('basic')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
              activeTab === 'basic' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            3 Basic Axioms
          </button>
          <button
            onClick={() => setActiveTab('derived')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
              activeTab === 'derived' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            3 Derived Rules
          </button>
        </div>
      </div>

      {activeTab === 'basic' ? (
        <div className="space-y-4">
          <div className="p-5 bg-slate-900/80 border border-amber-500/40 rounded-2xl space-y-2">
            <h3 className="text-lg font-bold text-amber-400">1. Reflexivity Rule</h3>
            <p className="text-xs text-slate-300">If Y ⊆ X, then <strong>X → Y</strong> holds trivially.</p>
            <div className="font-mono text-xs text-amber-300 bg-slate-950 p-2.5 rounded-lg border border-amber-500/20">
              Example: {"{MissionID, SpacecraftID} → MissionID"}
            </div>
          </div>

          <div className="p-5 bg-slate-900/80 border border-emerald-500/40 rounded-2xl space-y-2">
            <h3 className="text-lg font-bold text-emerald-400">2. Augmentation Rule</h3>
            <p className="text-xs text-slate-300">If <strong>X → Y</strong> holds, then <strong>XZ → YZ</strong> holds for any attribute set Z.</p>
            <div className="font-mono text-xs text-emerald-300 bg-slate-950 p-2.5 rounded-lg border border-emerald-500/20">
              Example: If MissionID → SpacecraftID, then MissionID, ExperimentID → SpacecraftID, ExperimentID
            </div>
          </div>

          <div className="p-5 bg-slate-900/80 border border-purple-500/40 rounded-2xl space-y-2">
            <h3 className="text-lg font-bold text-purple-400">3. Transitivity Rule</h3>
            <p className="text-xs text-slate-300">If <strong>X → Y</strong> and <strong>Y → Z</strong> hold, then <strong>X → Z</strong> holds.</p>
            <div className="font-mono text-xs text-purple-300 bg-slate-950 p-2.5 rounded-lg border border-purple-500/20">
              Example: MissionID → GroundStationID & GroundStationID → GroundStationName ⇒ MissionID → GroundStationName
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-5 bg-slate-900/80 border border-indigo-500/40 rounded-2xl space-y-2">
            <h3 className="text-lg font-bold text-indigo-300">A. Union Rule (Derived)</h3>
            <p className="text-xs text-slate-300">If X → Y and X → Z, then <strong>X → YZ</strong>.</p>
            <div className="font-mono text-xs text-indigo-200 bg-slate-950 p-2.5 rounded-lg">
              Example: MissionID → SpacecraftID & MissionID → CommanderID ⇒ MissionID → SpacecraftID, CommanderID
            </div>
          </div>

          <div className="p-5 bg-slate-900/80 border border-indigo-500/40 rounded-2xl space-y-2">
            <h3 className="text-lg font-bold text-indigo-300">B. Decomposition Rule (Derived)</h3>
            <p className="text-xs text-slate-300">If X → YZ, then <strong>X → Y</strong> and <strong>X → Z</strong>.</p>
            <div className="font-mono text-xs text-indigo-200 bg-slate-950 p-2.5 rounded-lg">
              Example: MissionID → SpacecraftID, MissionName ⇒ MissionID → SpacecraftID and MissionID → MissionName
            </div>
          </div>

          <div className="p-5 bg-slate-900/80 border border-indigo-500/40 rounded-2xl space-y-2">
            <h3 className="text-lg font-bold text-indigo-300">C. Pseudotransitivity Rule (Derived)</h3>
            <p className="text-xs text-slate-300">If X → Y and WY → Z, then <strong>WX → Z</strong>.</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
