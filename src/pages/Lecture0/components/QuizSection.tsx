import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';

const quizData = [
  {
    q: "What does DBMS stand for?",
    options: ["Database Management System", "Data Basic Memory System", "Digital Backup Memory Service"],
    ans: 0
  },
  {
    q: "Which of the following is NOT a characteristic of a DBMS?",
    options: ["Data Security", "Concurrent Access", "Manual Paper Storage"],
    ans: 2
  },
  {
    q: "Why do banks use databases instead of spreadsheets?",
    options: ["Spreadsheets are too expensive", "Databases handle massive scale and transactions securely", "Banks don't use databases"],
    ans: 1
  },
  {
    q: "When you like a photo on Instagram, where does that information go?",
    options: ["Into thin air", "Stored on your screen", "Updated in a massive cloud database"],
    ans: 2
  },
  {
    q: "What happens if a university uses random files instead of a DBMS for student records?",
    options: ["Data becomes perfectly organized", "Data Chaos (redundancy and inconsistency)", "Computers run faster"],
    ans: 1
  }
];

const QuizSection = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [xp, setXp] = useState(0);
  const [stars, setStars] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const handleOptionClick = (idx: number) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(idx);
    
    if (idx === quizData[currentQ].ans) {
      setXp(prev => prev + 100);
      setStars(prev => prev + 1);
    }
    
    setTimeout(() => {
      if (currentQ < quizData.length - 1) {
        setCurrentQ(prev => prev + 1);
        setSelectedOpt(null);
      } else {
        setIsFinished(true);
        const nextSection = document.getElementById('mission-complete-section');
        if (nextSection) {
          setTimeout(() => nextSection.scrollIntoView({ behavior: 'smooth' }), 500);
        }
      }
    }, 1500);
  };

  return (
    <section id="quiz-section" className="min-h-screen flex flex-col items-center justify-center relative px-4 py-20">
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white glow-text-purple">
        Commander's Assessment
      </h2>

      <div className="flex justify-between w-full max-w-2xl mb-8 glass-panel p-4 rounded-xl">
        <div className="flex items-center gap-2">
          <Trophy className="text-yellow-400" />
          <span className="font-bold text-xl text-yellow-400">{xp} XP</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="text-[var(--color-neon-cyan)] fill-[var(--color-neon-cyan)]" />
          <span className="font-bold text-xl text-[var(--color-neon-cyan)]">{stars} Stars</span>
        </div>
      </div>

      <div className="glass-panel p-8 md:p-12 rounded-3xl w-full max-w-2xl relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-2 bg-[var(--color-galaxy-700)]">
          <motion.div 
            className="h-full bg-[var(--color-neon-purple)]"
            initial={{ width: 0 }}
            animate={{ width: `${(currentQ / quizData.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {!isFinished ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex flex-col text-center"
            >
              <span className="text-[var(--color-neon-cyan)] font-bold mb-4">Question {currentQ + 1}</span>
              <h3 className="text-2xl font-medium mb-8 text-white">{quizData[currentQ].q}</h3>

              <div className="flex flex-col gap-4">
                {quizData[currentQ].options.map((opt, idx) => {
                  let btnClass = "border-[var(--color-galaxy-700)] hover:border-[var(--color-neon-cyan)] text-gray-300 hover:text-white bg-[var(--color-galaxy-800)]";
                  
                  if (selectedOpt !== null) {
                    if (idx === quizData[currentQ].ans) {
                      btnClass = "border-green-500 bg-green-500/20 text-green-400 font-bold";
                    } else if (idx === selectedOpt) {
                      btnClass = "border-red-500 bg-red-500/20 text-red-400";
                    } else {
                      btnClass = "border-[var(--color-galaxy-700)] text-gray-500 opacity-50";
                    }
                  }

                  return (
                    <motion.button
                      key={idx}
                      whileHover={selectedOpt === null ? { scale: 1.02 } : {}}
                      whileTap={selectedOpt === null ? { scale: 0.98 } : {}}
                      onClick={() => handleOptionClick(idx)}
                      disabled={selectedOpt !== null}
                      className={`p-4 rounded-xl border-2 transition-all flex justify-between items-center ${btnClass}`}
                    >
                      <span className="text-left text-lg">{opt}</span>
                      {selectedOpt !== null && idx === quizData[currentQ].ans && (
                        <CheckCircle2 className="text-green-400" />
                      )}
                      {selectedOpt !== null && idx === selectedOpt && idx !== quizData[currentQ].ans && (
                        <XCircle className="text-red-400" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center py-8"
          >
            <ShieldAlert size={80} className="text-[var(--color-neon-cyan)] mb-6 drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]" />
            <h3 className="text-3xl font-bold text-white mb-4">Assessment Complete!</h3>
            <p className="text-xl text-gray-300">You earned {xp} XP and {stars} Stars.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default QuizSection;

