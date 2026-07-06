import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ChevronRight, ChevronDown } from 'lucide-react';

const statements = [
  { text: "Instagram uses databases.", isFact: true, explain: "Yes! Every post, like, and comment is stored in massive databases." },
  { text: "Excel and DBMS are exactly the same thing.", isFact: false, explain: "Myth! Excel is just a spreadsheet. DBMS handles concurrent users, security, and massive scale data." },
  { text: "Banks can run safely without DBMS.", isFact: false, explain: "Impossible. DBMS ensures transaction integrity (ACID properties) so your money doesn't disappear." },
  { text: "UPI payments use databases.", isFact: true, explain: "Absolutely. Every transaction instantly updates banking databases." },
  { text: "Google Search uses databases.", isFact: true, explain: "Google relies on highly distributed databases to index the entire internet." },
  { text: "A physical notebook is a DBMS.", isFact: false, explain: "A notebook is a manual record. A DBMS is a computerized software system." }
];

const MythFactSection = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const handleGuess = (guessIsFact: boolean) => {
    if (feedback !== null) return; // prevent multiple clicks
    const actualIsFact = statements[currentIdx].isFact;
    if (guessIsFact === actualIsFact) {
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }
  };

  const handleNext = () => {
    if (currentIdx < statements.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setFeedback(null);
    } else {
      const nextSection = document.getElementById('quiz-section');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="myth-section" className="min-h-screen flex flex-col items-center justify-center relative px-4 py-20">
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white">
        Myth vs Fact
      </h2>

      <div className="glass-panel p-8 md:p-12 rounded-3xl w-full max-w-2xl relative">
        <div className="text-center mb-8">
          <span className="text-sm font-bold tracking-widest text-gray-400 uppercase">Statement {currentIdx + 1} of {statements.length}</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="min-h-[150px] flex items-center justify-center text-center"
          >
            <h3 className="text-2xl md:text-4xl font-medium text-white leading-tight">
              "{statements[currentIdx].text}"
            </h3>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-6 mt-8">
          <motion.button
            whileHover={{ scale: feedback ? 1 : 1.05 }}
            whileTap={{ scale: feedback ? 1 : 0.95 }}
            onClick={() => handleGuess(true)}
            disabled={feedback !== null}
            className={`px-8 py-4 rounded-xl font-bold text-xl border-2 transition-all ${
              feedback && statements[currentIdx].isFact 
                ? 'bg-green-500/20 border-green-500 text-green-400' 
                : feedback 
                  ? 'border-gray-700 text-gray-600'
                  : 'border-[var(--color-neon-cyan)] text-[var(--color-neon-cyan)] hover:bg-[var(--color-neon-cyan)] hover:text-black'
            }`}
          >
            FACT
          </motion.button>
          <motion.button
            whileHover={{ scale: feedback ? 1 : 1.05 }}
            whileTap={{ scale: feedback ? 1 : 0.95 }}
            onClick={() => handleGuess(false)}
            disabled={feedback !== null}
            className={`px-8 py-4 rounded-xl font-bold text-xl border-2 transition-all ${
              feedback && !statements[currentIdx].isFact 
                ? 'bg-red-500/20 border-red-500 text-red-400' 
                : feedback 
                  ? 'border-gray-700 text-gray-600'
                  : 'border-[var(--color-neon-purple)] text-[var(--color-neon-purple)] hover:bg-[var(--color-neon-purple)] hover:text-white'
            }`}
          >
            MYTH
          </motion.button>
        </div>

        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 rounded-xl bg-[var(--color-galaxy-800)] border border-gray-700"
            >
              <div className="flex items-center gap-3 mb-2">
                {feedback === 'correct' ? (
                  <CheckCircle2 className="text-green-400" size={28} />
                ) : (
                  <XCircle className="text-red-400" size={28} />
                )}
                <span className={`text-xl font-bold ${feedback === 'correct' ? 'text-green-400' : 'text-red-400'}`}>
                  {feedback === 'correct' ? 'Correct!' : 'Incorrect!'}
                </span>
              </div>
              <p className="text-gray-300 text-lg">
                {statements[currentIdx].explain}
              </p>
              
              <div className="flex justify-end mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="px-6 py-2 bg-white text-black font-bold rounded-full flex items-center gap-2"
                >
                  {currentIdx < statements.length - 1 ? 'Next' : 'Continue'}
                  {currentIdx < statements.length - 1 ? <ChevronRight size={20} /> : <ChevronDown size={20} />}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MythFactSection;

