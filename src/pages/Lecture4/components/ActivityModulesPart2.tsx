import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  Layers,
  Network,
  RefreshCw
} from 'lucide-react';

// --- ACTIVITY 5: DEPENDENCY DETECTIVE ---
export const ActivityFDSorter: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const items = [
    {
      id: 'fd1',
      expression: '{MissionID, SpacecraftID} → MissionID',
      correctType: 'Trivial',
      explanation: 'Dependent MissionID is a subset of determinant {MissionID, SpacecraftID}.'
    },
    {
      id: 'fd2',
      expression: 'MissionID → MissionName',
      correctType: 'Non-Trivial',
      explanation: 'MissionName is not contained in determinant MissionID.'
    },
    {
      id: 'fd3',
      expression: 'ExperimentID → ExperimentName (when Key = {MissionID, ExperimentID})',
      correctType: 'Partial',
      explanation: 'ExperimentName depends on ExperimentID, which is only part of candidate key {MissionID, ExperimentID}.'
    },
    {
      id: 'fd4',
      expression: 'MissionID → GroundStationID and GroundStationID → GroundStationName',
      correctType: 'Transitive',
      explanation: 'MissionID determines GroundStationName indirectly through GroundStationID.'
    }
  ];

  const types = ['Trivial', 'Non-Trivial', 'Full', 'Partial', 'Transitive'];

  const score = items.filter((item) => answers[item.id] === item.correctType).length;

  return (
    <div className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-5 space-y-4 text-xs font-sans">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-sm text-indigo-300 flex items-center gap-2">
          <Network size={16} className="text-purple-400" /> Activity 5 — Dependency Detective
        </h4>
        <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-500/30">
          FD Classification
        </span>
      </div>

      <p className="text-slate-300">
        Classify each functional dependency expression into its correct functional dependency type.
      </p>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="font-mono font-bold text-amber-400 text-xs">{item.expression}</div>
            <div className="flex flex-wrap gap-2 pt-1">
              {types.map((type) => {
                const selected = answers[item.id] === type;
                return (
                  <button
                    key={type}
                    onClick={() => {
                      if (!submitted) setAnswers({ ...answers, [item.id]: type });
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selected
                        ? 'bg-indigo-600 text-white border border-indigo-400'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
            {submitted && (
              <div className="text-[11px] pt-1 font-sans">
                {answers[item.id] === item.correctType ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 size={13} /> Correct! {item.explanation}
                  </span>
                ) : (
                  <span className="text-red-400 font-bold flex items-center gap-1">
                    <XCircle size={13} /> Correct type is {item.correctType}. {item.explanation}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            disabled={Object.keys(answers).length < items.length}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold disabled:opacity-50 cursor-pointer"
          >
            Check Classifications
          </button>
        ) : (
          <div className="flex items-center justify-between w-full">
            <span className="font-bold text-amber-400 text-xs">Score: {score} / {items.length}</span>
            <button
              onClick={() => {
                setSubmitted(false);
                setAnswers({});
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- ACTIVITY 7: MINIMAL COVER CLEANUP LAB ---
export const ActivityMinimalCover: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-5 space-y-4 text-xs font-sans">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-sm text-indigo-300 flex items-center gap-2">
          <RefreshCw size={16} className="text-emerald-400" /> Activity 7 — Dependency Cleanup Lab (Minimal Cover)
        </h4>
        <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-500/30">
          Step-by-step Reduction
        </span>
      </div>

      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 font-mono">
        <div className="text-amber-400 font-bold">Original Dependency Set F:</div>
        <div className="text-xs text-slate-300 pl-4 space-y-1">
          <div>1. MissionID → SpacecraftID, MissionName</div>
          <div>2. MissionID → SpacecraftID</div>
          <div>3. SpacecraftID → SpacecraftName</div>
        </div>
      </div>

      {/* Step Breakdown */}
      <div className="space-y-3">
        <div className={`p-3 rounded-xl border transition-all ${currentStep >= 1 ? 'bg-slate-950 border-indigo-500/50' : 'opacity-40 bg-slate-950'}`}>
          <div className="font-bold text-indigo-300 mb-1">Step 1 — Ensure Single Attribute on Right Hand Side (RHS)</div>
          <p className="text-slate-400 text-[11px] mb-2">Split <code>MissionID → SpacecraftID, MissionName</code> using Decomposition Rule.</p>
          {currentStep >= 1 && (
            <div className="font-mono text-emerald-400 text-xs bg-indigo-950/40 p-2 rounded border border-indigo-500/30">
              Result: MissionID → SpacecraftID and MissionID → MissionName
            </div>
          )}
        </div>

        <div className={`p-3 rounded-xl border transition-all ${currentStep >= 2 ? 'bg-slate-950 border-indigo-500/50' : 'opacity-40 bg-slate-950'}`}>
          <div className="font-bold text-indigo-300 mb-1">Step 2 — Remove Extraneous Attributes from Left Hand Side (LHS)</div>
          <p className="text-slate-400 text-[11px] mb-2">Check if any LHS attribute can be dropped without losing implied closures.</p>
          {currentStep >= 2 && (
            <div className="font-mono text-emerald-400 text-xs bg-indigo-950/40 p-2 rounded border border-indigo-500/30">
              Result: All LHS determinants (MissionID, SpacecraftID) are already minimal single attributes.
            </div>
          )}
        </div>

        <div className={`p-3 rounded-xl border transition-all ${currentStep >= 3 ? 'bg-slate-950 border-indigo-500/50' : 'opacity-40 bg-slate-950'}`}>
          <div className="font-bold text-indigo-300 mb-1">Step 3 — Remove Redundant Functional Dependencies</div>
          <p className="text-slate-400 text-[11px] mb-2">Check if duplicate dependency <code>MissionID → SpacecraftID</code> is redundant.</p>
          {currentStep >= 3 && (
            <div className="font-mono text-emerald-400 text-xs bg-emerald-950/60 p-2 rounded border border-emerald-500/40 font-bold">
              FINAL MINIMAL COVER F_min = {'{\n  MissionID → MissionName,\n  MissionID → SpacecraftID,\n  SpacecraftID → SpacecraftName\n}'}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentStep(1)}
          className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
        >
          Reset Lab
        </button>
        <button
          onClick={() => setCurrentStep(Math.min(currentStep + 1, 3))}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer flex items-center gap-1.5"
        >
          {currentStep === 3 ? 'Minimal Cover Complete ✓' : 'Execute Step ' + (currentStep + 1) + ' →'}
        </button>
      </div>
    </div>
  );
};

// --- ACTIVITY 11: DECOMPOSITION CHALLENGE (LOSSLESS JOIN & DEPENDENCY PRESERVATION) ---
export const ActivityDecomposition: React.FC = () => {
  const [showSpurious, setShowSpurious] = useState(false);

  return (
    <div className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-5 space-y-4 text-xs font-sans">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-sm text-indigo-300 flex items-center gap-2">
          <Layers size={16} className="text-amber-400" /> Activity 11 — Lossless Join & Spurious Tuples Visualizer
        </h4>
        <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-500/30">
          Decomposition Test
        </span>
      </div>

      <p className="text-slate-300">
        A decomposition is <strong>Lossless-Join</strong> if joining the decomposed tables produces exactly the original relation without generating fake <em>spurious tuples</em>.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* GOOD LOSSLESS JOIN */}
        <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/40 space-y-2">
          <div className="font-bold text-emerald-400 flex items-center justify-between">
            <span>GOOD Lossless Join (Join on Candidate Key)</span>
            <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded">Key Join</span>
          </div>
          <p className="text-slate-400 text-[11px]">
            Decompose on GroundStationID (Key for GROUND_STATION). Joining back recreates exact 6 mission records.
          </p>
          <div className="font-mono text-emerald-300 text-[11px] bg-emerald-950/40 p-2.5 rounded border border-emerald-500/20">
            R1 ⋈ R2 = Exactly 6 original records ✅
          </div>
        </div>

        {/* BAD LOSSY JOIN */}
        <div className="p-4 bg-slate-950 rounded-xl border border-red-500/40 space-y-2">
          <div className="font-bold text-red-400 flex items-center justify-between">
            <span>BAD Lossy Join (Join on Non-Key Attribute)</span>
            <span className="text-[10px] bg-red-950 text-red-300 px-2 py-0.5 rounded">Spurious Rows</span>
          </div>
          <p className="text-slate-400 text-[11px]">
            Decompose on LaunchSite ("Sriharikota"). Joining back matches every mission with every other mission!
          </p>
          <button
            onClick={() => setShowSpurious(!showSpurious)}
            className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold cursor-pointer text-xs"
          >
            {showSpurious ? 'Hide Spurious Tuples' : 'Simulate Bad Join (Generate Spurious Tuples ❌)'}
          </button>
        </div>
      </div>

      {showSpurious && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-950/50 border border-red-500/40 rounded-xl space-y-2 font-mono"
        >
          <div className="text-red-300 font-bold text-xs">
            ❌ SPURIOUS TUPLES GENERATED! (36 Joined Rows from 6 Original Rows):
          </div>
          <div className="text-[11px] text-slate-300 space-y-1 max-h-36 overflow-y-auto">
            <div>M001 Gaganyaan-1 (Sriharikota) ⋈ M002 EOS-01 (Sriharikota) 👉 FAKE COMBINATION!</div>
            <div>M001 Gaganyaan-1 (Sriharikota) ⋈ M003 NavIC-01 (Sriharikota) 👉 FAKE COMBINATION!</div>
            <div>M001 Gaganyaan-1 (Sriharikota) ⋈ M004 Chandrayaan-Test (Sriharikota) 👉 FAKE COMBINATION!</div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
