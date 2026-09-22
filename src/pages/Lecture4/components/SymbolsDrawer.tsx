import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Sparkles } from 'lucide-react';
import { DB_SYMBOLS } from '../data/masterData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SymbolsDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-slate-900/95 border-l border-indigo-500/30 shadow-2xl z-50 p-6 overflow-y-auto font-sans"
          >
            <div className="flex items-center justify-between pb-4 border-b border-indigo-500/20 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                  <BookOpen size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    Database Symbols Panel <Sparkles size={16} className="text-amber-400" />
                  </h3>
                  <p className="text-xs text-indigo-300">Formal mathematical & relational notation reference</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {DB_SYMBOLS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-indigo-500/40 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-black text-amber-400 font-mono bg-slate-900 px-3 py-1 rounded-lg border border-amber-500/20">
                      {item.symbol}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 bg-indigo-950/60 px-2.5 py-1 rounded-full border border-indigo-500/30">
                      {item.name}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 mb-2 leading-relaxed">{item.meaning}</p>
                  <div className="text-xs font-mono text-cyan-300 bg-slate-900/80 p-2 rounded-lg border border-cyan-500/20">
                    <strong className="text-cyan-400">Example:</strong> {item.example}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
