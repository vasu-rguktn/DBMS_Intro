import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { constraintsQuizData } from '../../../data/constraintsQuizData';
import type { UserStats } from '../index';
import { CheckCircle2, XCircle, ChevronRight, Unlock, Database } from 'lucide-react';

interface Props {
  onComplete: (stats: UserStats) => void;
}

const ConstraintsQuiz = ({ onComplete }: Props) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [attemptsOnCurrent, setAttemptsOnCurrent] = useState(0);
  
  // Stats state
  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [unlockedConstraints, setUnlockedConstraints] = useState<string[]>([]);

  const challenge = constraintsQuizData[currentIdx];
  const isLastQuestion = currentIdx === constraintsQuizData.length - 1;

  const handleOptionClick = (option: string) => {
    if (isRevealed) return; // Prevent changing answer after correct

    setSelectedAnswer(option);
    
    if (option === challenge.correctAnswer) {
      // Correct!
      setIsRevealed(true);
      setCorrectAnswers(prev => prev + 1);
      
      // Points logic: +100 for first try, +50 for next tries
      const xpGained = attemptsOnCurrent === 0 ? 100 : 50;
      setXp(prev => prev + xpGained);
      setScore(prev => prev + (attemptsOnCurrent === 0 ? 1 : 0.5));
      setUnlockedConstraints(prev => [...prev, challenge.constraint]);
      
    } else {
      // Incorrect
      setAttemptsOnCurrent(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete({
        score,
        xp,
        correctAnswers,
        unlockedConstraints
      });
    } else {
      setCurrentIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setIsRevealed(false);
      setAttemptsOnCurrent(0);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center py-20 px-4 relative">
      {/* Top Bar: Progress & XP */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-8 bg-[var(--color-galaxy-900)] p-4 rounded-2xl border border-gray-700 shadow-lg z-10">
        <div className="flex flex-col">
          <span className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-1">
            Challenge {currentIdx + 1} of {constraintsQuizData.length}
          </span>
          <div className="w-48 h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-[var(--color-neon-cyan)] to-[var(--color-neon-purple)]"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIdx) / constraintsQuizData.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[var(--color-neon-cyan)] font-extrabold text-2xl drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">
            {xp} XP
          </span>
        </div>
      </div>

      {/* Main Challenge Card */}
      <div className="w-full max-w-4xl flex flex-col gap-6 z-10">
        
        {/* Scenario & Question */}
        <motion.div 
          key={`q-${currentIdx}`}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel p-8 rounded-3xl border border-gray-700 shadow-xl bg-[var(--color-galaxy-900)]/80"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-[var(--color-neon-purple)]/20 rounded-xl text-[var(--color-neon-purple)]">
              <Database size={24} />
            </div>
            <div>
              <h3 className="text-gray-400 font-semibold mb-2 uppercase tracking-wide text-sm">Scenario</h3>
              <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
                {challenge.scenario}
              </p>
            </div>
          </div>
          <div className="w-full h-px bg-gray-700 my-6"></div>
          <h4 className="text-xl text-[var(--color-neon-cyan)] font-bold">
            {challenge.question}
          </h4>
        </motion.div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {challenge.options.map((option, idx) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === challenge.correctAnswer;
            
            let btnStateClass = "bg-[var(--color-galaxy-800)] border-gray-600 hover:border-[var(--color-neon-cyan)] hover:bg-[var(--color-galaxy-700)] text-gray-200";
            let icon = null;

            if (isRevealed) {
              if (isCorrect) {
                btnStateClass = "bg-green-900/30 border-green-500 text-green-100 shadow-[0_0_20px_rgba(34,197,94,0.3)]";
                icon = <CheckCircle2 className="text-green-500" />;
              } else if (isSelected) {
                btnStateClass = "bg-red-900/30 border-red-500 text-red-100 opacity-50";
                icon = <XCircle className="text-red-500" />;
              } else {
                btnStateClass = "bg-[var(--color-galaxy-800)] border-gray-700 text-gray-500 opacity-50";
              }
            } else if (isSelected) {
              btnStateClass = "bg-red-900/30 border-red-500 text-red-100";
              icon = <XCircle className="text-red-500" />;
            }

            return (
              <motion.button
                key={idx}
                whileHover={!isRevealed ? { scale: 1.02 } : {}}
                whileTap={!isRevealed ? { scale: 0.98 } : {}}
                onClick={() => handleOptionClick(option)}
                disabled={isRevealed}
                className={`p-6 rounded-2xl border-2 text-left text-lg font-medium transition-all duration-300 flex justify-between items-center ${btnStateClass}`}
              >
                <span>{option}</span>
                {icon}
              </motion.button>
            );
          })}
        </div>

        {/* Constraint Reveal */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              className="mt-6 glass-panel p-8 rounded-3xl border border-[var(--color-neon-cyan)] bg-gradient-to-b from-[var(--color-neon-cyan)]/10 to-transparent overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-4 text-[var(--color-neon-cyan)]">
                <Unlock size={28} />
                <h3 className="text-2xl font-extrabold tracking-wide uppercase">Constraint Unlocked</h3>
              </div>
              
              <h2 className="text-4xl font-black mb-2 text-white">{challenge.constraint}</h2>
              <p className="text-xl text-gray-300 mb-6 font-medium italic">{challenge.definition}</p>
              
              <div className="bg-[var(--color-galaxy-900)] p-6 rounded-2xl border border-gray-700 mb-6">
                <p className="text-lg text-gray-200 leading-relaxed">
                  {challenge.reasoning}
                </p>
              </div>

              {(challenge.visual || challenge.sql) && (
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  {challenge.visual && (
                    <div className="flex-1 bg-black/50 p-4 rounded-xl border border-gray-700 font-mono text-sm text-[var(--color-neon-purple)] whitespace-pre-wrap flex items-center justify-center text-center">
                      {challenge.visual}
                    </div>
                  )}
                  {challenge.sql && (
                    <div className="flex-1 bg-black/50 p-4 rounded-xl border border-gray-700 font-mono text-sm text-green-400 whitespace-pre-wrap flex items-center justify-center">
                      {challenge.sql}
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-end mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="px-8 py-4 bg-[var(--color-neon-cyan)] text-gray-900 font-bold rounded-full text-xl flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                >
                  {isLastQuestion ? "Finish Challenge" : "Next Challenge"}
                  <ChevronRight size={24} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default ConstraintsQuiz;
