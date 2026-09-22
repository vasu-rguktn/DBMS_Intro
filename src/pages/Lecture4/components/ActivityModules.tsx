import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  Split,
  Search,
  Award
} from 'lucide-react';
import Confetti from 'react-confetti';

// --- ACTIVITY 1: SPOT THE ATOMICITY PROBLEM ---
export const ActivityAtomicity: React.FC = () => {
  const [selectedCells, setSelectedCells] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const rows = [
    { id: 1, mission: 'M001', commander: 'Arjun Rao', exp: 'Life Support Test, Crew Health Study', nonAtomic: true },
    { id: 2, mission: 'M002', commander: 'Meera Nair', exp: 'Ocean Imaging', nonAtomic: false },
    { id: 3, mission: 'M003', commander: 'Ravi Kumar', exp: 'Navigation Accuracy, Clock Sync', nonAtomic: true },
    { id: 4, mission: 'M004', commander: 'Ananya Das', exp: 'Lunar Imaging', nonAtomic: false },
    { id: 5, mission: 'M005', commander: 'Vikram Singh', exp: 'Solar Wind Study, Flare Analysis', nonAtomic: true }
  ];

  const handleCellClick = (id: number) => {
    if (submitted) return;
    if (selectedCells.includes(id)) {
      setSelectedCells(selectedCells.filter((c) => c !== id));
    } else {
      setSelectedCells([...selectedCells, id]);
    }
  };

  const correctIds = [1, 3, 5];
  const isAllCorrect =
    submitted &&
    correctIds.every((id) => selectedCells.includes(id)) &&
    selectedCells.length === correctIds.length;

  return (
    <div className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-5 space-y-4 text-xs font-sans">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-sm text-indigo-300 flex items-center gap-2">
          <Sparkles size={16} className="text-amber-400" /> Activity 1 — Spot the Atomicity Problem
        </h4>
        <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-500/30">
          Level 1: Explorer
        </span>
      </div>

      <p className="text-slate-300">
        Click on the cell(s) in the table below that violate atomicity (contain multiple values in a single cell).
      </p>

      <div className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-950">
        <table className="w-full text-left">
          <thead className="bg-slate-800 text-slate-300 uppercase text-[10px] font-bold">
            <tr>
              <th className="p-3">MissionID</th>
              <th className="p-3">CommanderName</th>
              <th className="p-3">ExperimentNames</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 font-mono">
            {rows.map((r) => {
              const isSelected = selectedCells.includes(r.id);
              const isCorrect = r.nonAtomic;
              return (
                <tr key={r.id}>
                  <td className="p-3 text-slate-400">{r.mission}</td>
                  <td className="p-3 text-slate-300">{r.commander}</td>
                  <td
                    onClick={() => handleCellClick(r.id)}
                    className={`p-3 cursor-pointer transition-colors rounded-lg ${
                      isSelected
                        ? submitted
                          ? isCorrect
                            ? 'bg-emerald-950/80 text-emerald-300 font-bold border border-emerald-500/50'
                            : 'bg-red-950/80 text-red-300 border border-red-500/50'
                          : 'bg-indigo-900/80 text-white font-bold border border-indigo-500'
                        : 'hover:bg-slate-800/60 text-slate-300'
                    }`}
                  >
                    {r.exp}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            disabled={selectedCells.length === 0}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold cursor-pointer"
          >
            Check Answer
          </button>
        ) : (
          <div className="flex items-center gap-3">
            {isAllCorrect ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 size={16} /> Perfect! Rows 1, 3, and 5 contained multi-valued experiment cells!
              </span>
            ) : (
              <span className="text-red-400 font-bold flex items-center gap-1.5">
                <XCircle size={16} /> Look closely at cells containing commas or lists of multiple experiments!
              </span>
            )}
            <button
              onClick={() => {
                setSubmitted(false);
                setSelectedCells([]);
              }}
              className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- ACTIVITY 2: 1NF CONVERTER ---
export const Activity1NF: React.FC = () => {
  const [converted, setConverted] = useState(false);

  return (
    <div className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-5 space-y-4 text-xs font-sans">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-sm text-indigo-300 flex items-center gap-2">
          <Split size={16} className="text-indigo-400" /> Activity 2 — 1NF Scanner & Row Splitter
        </h4>
        <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-500/30">
          Interactive Converter
        </span>
      </div>

      <p className="text-slate-300">
        Transform non-atomic multi-valued cells into 1NF by creating separate rows for each atomic value.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* BEFORE */}
        <div className="bg-slate-950 p-3 rounded-xl border border-red-500/30">
          <div className="text-red-400 font-bold text-[11px] mb-2 flex items-center justify-between">
            <span>BEFORE (Non-1NF Multi-valued Cell)</span>
            <span className="text-[10px] text-red-300 bg-red-950 px-2 py-0.5 rounded">1 Row</span>
          </div>
          <table className="w-full text-left font-mono">
            <thead className="bg-slate-900 text-slate-400 text-[10px]">
              <tr>
                <th className="p-2">MissionID</th>
                <th className="p-2">Spacecraft</th>
                <th className="p-2">Experiments</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr>
                <td className="p-2">M001</td>
                <td className="p-2">Gaganyaan-1</td>
                <td className="p-2 bg-red-950/60 text-red-200 font-bold border border-red-500/40 rounded">
                  Life Support Test, Crew Health Study
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* AFTER */}
        <div className="bg-slate-950 p-3 rounded-xl border border-emerald-500/30">
          <div className="text-emerald-400 font-bold text-[11px] mb-2 flex items-center justify-between">
            <span>AFTER (1NF Atomic Rows)</span>
            <span className="text-[10px] text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded">
              {converted ? '2 Atomic Rows' : 'Click Convert Below'}
            </span>
          </div>
          <table className="w-full text-left font-mono">
            <thead className="bg-slate-900 text-slate-400 text-[10px]">
              <tr>
                <th className="p-2">MissionID</th>
                <th className="p-2">Spacecraft</th>
                <th className="p-2">ExperimentID</th>
                <th className="p-2">ExperimentName</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {converted ? (
                <>
                  <motion.tr initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                    <td className="p-2">M001</td>
                    <td className="p-2">Gaganyaan-1</td>
                    <td className="p-2 text-amber-400">E201</td>
                    <td className="p-2 text-emerald-300">Life Support Test</td>
                  </motion.tr>
                  <motion.tr initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <td className="p-2">M001</td>
                    <td className="p-2">Gaganyaan-1</td>
                    <td className="p-2 text-amber-400">E206</td>
                    <td className="p-2 text-emerald-300">Crew Health Study</td>
                  </motion.tr>
                </>
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-slate-500 italic">
                    Click "Convert to 1NF" to split multi-valued cell
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setConverted(!converted)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold cursor-pointer shadow-lg shadow-emerald-900/40"
        >
          {converted ? 'Reset Converter' : 'Convert to 1NF 🚀'}
        </button>
      </div>
    </div>
  );
};

// --- ACTIVITY 6: CLOSURE CALCULATOR ---
export const ActivityClosure: React.FC = () => {
  const [selectedAttrs, setSelectedAttrs] = useState<string[]>(['MissionID']);
  const [step, setStep] = useState(0);

  const availableAttrs = [
    'MissionID',
    'SpacecraftID',
    'SpacecraftName',
    'CommanderID',
    'CommanderName',
    'GroundStationID',
    'GroundStationName'
  ];

  const toggleAttr = (attr: string) => {
    setStep(0);
    if (selectedAttrs.includes(attr)) {
      setSelectedAttrs(selectedAttrs.filter((a) => a !== attr));
    } else {
      setSelectedAttrs([...selectedAttrs, attr]);
    }
  };

  const computeClosureForStep = (currentAttrs: string[], targetStep: number) => {
    let closure = new Set<string>(currentAttrs);
    for (let s = 0; s < targetStep; s++) {
      let added = false;
      if (closure.has('MissionID')) {
        ['SpacecraftID', 'CommanderID', 'GroundStationID'].forEach((a) => closure.add(a));
        added = true;
      }
      if (closure.has('SpacecraftID')) {
        closure.add('SpacecraftName');
        added = true;
      }
      if (closure.has('CommanderID')) {
        closure.add('CommanderName');
        added = true;
      }
      if (closure.has('GroundStationID')) {
        closure.add('GroundStationName');
        added = true;
      }
      if (!added) break;
    }
    return Array.from(closure);
  };

  const currentClosure = computeClosureForStep(selectedAttrs, step);
  const maxClosure = computeClosureForStep(selectedAttrs, 5);
  const isFullSuperkey = maxClosure.length === availableAttrs.length;

  return (
    <div className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-5 space-y-4 text-xs font-sans">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-sm text-indigo-300 flex items-center gap-2">
          <Search size={16} className="text-amber-400" /> Activity 6 — Dependency Closure Engine (X⁺)
        </h4>
        <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-500/30">
          Interactive Calculator
        </span>
      </div>

      <p className="text-slate-300">
        Select determinant attribute(s) X and step forward to see attribute closure <strong>X⁺</strong> expand mathematically!
      </p>

      <div className="space-y-2">
        <label className="text-[11px] font-bold text-slate-400 block">Select Attribute Set X:</label>
        <div className="flex flex-wrap gap-2">
          {availableAttrs.map((attr) => {
            const active = selectedAttrs.includes(attr);
            return (
              <button
                key={attr}
                onClick={() => toggleAttr(attr)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  active
                    ? 'bg-amber-500 text-slate-950 border border-amber-400 shadow-md shadow-amber-500/20'
                    : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
                }`}
              >
                {attr}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 font-mono">
        <div className="flex items-center justify-between">
          <span className="text-amber-400 font-bold text-sm">
            {`{${selectedAttrs.join(', ')}}⁺`} = {`{${currentClosure.join(', ')}}`}
          </span>
          <span className="text-[11px] text-slate-400">Step {step} of 4</span>
        </div>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
          {currentClosure.map((attr) => (
            <span
              key={attr}
              className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold border border-indigo-500/40 animate-pulse"
            >
              {attr}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs">
          {isFullSuperkey ? (
            <span className="text-emerald-400 font-bold">
              ✅ {`{${selectedAttrs.join(', ')}}`} determines ALL attributes — it is a SUPERKEY!
            </span>
          ) : (
            <span className="text-slate-400">
              Determines {currentClosure.length} / {availableAttrs.length} attributes.
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setStep(0)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
          >
            Reset
          </button>
          <button
            onClick={() => setStep(Math.min(step + 1, 4))}
            className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer flex items-center gap-1"
          >
            Step Forward <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- ACTIVITY 12: FINAL MISSION ASSESSMENT & CERTIFICATE ---
export const ActivityFinalMission: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [completed, setCompleted] = useState(false);

  const questions = [
    {
      step: 1,
      title: 'Step 1 — Atomicity Inspection',
      question: 'In SPACE_TELESCOPE_OBSERVATIONS, does any cell contain non-atomic multi-valued data?',
      options: [
        'Yes, AstronomerName contains multiple values',
        'No, every cell contains a single atomic value from its domain',
        'Yes, ObservationDate contains multiple dates'
      ],
      correct: 'No, every cell contains a single atomic value from its domain',
      explanation: 'All cells in the dataset contain atomic single values (e.g. AstroSat-1, Crab Nebula).'
    },
    {
      step: 2,
      title: 'Step 2 — 1NF Verification',
      question: 'Does SPACE_TELESCOPE_OBSERVATIONS satisfy First Normal Form (1NF)?',
      options: [
        'No, because duplicate telescope names exist',
        'Yes, all attributes contain atomic values and there are no repeating groups',
        'No, because candidate key is missing'
      ],
      correct: 'Yes, all attributes contain atomic values and there are no repeating groups',
      explanation: '1NF is satisfied when all cell values are atomic without multivalued lists.'
    },
    {
      step: 3,
      title: 'Step 3 — Candidate Key Identification',
      question: 'Which set of attributes forms the candidate key for this observation relation?',
      options: [
        '{TelescopeID, AstronomerID}',
        '{ObsID}',
        '{TargetID, AstronomerID}'
      ],
      correct: '{ObsID}',
      explanation: 'ObsID uniquely identifies every observation record minimal superkey.'
    },
    {
      step: 4,
      title: 'Step 4 — Prime vs Non-Prime Attributes',
      question: 'Since ObsID is the candidate key, which attributes are NON-PRIME?',
      options: [
        'Only ObsID is non-prime',
        'All attributes except ObsID are non-prime',
        'TelescopeID and TargetID are prime, rest are non-prime'
      ],
      correct: 'All attributes except ObsID are non-prime',
      explanation: 'Prime attributes belong to a candidate key. ObsID is prime, all other attributes are non-prime.'
    },
    {
      step: 5,
      title: 'Step 5 — Functional Dependencies',
      question: 'Given business rules: TelescopeID determines TelescopeName. Which FD expression is valid?',
      options: [
        'TelescopeName → TelescopeID',
        'TelescopeID → TelescopeName',
        'AstronomerID → TelescopeName'
      ],
      correct: 'TelescopeID → TelescopeName',
      explanation: 'TelescopeID is the unique identifier for a space telescope.'
    },
    {
      step: 6,
      title: 'Step 6 — Attribute Closure Calculation',
      question: 'What is TelescopeID⁺ under FDs: {TelescopeID → TelescopeName}?',
      options: [
        '{TelescopeID, TelescopeName}',
        '{TelescopeID}',
        '{TelescopeID, TargetID, TargetName}'
      ],
      correct: '{TelescopeID, TelescopeName}',
      explanation: 'TelescopeID determines itself and TelescopeName.'
    },
    {
      step: 7,
      title: 'Step 7 — Partial Dependency Check',
      question: 'With single-attribute candidate key ObsID, can partial dependencies exist in this relation?',
      options: [
        'Yes, TelescopeID partially depends on ObsID',
        'No, partial dependency requires a composite candidate key',
        'Yes, TargetName is partially dependent'
      ],
      correct: 'No, partial dependency requires a composite candidate key',
      explanation: 'Partial dependency occurs when a non-prime attribute depends on a proper subset of a composite candidate key.'
    },
    {
      step: 8,
      title: 'Step 8 — 2NF Evaluation',
      question: 'Does SPACE_TELESCOPE_OBSERVATIONS satisfy 2NF?',
      options: [
        'No, it violates 2NF',
        'Yes, it is in 1NF and has no partial dependencies',
        '2NF requires BCNF first'
      ],
      correct: 'Yes, it is in 1NF and has no partial dependencies',
      explanation: 'Since the candidate key ObsID is atomic (single attribute), no partial dependencies can exist. Thus 2NF holds.'
    },
    {
      step: 9,
      title: 'Step 9 — Transitive Dependency Analysis',
      question: 'Identify the transitive dependency in ObsID → TelescopeID and TelescopeID → TelescopeName:',
      options: [
        'ObsID → TargetID',
        'ObsID → TelescopeName (via TelescopeID)',
        'TelescopeName → ObsID'
      ],
      correct: 'ObsID → TelescopeName (via TelescopeID)',
      explanation: 'ObsID determines TelescopeID, which determines TelescopeName. TelescopeName is non-prime and TelescopeID is not a superkey!'
    },
    {
      step: 10,
      title: 'Step 10 — 3NF Evaluation',
      question: 'Does the un-decomposed relation satisfy 3NF under TelescopeID → TelescopeName?',
      options: [
        'Yes, because TelescopeName is prime',
        'No, because TelescopeID is NOT a superkey and TelescopeName is NOT prime',
        'Yes, all relations satisfy 3NF'
      ],
      correct: 'No, because TelescopeID is NOT a superkey and TelescopeName is NOT prime',
      explanation: 'In TelescopeID → TelescopeName, determinant TelescopeID is not a superkey and dependent TelescopeName is non-prime, violating 3NF.'
    },
    {
      step: 11,
      title: 'Step 11 — BCNF Check',
      question: 'Does TelescopeID → TelescopeName satisfy BCNF?',
      options: [
        'No, because TelescopeID is not a superkey',
        'Yes, because TelescopeID is a primary key',
        'BCNF does not apply to space databases'
      ],
      correct: 'No, because TelescopeID is not a superkey',
      explanation: 'BCNF requires EVERY determinant of a non-trivial FD to be a superkey.'
    },
    {
      step: 12,
      title: 'Step 12 — Decomposition Proposal',
      question: 'Which decomposition fixes the 3NF/BCNF violation for telescopes?',
      options: [
        'TELESCOPE(TelescopeID, TelescopeName) and OBSERVATION(ObsID, TelescopeID, TargetID, TargetName, ...)',
        'Split into 10 single-column tables',
        'Do not split, keep single table'
      ],
      correct: 'TELESCOPE(TelescopeID, TelescopeName) and OBSERVATION(ObsID, TelescopeID, TargetID, TargetName, ...)',
      explanation: 'Extracting TELESCOPE into its own relation resolves the transitive/BCNF dependency!'
    },
    {
      step: 13,
      title: 'Step 13 — Lossless Join Verification',
      question: 'Is the decomposition into TELESCOPE(TelescopeID, TelescopeName) and OBSERVATION(...) lossless?',
      options: [
        'No, spurious observations will be generated',
        'Yes, because (TELESCOPE ∩ OBSERVATION) = TelescopeID, which is a candidate key for TELESCOPE',
        'Cannot determine without SQL query'
      ],
      correct: 'Yes, because (TELESCOPE ∩ OBSERVATION) = TelescopeID, which is a candidate key for TELESCOPE',
      explanation: 'The intersection attribute TelescopeID is a key of TELESCOPE, guaranteeing a lossless join!'
    },
    {
      step: 14,
      title: 'Step 14 — Dependency Preservation Check',
      question: 'Is TelescopeID → TelescopeName preserved in the decomposed TELESCOPE relation?',
      options: [
        'No, it is lost',
        'Yes, TelescopeID → TelescopeName is directly enforced within TELESCOPE without joins',
        'Only preserved if database is offline'
      ],
      correct: 'Yes, TelescopeID → TelescopeName is directly enforced within TELESCOPE without joins',
      explanation: 'The dependency is fully contained within the new TELESCOPE table schema.'
    }
  ];

  const q = questions[currentStep];

  const handleSelectOption = (option: string) => {
    setUserAnswers({ ...userAnswers, [currentStep]: option });
    const isCorrect = option === q.correct;
    setFeedback({
      isCorrect,
      text: isCorrect ? `Correct! ${q.explanation}` : `Incorrect. ${q.explanation}`
    });
  };

  const handleNext = () => {
    setFeedback(null);
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-indigo-500/30 rounded-3xl p-6 space-y-6 font-sans shadow-2xl relative overflow-hidden">
      {completed && <Confetti numberOfPieces={200} recycle={false} />}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-indigo-500/20">
        <div>
          <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-indigo-300 to-amber-400 flex items-center gap-2">
            <Award className="text-amber-400" size={28} /> SPACE DATABASE ARCHITECT — FINAL MISSION
          </h3>
          <p className="text-xs text-indigo-300 mt-1">
            Complete the 14-step comprehensive assessment on <code>SPACE_TELESCOPE_OBSERVATIONS</code>
          </p>
        </div>
        <div className="text-xs font-mono bg-indigo-950 text-indigo-300 px-3 py-1.5 rounded-full border border-indigo-500/30 font-bold self-start sm:self-auto">
          Step {currentStep + 1} of 14
        </div>
      </div>

      {!completed ? (
        <div className="space-y-6">
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
            <span className="text-[10px] uppercase tracking-wider font-bold text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-500/30">
              {q.title}
            </span>
            <h4 className="text-sm font-bold text-white leading-relaxed">{q.question}</h4>

            <div className="space-y-2.5">
              {q.options.map((opt, idx) => {
                const isSelected = userAnswers[currentStep] === opt;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full text-left p-3.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-indigo-950 border-indigo-500 text-white shadow-lg'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl text-xs font-semibold leading-relaxed border ${
                  feedback.isCorrect
                    ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-200'
                    : 'bg-red-950/80 border-red-500/40 text-red-200'
                }`}
              >
                {feedback.text}
              </motion.div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                setFeedback(null);
                setCurrentStep(Math.max(0, currentStep - 1));
              }}
              disabled={currentStep === 0}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white disabled:opacity-40 text-xs font-bold"
            >
              Previous Step
            </button>

            <button
              onClick={handleNext}
              disabled={!userAnswers[currentStep]}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-slate-950 font-black text-xs cursor-pointer shadow-lg disabled:opacity-50 flex items-center gap-2"
            >
              {currentStep === questions.length - 1 ? 'Submit & Earn Certificate 🚀' : 'Next Step →'}
            </button>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-8 bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 border-2 border-amber-400/60 rounded-3xl text-center space-y-6 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-4 right-4 text-amber-400/20 font-serif text-6xl font-bold">
            ISRO-DB
          </div>

          <div className="inline-flex p-4 bg-amber-500/20 rounded-full text-amber-400 border border-amber-400/40 mb-2">
            <Award size={48} />
          </div>

          <h2 className="text-3xl font-black text-white tracking-wide">
            CERTIFICATE OF ACHIEVEMENT
          </h2>

          <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            This is to certify that you have successfully mastered <strong>Unit 4 — Relational Database Design & Normalization</strong>, demonstrating competence in Functional Dependencies, Candidate Keys, 1NF, 2NF, 3NF, BCNF, and Lossless Decomposition.
          </p>

          <div className="py-4 border-y border-amber-500/30 text-2xl font-black text-amber-400 tracking-wider">
            DATABASE ARCHITECT — UNIT 4 CERTIFIED 🚀
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => {
                setCompleted(false);
                setCurrentStep(0);
                setUserAnswers({});
                setFeedback(null);
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-bold cursor-pointer"
            >
              Retake Final Mission
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
