import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Database, ChevronDown } from 'lucide-react';

const questions = [
  {
    question: "How did you come to college?",
    options: ["Walk", "Bike", "Bus", "Car"],
    reveal: "Transport systems use databases for schedules, tickets, and routes."
  },
  {
    question: "Did you use UPI today?",
    options: ["Yes", "No"],
    reveal: "Every single payment transaction uses massive banking databases."
  },
  {
    question: "Which app did you open first?",
    options: ["Instagram", "WhatsApp", "YouTube", "Spotify", "Gmail"],
    reveal: "Every app stores billions of user records, preferences, and content in databases."
  },
  {
    question: "You upload a selfie. What gets stored?",
    options: ["Photo only", "Photo + Caption", "Everything"],
    reveal: "Photos, captions, comments, likes, hashtags, timestamps, locations all live in databases."
  },
  {
    question: "Where is your WhatsApp message stored?",
    options: ["Phone only", "Cloud", "Database", "Both Cloud and Database"],
    reveal: "Your messages are stored in local databases on your phone and cloud databases."
  },
  {
    question: "How does YouTube search videos instantly?",
    options: ["Random guessing", "Database search"],
    reveal: "YouTube relies on highly optimized database indexes to search billions of videos in milliseconds."
  },
  {
    question: "Swiggy knows your address because...",
    options: ["Database", "GPS"],
    reveal: "While GPS gets the location, the address is saved in Swiggy's user database."
  },
  {
    question: "Where is your Gmail login information stored?",
    options: ["Browser", "Secure Database"],
    reveal: "Authentication relies on secure, encrypted databases."
  },
  {
    question: "Which of these uses a database?",
    options: ["Bank", "Hospital", "Instagram", "Amazon", "College ERP"],
    reveal: "All of them! Modern society cannot function without databases."
  },
  {
    question: "How many databases do you think you interacted with today?",
    options: ["0", "3", "10", "20+"],
    reveal: "Probably dozens. Every website, app, and service you use is powered by a DBMS."
  }
];

const DailyLifeSection = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const handleOptionClick = () => {
    setRevealed(true);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setRevealed(false);
    } else {
      const nextSection = document.getElementById('chaos-section');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="daily-life-section" className="min-h-screen flex flex-col items-center justify-center relative px-4 py-20">
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center glow-text-cyan">
        How Many Databases Did You Use Today?
      </h2>

      <div className="glass-panel p-8 md:p-12 rounded-3xl w-full max-w-3xl relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-galaxy-700)]">
          <motion.div 
            className="h-full bg-[var(--color-neon-cyan)]"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQ) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center"
          >
            <span className="text-[var(--color-neon-purple)] font-bold mb-4 block">Question {currentQ + 1} of {questions.length}</span>
            <h3 className="text-2xl md:text-3xl font-semibold mb-8">{questions[currentQ].question}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
              {questions[currentQ].options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleOptionClick}
                  disabled={revealed}
                  className={`p-4 rounded-xl border transition-all text-lg font-medium
                    ${revealed ? 'border-[var(--color-galaxy-700)] bg-[var(--color-galaxy-800)] text-gray-400 opacity-50' : 'border-[var(--color-neon-cyan)] hover:bg-[var(--color-neon-cyan)] hover:text-black glass-panel'}`}
                >
                  {opt}
                </motion.button>
              ))}
            </div>

            {revealed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full bg-[var(--color-galaxy-800)] border border-[var(--color-neon-purple)] rounded-xl p-6 mb-8 flex items-start gap-4 text-left"
              >
                <Database className="text-[var(--color-neon-purple)] flex-shrink-0" size={32} />
                <p className="text-lg text-gray-200">{questions[currentQ].reveal}</p>
              </motion.div>
            )}

          </motion.div>
        </AnimatePresence>

        <div className="flex justify-end mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            disabled={!revealed}
            className={`px-8 py-3 rounded-full flex items-center gap-2 font-bold transition-all
              ${revealed ? 'bg-[var(--color-neon-cyan)] text-black shadow-[0_0_15px_rgba(0,240,255,0.5)]' : 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'}`}
          >
            {currentQ < questions.length - 1 ? 'Next' : 'Continue'}
            {currentQ < questions.length - 1 ? <ChevronRight size={20} /> : <ChevronDown size={20} />}
          </motion.button>
        </div>

      </div>
    </section>
  );
};

export default DailyLifeSection;

