import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { OperatorConfig } from './OperatorData';
import { Database, Zap, CheckCircle2, ChevronRight, XCircle, DatabaseBackup } from 'lucide-react';

export default function OperatorSection({ 
  operator, 
  onComplete 
}: { 
  operator: OperatorConfig, 
  onComplete: () => void 
}) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8>(1);
  const [puzzleAnswer, setPuzzleAnswer] = useState<number | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [interactiveApplied, setInteractiveApplied] = useState(false);

  const nextStep = () => setStep((s) => Math.min(s + 1, 8) as any);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="max-w-5xl mx-auto w-full p-4 md:p-8"
    >
      {/* Progress Bar */}
      <div className="flex justify-between items-center mb-8 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
          <div key={s} className={`h-2 flex-1 rounded-full transition-colors ${s <= step ? 'bg-cyan-500' : 'bg-gray-700'}`} />
        ))}
      </div>

      <div className="glass-panel p-8 rounded-3xl min-h-[500px] flex flex-col justify-center relative overflow-hidden">
        
        {/* Step 1: Real-world Scenario */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
              <span className="inline-block px-4 py-1 rounded-full bg-blue-500/20 text-blue-300 mb-6 font-semibold uppercase tracking-wider text-sm">
                Scenario: {operator.app}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">{operator.scenario}</h2>
              <button onClick={nextStep} className="mt-8 px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2 mx-auto">
                What's the problem? <ChevronRight />
              </button>
            </motion.div>
          )}

          {/* Step 2: Puzzle */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
              <h3 className="text-2xl mb-8 font-bold text-yellow-400">{operator.puzzleQuestion}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {operator.puzzleOptions.map((opt, i) => (
                  <button 
                    key={i}
                    onClick={() => {
                      setPuzzleAnswer(i);
                      if (i === operator.correctPuzzleOption) {
                        setTimeout(nextStep, 1000);
                      }
                    }}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      puzzleAnswer === i 
                        ? i === operator.correctPuzzleOption 
                          ? 'bg-green-500/20 border-green-500 text-green-300 shadow-[0_0_15px_rgba(34,197,94,0.3)]' 
                          : 'bg-red-500/20 border-red-500 text-red-300'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Reveal */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center">
              <h2 className="text-xl text-gray-400 mb-4 uppercase tracking-widest font-semibold">Operator Discovered!</h2>
              <div className="text-[120px] leading-none mb-6 text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-500 glow-text-cyan font-serif">
                {operator.symbol}
              </div>
              <h3 className="text-4xl font-bold mb-4">{operator.name}</h3>
              <p className="text-xl text-gray-300 mb-8">{operator.meaning}</p>
              <button onClick={nextStep} className="px-8 py-3 bg-cyan-600 rounded-full font-bold hover:bg-cyan-500 transition-colors">
                See it in action
              </button>
            </motion.div>
          )}

          {/* Step 4 & 5 & 6: Animation + SQL + RA */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full">
              <div className="flex flex-col md:flex-row gap-8 items-center h-full">
                
                <div className="flex-1 w-full space-y-6">
                  <div className="bg-black/50 p-6 rounded-xl font-mono text-sm border border-gray-700">
                    <div className="text-gray-400 mb-2">SQL</div>
                    <pre className="text-cyan-300">{operator.sqlEquivalent}</pre>
                  </div>
                  
                  <div className="bg-black/50 p-6 rounded-xl font-mono text-xl border border-gray-700 text-center">
                    <div className="text-gray-400 mb-2 text-sm text-left">Relational Algebra</div>
                    <span className="text-purple-400 font-bold">{operator.raEquivalent}</span>
                  </div>
                </div>

                <div className="flex-1 w-full text-sm">
                  <h4 className="text-center mb-2 font-semibold">Database Internal Execution</h4>
                  
                  {/* Table visualizer */}
                  <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                    <table className="w-full text-left">
                      <thead className="bg-gray-800">
                        <tr>
                          {operator.tableBefore.columns.map(c => (
                            <th key={c} className="p-2 border-b border-gray-700">{c}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {operator.tableBefore.data.map((row, i) => {
                          const isKept = operator.tableAfter.data.some(afterRow => JSON.stringify(afterRow) === JSON.stringify(row) || operator.id === 'projection');
                          
                          return (
                            <motion.tr 
                              key={i} 
                              className={`border-b border-gray-800`}
                              initial={{ opacity: 1 }}
                              animate={{ 
                                opacity: isKept ? 1 : 0.2,
                                backgroundColor: isKept ? 'rgba(34, 197, 94, 0.1)' : 'transparent'
                              }}
                              transition={{ delay: 1 + i * 0.2 }}
                            >
                              {row.map((cell, j) => {
                                const colName = operator.tableBefore.columns[j];
                                const isColKept = operator.id !== 'projection' || operator.tableAfter.columns.includes(colName);
                                return (
                                  <motion.td 
                                    key={j} 
                                    className="p-2"
                                    animate={{ opacity: isColKept ? 1 : 0.2 }}
                                    transition={{ delay: 1.5 }}
                                  >
                                    {cell}
                                  </motion.td>
                                );
                              })}
                            </motion.tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-8">
                <button onClick={nextStep} className="px-8 py-3 bg-cyan-600 rounded-full font-bold hover:bg-cyan-500 transition-colors">
                  Try it yourself
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 7: Interactive Activity */}
          {step === 5 && (
            <motion.div key="step7" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center h-full flex flex-col items-center justify-center">
              <h3 className="text-2xl font-bold mb-6">Interactive Database Sandbox</h3>
              <p className="text-gray-300 mb-8">Click the operator to apply it to the data.</p>
              
              <div className="flex items-center gap-8 mb-12">
                 <div className="w-32 h-32 bg-gray-800 rounded-lg border border-gray-600 flex items-center justify-center shadow-lg relative">
                    <Database className="w-12 h-12 text-gray-400" />
                    <span className="absolute bottom-2 text-xs text-gray-400">Raw Data</span>
                 </div>
                 
                 <motion.button 
                   whileHover={{ scale: 1.1 }}
                   whileTap={{ scale: 0.9 }}
                   onClick={() => setInteractiveApplied(true)}
                   className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl font-serif border-2 transition-colors ${interactiveApplied ? 'bg-purple-900 border-purple-400 text-purple-200 shadow-[0_0_20px_rgba(176,38,255,0.5)]' : 'bg-gray-800 border-gray-600 text-gray-400'}`}
                 >
                   {operator.symbol}
                 </motion.button>
                 
                 <div className="w-32 h-32 bg-gray-800 rounded-lg border border-gray-600 flex items-center justify-center shadow-lg relative overflow-hidden">
                    <AnimatePresence>
                      {interactiveApplied && (
                        <motion.div 
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute inset-0 bg-green-900/40 flex items-center justify-center"
                        >
                           <CheckCircle2 className="w-12 h-12 text-green-400" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {!interactiveApplied && <DatabaseBackup className="w-12 h-12 text-gray-600" />}
                    <span className="absolute bottom-2 text-xs text-gray-400">Result</span>
                 </div>
              </div>

              {interactiveApplied && (
                <motion.button 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  onClick={nextStep} 
                  className="px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform"
                >
                  Continue
                </motion.button>
              )}
            </motion.div>
          )}

          {/* Step 8: Mini Quiz */}
          {step === 6 && (
            <motion.div key="step8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center flex flex-col justify-center h-full">
               <div className="inline-block p-4 bg-yellow-500/20 text-yellow-400 rounded-full mb-6 mx-auto">
                 <Zap className="w-8 h-8" />
               </div>
               <h3 className="text-2xl md:text-3xl font-bold mb-12">{operator.quizQuestion}</h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto w-full">
                  {operator.quizOptions.map((opt, i) => (
                    <button 
                      key={i}
                      onClick={() => {
                        setQuizAnswer(i);
                        if (i === operator.correctQuizOption) {
                          setTimeout(() => onComplete(), 1500);
                        }
                      }}
                      className={`p-5 rounded-xl border text-lg font-semibold transition-all ${
                        quizAnswer === i 
                          ? i === operator.correctQuizOption 
                            ? 'bg-green-500/20 border-green-500 text-green-300' 
                            : 'bg-red-500/20 border-red-500 text-red-300'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {opt}
                      {quizAnswer === i && i === operator.correctQuizOption && <CheckCircle2 className="inline ml-2 w-5 h-5 text-green-500" />}
                      {quizAnswer === i && i !== operator.correctQuizOption && <XCircle className="inline ml-2 w-5 h-5 text-red-500" />}
                    </button>
                  ))}
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
