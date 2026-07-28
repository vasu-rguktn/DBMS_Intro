import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, ShieldAlert, Sparkles, CheckCircle2, XCircle, Zap, Cpu, DatabaseBackup } from 'lucide-react';
import Confetti from 'react-confetti';
import { operatorsData } from './OperatorData';

export default function FinalMission({ onComplete }: { onComplete?: () => void }) {
  const [stage, setStage] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showGrandFinale, setShowGrandFinale] = useState(false);
  const [finaleStep, setFinaleStep] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generating questions dynamically from operatorsData ensures we cover all 15.
  // We'll create custom challenging questions based on the operator meaning/scenario.
  const missions = operatorsData.map(op => {
    // Generate 3 plausible but wrong options, plus the correct one
    let wrongOptions = operatorsData
      .filter(o => o.id !== op.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(o => `${o.name} (${o.symbol})`);
    
    const correctStr = `${op.name} (${op.symbol})`;
    const options = [...wrongOptions, correctStr].sort(() => 0.5 - Math.random());
    const correctIdx = options.indexOf(correctStr);

    return {
      title: op.name,
      question: `Mission: ${op.scenario}\nWhich operator do you use for this?`,
      options,
      correct: correctIdx
    };
  });

  const handleSelect = (idx: number) => {
    setSelectedOption(idx);
    if (idx === missions[stage].correct) {
      setTimeout(() => {
        setSelectedOption(null);
        if (stage < missions.length - 1) {
          setStage(s => s + 1);
        } else {
          setShowGrandFinale(true);
        }
      }, 1000);
    }
  };

  const advanceFinale = () => setFinaleStep(s => s + 1);

  if (showGrandFinale) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden max-w-5xl mx-auto">
        {finaleStep >= 7 && <Confetti width={windowSize.width} height={windowSize.height} />}
        
        <div className="text-center mb-12">
           <h2 className="text-4xl md:text-6xl font-bold mb-4 glow-text-cyan">Grand Finale</h2>
           <p className="text-xl text-gray-400 max-w-2xl mx-auto">
             "Build the Discover Feed for Alex." You must apply every operator you've learned.
           </p>
        </div>

        <div className="glass-panel p-8 rounded-3xl w-full text-center relative overflow-hidden min-h-[400px] flex flex-col items-center justify-center">
           
           <AnimatePresence mode="wait">
             {finaleStep === 0 && (
               <motion.div key="f0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                 <h3 className="text-3xl font-bold mb-6">System Architecture Verified</h3>
                 <p className="text-gray-300 mb-8">All 15 operators successfully deployed to the Query Optimizer.</p>
                 <button onClick={advanceFinale} className="px-8 py-3 bg-cyan-600 rounded-full font-bold">Initiate Query</button>
               </motion.div>
             )}
             {finaleStep === 1 && (
               <motion.div key="f1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                 <div className="text-sm text-gray-500 mb-2 uppercase tracking-widest">Student Solution</div>
                 <div className="p-4 bg-gray-900 border border-gray-700 rounded-xl font-mono text-cyan-300 text-left mb-6 whitespace-pre">
                   {`Applying:\n1. σ (Filter Alex's friends)\n2. ⋈ (Join with Stories)\n3. π (Extract VideoURL)\n4. − (Remove blocked users)\n...and 11 more operations.`}
                 </div>
                 <button onClick={advanceFinale} className="px-8 py-3 bg-cyan-600 rounded-full font-bold">Compile to SQL</button>
               </motion.div>
             )}
             {finaleStep === 2 && (
               <motion.div key="f2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                 <div className="text-sm text-gray-500 mb-2 uppercase tracking-widest">SQL Generated</div>
                 <div className="p-4 bg-black border border-gray-700 rounded-xl font-mono text-blue-400 text-left mb-6 text-sm">
                   SELECT VideoURL FROM Stories<br/>
                   INNER JOIN Friends ON ...<br/>
                   EXCEPT SELECT ...
                 </div>
                 <button onClick={advanceFinale} className="px-8 py-3 bg-cyan-600 rounded-full font-bold">Generate RA Tree</button>
               </motion.div>
             )}
             {finaleStep === 3 && (
               <motion.div key="f3" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2 }}>
                 <div className="text-[100px] text-purple-500 glow-text-purple mb-4">π</div>
                 <div className="text-3xl text-purple-400 mb-2">|</div>
                 <div className="text-6xl text-purple-400 glow-text-purple mb-6">−</div>
                 <button onClick={advanceFinale} className="px-8 py-3 bg-cyan-600 rounded-full font-bold">Optimize</button>
               </motion.div>
             )}
             {finaleStep === 4 && (
               <motion.div key="f4" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}>
                 <Zap className="w-24 h-24 text-yellow-400 mx-auto mb-6 animate-pulse" />
                 <h3 className="text-3xl font-bold mb-6">Query Optimizer</h3>
                 <p className="text-gray-300 mb-8">Reordering joins and pushing selections down...</p>
                 <button onClick={advanceFinale} className="px-8 py-3 bg-cyan-600 rounded-full font-bold">Execute</button>
               </motion.div>
             )}
             {finaleStep === 5 && (
               <motion.div key="f5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                 <Cpu className="w-24 h-24 text-red-500 mx-auto mb-6" />
                 <h3 className="text-3xl font-bold mb-6">Execution Engine</h3>
                 <div className="w-full bg-gray-800 rounded-full h-4 mb-8 overflow-hidden">
                   <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.5 }} onAnimationComplete={() => setTimeout(advanceFinale, 500)} className="bg-red-500 h-full" />
                 </div>
               </motion.div>
             )}
             {finaleStep === 6 && (
               <motion.div key="f6" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }}>
                 <DatabaseBackup className="w-24 h-24 text-green-400 mx-auto mb-6" />
                 <h3 className="text-3xl font-bold mb-6 text-green-400">Database Result</h3>
                 <p className="text-gray-300 mb-8 font-mono">1,452,091 rows returned in 12ms.</p>
                 <button onClick={advanceFinale} className="px-8 py-3 bg-green-600 rounded-full font-bold">Show Score</button>
               </motion.div>
             )}
             {finaleStep === 7 && (
               <motion.div key="f7" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', bounce: 0.5 }}>
                 <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }} className="inline-block mb-8">
                   <Trophy className="w-32 h-32 text-yellow-400" />
                 </motion.div>
                 
                 <h2 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600">
                   Performance Score: 100/100
                 </h2>
                 <p className="text-xl text-gray-300 mb-8">You successfully orchestrated all 15 relational algebra operators!</p>
                 
                 <div className="inline-flex items-center gap-3 px-6 py-3 bg-yellow-500/10 border border-yellow-500/50 rounded-full text-yellow-300 font-bold mb-12 shadow-[0_0_20px_rgba(250,204,21,0.3)]">
                   <Star className="w-5 h-5 fill-current" /> Relational Algebra Master <Star className="w-5 h-5 fill-current" />
                 </div>
                 
                 <div className="flex justify-center gap-4">
                    <button onClick={onComplete} className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-black rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                      <Sparkles className="w-5 h-5" /> View Operator Summary
                    </button>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden"
    >
      <div className="max-w-3xl w-full z-10 text-center">
        <div className="mb-8 p-4 bg-gray-900 rounded-2xl border border-gray-700 flex flex-wrap gap-1 justify-center">
          {missions.map((_, i) => (
            <div key={i} className={`h-2 w-8 rounded-full transition-colors ${i < stage ? 'bg-green-500' : i === stage ? 'bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]' : 'bg-gray-800'}`} />
          ))}
        </div>
        
        <div className="inline-block p-4 bg-red-500/20 text-red-400 rounded-full mb-6">
          <ShieldAlert className="w-10 h-10" />
        </div>
        <h2 className="text-4xl font-bold mb-2">Senior DB Engineer Mission</h2>
        <h3 className="text-xl text-gray-400 mb-8">Stage {stage + 1} of 15: {missions[stage].title}</h3>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={stage}
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
            className="glass-panel p-6 md:p-10 rounded-3xl mb-8 border border-white/10 shadow-2xl"
          >
            <p className="text-xl md:text-2xl font-medium mb-8 whitespace-pre-line">{missions[stage].question}</p>
            <div className="space-y-4">
              {missions[stage].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={selectedOption !== null}
                  className={`w-full p-4 rounded-xl text-left font-bold text-lg border transition-all ${
                    selectedOption === i 
                      ? i === missions[stage].correct 
                        ? 'bg-green-500/20 border-green-500 text-green-300' 
                        : 'bg-red-500/20 border-red-500 text-red-300'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {opt}
                  {selectedOption === i && i === missions[stage].correct && <CheckCircle2 className="inline ml-2 float-right text-green-500" />}
                  {selectedOption === i && i !== missions[stage].correct && <XCircle className="inline ml-2 float-right text-red-500" />}
                </button>
              ))}
            </div>
            {selectedOption !== null && selectedOption !== missions[stage].correct && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 p-4 bg-red-900/40 text-red-200 rounded-lg text-sm border border-red-500/50">
                Incorrect operator. Try again!
                <button onClick={() => setSelectedOption(null)} className="ml-4 underline hover:text-white">Retry</button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
