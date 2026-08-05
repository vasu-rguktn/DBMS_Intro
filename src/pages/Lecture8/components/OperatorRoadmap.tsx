import { motion } from 'framer-motion';
import { CheckCircle2, Lock, ArrowRight } from 'lucide-react';
import { operatorsData } from './OperatorData';

export default function OperatorRoadmap({
  unlockedIndex,
  onSelect
}: {
  unlockedIndex: number;
  onSelect: (index: number) => void;
}) {
  const groups = ['Basic', 'Join', 'Advanced'];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center py-16 px-4 md:px-8 max-w-6xl mx-auto w-full"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text-cyan">Operator Roadmap</h2>
        <p className="text-xl text-gray-400">Unlock the language of databases</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {groups.map((group) => {
          const groupOperators = operatorsData.filter(o => o.group === group);
          
          return (
            <div key={group} className="glass-panel p-6 rounded-3xl border border-gray-700/50 flex flex-col">
              <h3 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-700 text-center">{group} Operators</h3>
              <div className="space-y-4 flex-1">
                {groupOperators.map((operator) => {
                  const index = operatorsData.findIndex(o => o.id === operator.id);
                  const isCompleted = index < unlockedIndex;
                  const isCurrent = index === unlockedIndex;

                  return (
                    <motion.button
                      key={operator.id}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => onSelect(index)}
                      className={`w-full p-4 rounded-xl flex items-center justify-between text-left transition-all ${
                        isCurrent 
                          ? 'bg-cyan-500/20 border-2 border-cyan-500 shadow-[0_0_15px_rgba(0,240,255,0.3)]' 
                          : isCompleted 
                            ? 'bg-green-500/10 border border-green-500/50' 
                            : 'bg-gray-800/50 border border-gray-700 opacity-70 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded flex items-center justify-center border ${
                          isCompleted ? 'bg-green-500/20 border-green-500 text-green-400' : isCurrent ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-gray-800 border-gray-600 text-gray-500'
                        }`}>
                          {isCompleted ? <CheckCircle2 size={16} /> : isCurrent ? <ArrowRight size={16} /> : <div className="w-3 h-3 rounded-sm bg-gray-600"></div>}
                        </div>
                        <span className={`w-8 text-center font-serif text-xl ${isCompleted ? 'text-green-200' : isCurrent ? 'text-cyan-200' : 'text-gray-500'}`}>
                          {operator.symbol}
                        </span>
                        <span className={`font-semibold ${isCompleted ? 'text-green-100' : isCurrent ? 'text-white' : 'text-gray-400'}`}>
                          {operator.name}
                        </span>
                      </div>
                      
                      <div>
                        {!isCompleted && !isCurrent && <Lock className="text-gray-600 w-4 h-4" />}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      
      {unlockedIndex >= operatorsData.length && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => onSelect(operatorsData.length)}
          className="mt-12 px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-bold text-xl shadow-[0_0_30px_rgba(176,38,255,0.4)]"
        >
          Enter Symbol Memory Studio &rarr;
        </motion.button>
      )}
    </motion.div>
  );
}
