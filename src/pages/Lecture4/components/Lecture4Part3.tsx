import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, AlertTriangle, RotateCw } from 'lucide-react';
import { Activity12StageJourney } from './Activity12StageJourney';
import { FLASHCARDS_DATA, COMMON_MISTAKES } from '../data/masterData';

export function JourneyTab() {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <Activity12StageJourney />
    </motion.div>
  );
}

export function FlashcardsTab() {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  const toggleFlip = (idx: number) => {
    setFlipped({ ...flipped, [idx]: !flipped[idx] });
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-indigo-500/20">
        <div>
          <h2 className="text-3xl font-bold text-indigo-300 flex items-center gap-2">
            <Zap className="text-amber-400" /> Interactive Flashcards & Common Traps
          </h2>
          <p className="text-xs text-indigo-200 mt-1">19 Key Database Concepts + "Do Not Get Trapped in Space" Section</p>
        </div>
        <span className="text-xs font-bold bg-amber-950 text-amber-300 px-3 py-1 rounded-full border border-amber-500/30">
          Click Card to Flip 🔄
        </span>
      </div>

      {/* Flashcards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {FLASHCARDS_DATA.map((card, idx) => {
          const isFlipped = !!flipped[idx];
          return (
            <motion.div
              key={idx}
              onClick={() => toggleFlip(idx)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="h-56 p-5 rounded-2xl bg-slate-900/90 border border-indigo-500/30 hover:border-amber-400/60 transition-all cursor-pointer flex flex-col justify-between shadow-lg relative overflow-hidden"
            >
              <div className="flex items-center justify-between text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
                <span>Card #{idx + 1}</span>
                <span className="flex items-center gap-1 text-slate-500">
                  <RotateCw size={12} /> {isFlipped ? 'Back' : 'Front'}
                </span>
              </div>

              {!isFlipped ? (
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-amber-400">{card.term}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{card.def}</p>
                  <div className="text-[11px] font-mono text-cyan-300 bg-slate-950 p-2 rounded border border-cyan-500/20">
                    <strong className="text-cyan-400">SpaceDB:</strong> {card.example}
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-red-400 tracking-wider">Common Mistake:</h4>
                  <p className="text-xs text-red-300 leading-relaxed bg-red-950/40 p-3 rounded-xl border border-red-500/30">
                    ⚠️ {card.mistake}
                  </p>
                </div>
              )}

              <div className="text-[10px] text-slate-500 text-center border-t border-slate-800 pt-2">
                Click to {isFlipped ? 'view definition' : 'view common mistake trap'}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Common Mistakes Section ("Do Not Get Trapped in Space") */}
      <div className="p-6 bg-slate-900/90 border border-red-500/30 rounded-3xl space-y-4 shadow-2xl">
        <div className="flex items-center gap-2 text-red-400 font-bold text-xl pb-2 border-b border-red-500/20">
          <AlertTriangle size={24} />
          <span>Do Not Get Trapped in Space — 8 Common Database Misconceptions</span>
        </div>

        <div className="space-y-3">
          {COMMON_MISTAKES.map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
              <div className="font-bold text-red-400">{item.wrong}</div>
              <div className="text-emerald-300 leading-relaxed font-semibold pl-4 border-l-2 border-emerald-500">
                ✅ Correct: {item.right}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
