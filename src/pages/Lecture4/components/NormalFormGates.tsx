import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ShieldAlert, Zap, CheckCircle2, AlertTriangle, Table } from 'lucide-react';

// --- 2NF GATE & DECOMPOSITION ---
export const TwoNFGate: React.FC = () => {
  const [showDecomposition, setShowDecomposition] = useState(false);

  return (
    <div className="bg-slate-900/90 border border-indigo-500/30 rounded-3xl p-6 space-y-6 font-sans shadow-2xl">
      <div className="flex items-center justify-between pb-4 border-b border-indigo-500/20">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-600/20 rounded-2xl text-indigo-400 border border-indigo-500/30">
            <Layers size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Second Normal Form (2NF) Gate</h3>
            <p className="text-xs text-indigo-300">Eliminating Partial Dependencies on Composite Keys</p>
          </div>
        </div>
        <span className="text-xs font-bold bg-indigo-950 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/30">
          2NF Condition: 1NF + No Partial Dependency
        </span>
      </div>

      {/* Formal Schema Box */}
      <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 font-mono text-xs">
        <div className="flex items-center justify-between text-amber-400 font-bold">
          <span>SCHEMA: MISSION_EXPERIMENT</span>
          <span>Candidate Key: {"{MissionID, ExperimentID}"}</span>
        </div>
        <div className="text-slate-300">
          Attributes: MissionID (Prime), ExperimentID (Prime), MissionName (Non-Prime), ExperimentName (Non-Prime), Result (Non-Prime)
        </div>
        <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800 space-y-1">
          <div className="text-red-300 font-semibold">Functional Dependencies:</div>
          <div>1. MissionID → MissionName <span className="text-red-400 font-bold">(PARTIAL DEPENDENCY ❌)</span></div>
          <div>2. ExperimentID → ExperimentName <span className="text-red-400 font-bold">(PARTIAL DEPENDENCY ❌)</span></div>
          <div>3. {"{MissionID, ExperimentID}"} → Result <span className="text-emerald-400 font-bold">(FULL DEPENDENCY ✅)</span></div>
        </div>
      </div>

      {/* BEFORE Table */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-red-400 flex items-center gap-1.5">
          <AlertTriangle size={14} /> BEFORE 2NF DECOMPOSITION (Un-normalized Relation)
        </div>
        <div className="overflow-x-auto rounded-xl border border-red-500/30 bg-slate-950/80 font-mono text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-slate-300 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-2.5 border-b border-slate-800 text-amber-400">MissionID (Key)</th>
                <th className="p-2.5 border-b border-slate-800 text-amber-400">ExperimentID (Key)</th>
                <th className="p-2.5 border-b border-slate-800 text-red-300">MissionName</th>
                <th className="p-2.5 border-b border-slate-800 text-red-300">ExperimentName</th>
                <th className="p-2.5 border-b border-slate-800 text-emerald-300">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 text-[11px]">
              <tr>
                <td className="p-2.5">M001</td>
                <td className="p-2.5">E201</td>
                <td className="p-2.5 bg-red-950/30">Human Spaceflight Test</td>
                <td className="p-2.5 bg-red-950/30">Life Support Test</td>
                <td className="p-2.5">Nominal (99.4%)</td>
              </tr>
              <tr>
                <td className="p-2.5">M001</td>
                <td className="p-2.5">E206</td>
                <td className="p-2.5 bg-red-950/30">Human Spaceflight Test</td>
                <td className="p-2.5 bg-red-950/30">Crew Health Study</td>
                <td className="p-2.5">Optimal</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowDecomposition(!showDecomposition)}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-xs shadow-xl flex items-center gap-2 cursor-pointer transition-all"
        >
          <Table size={16} /> {showDecomposition ? 'Hide 2NF Decomposed Tables' : 'Execute 2NF Decomposition 🚀'}
        </button>
      </div>

      {/* AFTER Tables */}
      <AnimatePresence>
        {showDecomposition && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 pt-2 border-t border-indigo-500/20"
          >
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 size={16} /> AFTER 2NF DECOMPOSITION (3 Clean Normalized Relations)
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              {/* Table 1: MISSION */}
              <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/40 space-y-2">
                <div className="font-bold text-emerald-300 text-[11px] flex justify-between">
                  <span>1. MISSION</span>
                  <span className="text-[10px] bg-slate-900 px-1.5 py-0.5 rounded text-slate-400">PK: MissionID</span>
                </div>
                <table className="w-full text-left text-[10px]">
                  <thead className="bg-slate-900 text-slate-400">
                    <tr><th className="p-1.5">MissionID</th><th className="p-1.5">MissionName</th></tr>
                  </thead>
                  <tbody className="text-slate-300 divide-y divide-slate-800">
                    <tr><td className="p-1.5 text-amber-400 font-bold">M001</td><td className="p-1.5">Human Spaceflight Test</td></tr>
                  </tbody>
                </table>
              </div>

              {/* Table 2: EXPERIMENT */}
              <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/40 space-y-2">
                <div className="font-bold text-emerald-300 text-[11px] flex justify-between">
                  <span>2. EXPERIMENT</span>
                  <span className="text-[10px] bg-slate-900 px-1.5 py-0.5 rounded text-slate-400">PK: ExperimentID</span>
                </div>
                <table className="w-full text-left text-[10px]">
                  <thead className="bg-slate-900 text-slate-400">
                    <tr><th className="p-1.5">ExperimentID</th><th className="p-1.5">ExperimentName</th></tr>
                  </thead>
                  <tbody className="text-slate-300 divide-y divide-slate-800">
                    <tr><td className="p-1.5 text-amber-400 font-bold">E201</td><td className="p-1.5">Life Support Test</td></tr>
                    <tr><td className="p-1.5 text-amber-400 font-bold">E206</td><td className="p-1.5">Crew Health Study</td></tr>
                  </tbody>
                </table>
              </div>

              {/* Table 3: MISSION_EXPERIMENT */}
              <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/40 space-y-2">
                <div className="font-bold text-emerald-300 text-[11px] flex justify-between">
                  <span>3. MISSION_EXPERIMENT</span>
                  <span className="text-[10px] bg-slate-900 px-1.5 py-0.5 rounded text-slate-400">PK: {"{M_ID, E_ID}"}</span>
                </div>
                <table className="w-full text-left text-[10px]">
                  <thead className="bg-slate-900 text-slate-400">
                    <tr><th className="p-1.5">MissionID</th><th className="p-1.5">ExperimentID</th><th className="p-1.5">Result</th></tr>
                  </thead>
                  <tbody className="text-slate-300 divide-y divide-slate-800">
                    <tr><td className="p-1.5">M001</td><td className="p-1.5">E201</td><td className="p-1.5">Nominal (99.4%)</td></tr>
                    <tr><td className="p-1.5">M001</td><td className="p-1.5">E206</td><td className="p-1.5">Optimal</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- 3NF TRANSIT STATION & DECOMPOSITION ---
export const ThreeNFGate: React.FC = () => {
  const [showDecomposition, setShowDecomposition] = useState(false);

  return (
    <div className="bg-slate-900/90 border border-indigo-500/30 rounded-3xl p-6 space-y-6 font-sans shadow-2xl">
      <div className="flex items-center justify-between pb-4 border-b border-indigo-500/20">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-600/20 rounded-2xl text-purple-400 border border-purple-500/30">
            <ShieldAlert size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Third Normal Form (3NF) Transit Station</h3>
            <p className="text-xs text-purple-300">Eliminating Transitive Dependencies (X → Y → Z)</p>
          </div>
        </div>
        <span className="text-xs font-bold bg-purple-950 text-purple-300 px-3 py-1 rounded-full border border-purple-500/30">
          3NF Rule: X is Superkey OR A is Prime
        </span>
      </div>

      {/* Schema Box */}
      <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 font-mono text-xs">
        <div className="flex items-center justify-between text-amber-400 font-bold">
          <span>SCHEMA: MISSION</span>
          <span>Candidate Key: MissionID</span>
        </div>
        <div className="text-slate-300">
          Attributes: MissionID (Prime Key), MissionName (Non-Prime), GroundStationID (Non-Prime), GroundStationName (Non-Prime)
        </div>
        <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800 space-y-1">
          <div className="text-purple-300 font-semibold">Functional Dependencies:</div>
          <div>1. MissionID → MissionName, GroundStationID <span className="text-emerald-400 font-bold">(X is Superkey ✅)</span></div>
          <div>2. GroundStationID → GroundStationName <span className="text-red-400 font-bold">(VIOLATES 3NF! GroundStationID is NOT superkey & GroundStationName is NOT prime ❌)</span></div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowDecomposition(!showDecomposition)}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs shadow-xl flex items-center gap-2 cursor-pointer transition-all"
        >
          <Table size={16} /> {showDecomposition ? 'Hide 3NF Decomposed Tables' : 'Execute 3NF Decomposition 🚀'}
        </button>
      </div>

      {/* AFTER Tables */}
      <AnimatePresence>
        {showDecomposition && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 pt-2 border-t border-purple-500/20"
          >
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 size={16} /> AFTER 3NF DECOMPOSITION (2 Clean Normalized Relations)
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {/* Table 1: MISSION */}
              <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/40 space-y-2">
                <div className="font-bold text-emerald-300 text-xs flex justify-between">
                  <span>1. MISSION</span>
                  <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-slate-400">PK: MissionID | FK: GroundStationID</span>
                </div>
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-slate-900 text-slate-400">
                    <tr><th className="p-2">MissionID</th><th className="p-2">MissionName</th><th className="p-2 text-cyan-400">GroundStationID (FK)</th></tr>
                  </thead>
                  <tbody className="text-slate-300 divide-y divide-slate-800">
                    <tr><td className="p-2 text-amber-400 font-bold">M001</td><td className="p-2">Human Spaceflight Test</td><td className="p-2 text-cyan-300">GS01</td></tr>
                    <tr><td className="p-2 text-amber-400 font-bold">M006</td><td className="p-2">Human Spaceflight Test</td><td className="p-2 text-cyan-300">GS01</td></tr>
                  </tbody>
                </table>
              </div>

              {/* Table 2: GROUND_STATION */}
              <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/40 space-y-2">
                <div className="font-bold text-emerald-300 text-xs flex justify-between">
                  <span>2. GROUND_STATION</span>
                  <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-slate-400">PK: GroundStationID</span>
                </div>
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-slate-900 text-slate-400">
                    <tr><th className="p-2">GroundStationID</th><th className="p-2">GroundStationName</th></tr>
                  </thead>
                  <tbody className="text-slate-300 divide-y divide-slate-800">
                    <tr><td className="p-2 text-amber-400 font-bold">GS01</td><td className="p-2">Bengaluru</td></tr>
                    <tr><td className="p-2 text-amber-400 font-bold">GS02</td><td className="p-2">Hyderabad</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- BCNF GATE ---
export const BCNFGate: React.FC = () => {
  const [showDecomposition, setShowDecomposition] = useState(false);

  return (
    <div className="bg-slate-900/90 border border-indigo-500/30 rounded-3xl p-6 space-y-6 font-sans shadow-2xl">
      <div className="flex items-center justify-between pb-4 border-b border-indigo-500/20">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-600/20 rounded-2xl text-amber-400 border border-amber-500/30">
            <Zap size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">BCNF — Stronger Dependency Rule</h3>
            <p className="text-xs text-amber-300">Every Determinant MUST Be a Superkey</p>
          </div>
        </div>
        <span className="text-xs font-bold bg-amber-950 text-amber-300 px-3 py-1 rounded-full border border-amber-500/30">
          BCNF Condition: For EVERY X → Y, X is Superkey
        </span>
      </div>

      {/* Schema Box */}
      <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between text-amber-400 font-bold">
          <span>SCHEMA: MISSION_CREW</span>
          <span>Candidate Keys: {"{MissionID, AstronautID}"} & {"{MissionID, Role}"}</span>
        </div>
        <div className="text-slate-300 leading-relaxed text-[11px]">
          <strong>Stated Business Rules:</strong>
          <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-400">
            <li>A mission can have multiple astronauts.</li>
            <li>For a particular mission, each astronaut has exactly one role.</li>
            <li>Each astronaut has one specialized standard role across the agency (AstronautID → Role).</li>
          </ul>
        </div>
        <div className="text-slate-400 text-[11px] pt-2 border-t border-slate-800 space-y-1">
          <div className="text-amber-300 font-semibold">Functional Dependencies:</div>
          <div>1. {"{MissionID, AstronautID}"} → Role <span className="text-emerald-400 font-bold">(Determined by Superkey ✅)</span></div>
          <div>2. AstronautID → Role <span className="text-red-400 font-bold">(VIOLATES BCNF! AstronautID is NOT a superkey of MISSION_CREW ❌)</span></div>
        </div>
      </div>

      {/* 3NF vs BCNF Comparison Callout */}
      <div className="p-4 bg-amber-950/30 border border-amber-500/30 rounded-2xl text-xs text-amber-200 leading-relaxed">
        <strong>💡 Note on 3NF vs BCNF:</strong> In <code>AstronautID → Role</code>, <code>Role</code> is part of candidate key <code>{"{MissionID, Role}"}</code> (Role is prime). Therefore, this relation SATISFIES 3NF! However, because <code>AstronautID</code> is not a superkey, it VIOLATES BCNF! BCNF removes this remaining dependency redundancy.
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowDecomposition(!showDecomposition)}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-slate-950 font-black text-xs shadow-xl flex items-center gap-2 cursor-pointer transition-all"
        >
          <Table size={16} /> {showDecomposition ? 'Hide BCNF Decomposed Tables' : 'Execute BCNF Decomposition 🚀'}
        </button>
      </div>

      {/* AFTER Tables */}
      <AnimatePresence>
        {showDecomposition && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 pt-2 border-t border-amber-500/20"
          >
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 size={16} /> AFTER BCNF DECOMPOSITION (2 Fully Normalized Relations)
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {/* Table 1: ASTRONAUT_ROLE */}
              <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/40 space-y-2">
                <div className="font-bold text-emerald-300 text-xs flex justify-between">
                  <span>1. ASTRONAUT_ROLE</span>
                  <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-slate-400">PK: AstronautID</span>
                </div>
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-slate-900 text-slate-400">
                    <tr><th className="p-2">AstronautID</th><th className="p-2">Role</th></tr>
                  </thead>
                  <tbody className="text-slate-300 divide-y divide-slate-800">
                    <tr><td className="p-2 text-amber-400 font-bold">A101</td><td className="p-2">Commander</td></tr>
                    <tr><td className="p-2 text-amber-400 font-bold">A102</td><td className="p-2">Pilot</td></tr>
                  </tbody>
                </table>
              </div>

              {/* Table 2: MISSION_ASSIGNMENT */}
              <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/40 space-y-2">
                <div className="font-bold text-emerald-300 text-xs flex justify-between">
                  <span>2. MISSION_ASSIGNMENT</span>
                  <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-slate-400">PK: {"{MissionID, AstronautID}"}</span>
                </div>
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-slate-900 text-slate-400">
                    <tr><th className="p-2">MissionID</th><th className="p-2">AstronautID</th></tr>
                  </thead>
                  <tbody className="text-slate-300 divide-y divide-slate-800">
                    <tr><td className="p-2 text-amber-400 font-bold">M001</td><td className="p-2">A101</td></tr>
                    <tr><td className="p-2 text-amber-400 font-bold">M006</td><td className="p-2">A101</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
