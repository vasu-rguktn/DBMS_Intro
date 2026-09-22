import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Network, ExternalLink } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tabId: string) => void;
}

export const KnowledgeMapModal: React.FC<Props> = ({ isOpen, onClose, onSelectTab }) => {
  const nodes = [
    { id: 'intro', label: 'Unit Story & Introduction', category: 'Foundation' },
    { id: 'atomic', label: 'Atomic Domains', category: 'Foundation' },
    { id: '1nf', label: '1NF (First Normal Form)', category: '1NF' },
    { id: 'anomalies', label: 'Update / Insert / Delete Anomalies', category: 'Anomalies' },
    { id: 'fd', label: 'Functional Dependencies (X → Y)', category: 'FDs' },
    { id: 'fd-rules', label: 'Trivial, Non-Trivial, Full, Partial & Transitive FDs', category: 'FDs' },
    { id: 'keys', label: 'Candidate Keys, Prime & Non-Prime Attributes', category: 'Keys' },
    { id: 'axioms', label: 'Armstrong\'s Axioms (Reflexivity, Augmentation, Transitivity)', category: 'Axioms' },
    { id: 'closure', label: 'Attribute Closure Engine (X⁺)', category: 'Closure' },
    { id: 'minimal-cover', label: 'Minimal Cover (Canonical Cover)', category: 'Cleanup' },
    { id: '2nf', label: '2NF & Partial Dependency Decomposition', category: 'Normal Forms' },
    { id: '3nf', label: '3NF & Transitive Dependency Decomposition', category: 'Normal Forms' },
    { id: 'bcnf', label: 'BCNF Stronger Determinant Rule', category: 'Normal Forms' },
    { id: 'comparison', label: 'Normal Form Comparison Table', category: 'Summary' },
    { id: 'decomposition', label: 'Lossless Join & Dependency Preservation', category: 'Decomposition' },
    { id: 'journey', label: '12-Stage Complete Normalization Journey', category: 'Workflow' },
    { id: 'flashcards', label: 'Flashcards & Traps ("Do Not Get Trapped in Space")', category: 'Review' },
    { id: 'final-mission', label: 'SPACE DATABASE ARCHITECT — FINAL MISSION', category: 'Assessment' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-indigo-500/40 rounded-3xl p-6 max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative font-sans"
            >
              <div className="flex items-center justify-between pb-4 border-b border-indigo-500/20 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-indigo-600/20 rounded-2xl text-indigo-400 border border-indigo-500/30">
                    <Network size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">UNIT 4 KNOWLEDGE MAP</h3>
                    <p className="text-sm text-indigo-300">Click any galaxy orbital station to jump directly to the module</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <X size={22} />
                </button>
              </div>

              {/* ASCII / Graphical Tree representation */}
              <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 font-mono text-xs text-indigo-200 mb-8 overflow-x-auto leading-relaxed shadow-inner">
                <pre className="text-indigo-400 font-bold">
{`GOOD RELATIONAL DESIGN
        │
        ├── Atomic Domains
        │
        ├── 1NF
        │
        ├── Functional Dependencies
        │       ├── Trivial
        │       ├── Non-Trivial
        │       ├── Full
        │       ├── Partial
        │       └── Transitive
        │
        ├── Armstrong's Axioms
        │       ├── Reflexivity
        │       ├── Augmentation
        │       └── Transitivity
        │
        ├── Attribute Closure (X⁺)
        │
        ├── Minimal Cover
        │
        ├── 2NF
        │
        ├── 3NF
        │
        ├── BCNF
        │
        └── Decomposition
                ├── Lossless Join
                └── Dependency Preservation`}
                </pre>
              </div>

              {/* Interactive clickable node grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {nodes.map((node) => (
                  <button
                    key={node.id}
                    onClick={() => {
                      onSelectTab(node.id);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 hover:border-indigo-500/60 hover:bg-indigo-950/40 text-left transition-all group cursor-pointer"
                  >
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 block mb-0.5">
                        {node.category}
                      </span>
                      <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                        {node.label}
                      </span>
                    </div>
                    <ExternalLink size={16} className="text-indigo-400 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
