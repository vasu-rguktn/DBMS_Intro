import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, CheckCircle2 } from 'lucide-react';
import Confetti from 'react-confetti';

export const Activity12StageJourney: React.FC = () => {
  const [stage, setStage] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);

  const stages = [
    {
      num: 1,
      title: 'Stage 1 — Inspect Non-Atomic Values',
      desc: 'Identify multi-valued cells like "Life Support Test, Crew Health Study" inside single cells in raw data.',
      action: 'Separate Multi-Valued Attributes into Atomic Cells'
    },
    {
      num: 2,
      title: 'Stage 2 — Convert to 1NF',
      desc: 'Ensure all attribute cells hold atomic values and eliminate repeating groups.',
      action: '1NF Achieved ✓'
    },
    {
      num: 3,
      title: 'Stage 3 — Identify Candidate Keys',
      desc: 'Determine minimal superkeys for SPACE_MISSION_MASTER. Candidate key is {MissionID, ExperimentID}.',
      action: 'Keys Identified ✓'
    },
    {
      num: 4,
      title: 'Stage 4 — Identify Functional Dependencies',
      desc: 'Derive FDs based on business semantics: MissionID → SpacecraftID, CommanderID, GroundStationID; SpacecraftID → SpacecraftName; CommanderID → CommanderName; GroundStationID → GroundStationName; ExperimentID → ExperimentName.',
      action: 'FD Set F Formalized ✓'
    },
    {
      num: 5,
      title: 'Stage 5 — Calculate Attribute Closure',
      desc: 'Compute MissionID⁺ = {MissionID, SpacecraftID, SpacecraftName, CommanderID, CommanderName, GroundStationID, GroundStationName}.',
      action: 'Closure Computed ✓'
    },
    {
      num: 6,
      title: 'Stage 6 — Find Partial Dependencies',
      desc: 'Identify non-prime attributes depending on partial keys (e.g., ExperimentID → ExperimentName).',
      action: 'Partial Dependencies Flagged ⚠️'
    },
    {
      num: 7,
      title: 'Stage 7 — Convert to 2NF',
      desc: 'Decompose relation to remove partial dependencies into EXPERIMENT, MISSION, and MISSION_EXPERIMENT.',
      action: '2NF Achieved ✓'
    },
    {
      num: 8,
      title: 'Stage 8 — Find Transitive Dependencies',
      desc: 'Identify transitive dependencies: MissionID → GroundStationID → GroundStationName.',
      action: 'Transitive Dependencies Flagged ⚠️'
    },
    {
      num: 9,
      title: 'Stage 9 — Convert to 3NF',
      desc: 'Decompose to separate GROUND_STATION(GroundStationID, GroundStationName) from MISSION.',
      action: '3NF Achieved ✓'
    },
    {
      num: 10,
      title: 'Stage 10 — Check BCNF Condition',
      desc: 'Verify that every determinant in all decomposed relations is a superkey.',
      action: 'BCNF Verified ✓'
    },
    {
      num: 11,
      title: 'Stage 11 — Final Relation Decomposition',
      desc: 'Final schema: MISSION, SPACECRAFT, COMMANDER, EXPERIMENT, GROUND_STATION, and MISSION_EXPERIMENT.',
      action: '5 Normalized Schemas Formed ✓'
    },
    {
      num: 12,
      title: 'Stage 12 — Verify Lossless Join & Dependency Preservation',
      desc: 'Verify that natural joins yield exact original records and all original FDs remain preserved across tables.',
      action: 'Lossless Join & Preservation Verified ✓'
    }
  ];

  const current = stages[stage - 1];

  const handleNext = () => {
    if (stage < 12) {
      setStage(stage + 1);
    } else {
      setShowConfetti(true);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-indigo-500/30 rounded-3xl p-6 space-y-6 font-sans shadow-2xl relative overflow-hidden">
      {showConfetti && <Confetti numberOfPieces={200} recycle={false} />}

      <div className="flex items-center justify-between pb-4 border-b border-indigo-500/20">
        <div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <Rocket className="text-indigo-400" /> Complete 12-Stage Normalization Journey
          </h3>
          <p className="text-xs text-indigo-300">Step-by-step transformation from Raw Un-normalized Data to BCNF</p>
        </div>
        <span className="text-xs font-mono font-bold bg-indigo-950 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/30">
          Stage {stage} / 12
        </span>
      </div>

      {/* Visual Roadmap Trail */}
      <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none border-b border-slate-800">
        {stages.map((st) => {
          const isActive = st.num === stage;
          const isDone = st.num < stage;
          return (
            <button
              key={st.num}
              onClick={() => setStage(st.num)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg scale-105'
                  : isDone
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                  : 'bg-slate-800 text-slate-500 hover:text-slate-300'
              }`}
            >
              <span>{st.num}</span>
              {isDone && <CheckCircle2 size={12} />}
            </button>
          );
        })}
      </div>

      {/* Active Stage Card */}
      <motion.div
        key={stage}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-6 bg-slate-950 rounded-2xl border border-indigo-500/30 space-y-4 font-mono text-xs"
      >
        <div className="flex items-center justify-between">
          <span className="text-amber-400 font-bold text-base">{current.title}</span>
          <span className="text-[10px] bg-slate-900 text-indigo-300 px-2.5 py-1 rounded border border-indigo-500/30">
            {current.action}
          </span>
        </div>

        <p className="text-slate-300 font-sans leading-relaxed text-sm">{current.desc}</p>
      </motion.div>

      {stage === 12 && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-6 bg-gradient-to-r from-emerald-950 via-teal-950 to-indigo-950 border border-emerald-500/50 rounded-2xl text-center space-y-2"
        >
          <div className="text-3xl font-black text-emerald-400 tracking-wider">
            MISSION DATABASE NORMALIZED 🚀
          </div>
          <p className="text-xs text-emerald-200 font-sans">
            All tables are now in Boyce-Codd Normal Form with Lossless Join and Dependency Preservation!
          </p>
        </motion.div>
      )}

      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            setStage(1);
            setShowConfetti(false);
          }}
          className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-bold"
        >
          Restart Journey
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs cursor-pointer shadow-lg flex items-center gap-2"
        >
          {stage === 12 ? 'Complete Journey ✓' : 'Proceed to Next Stage →'}
        </button>
      </div>
    </div>
  );
};
