import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { UserStats } from '../index';
import { constraintsQuizData } from '../../../data/constraintsQuizData';
import { Trophy, Star, Target, RotateCcw, ChevronRight, BookOpen, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  stats: UserStats;
  onRestart: () => void;
}

const ConstraintsResults = ({ stats, onRestart }: Props) => {
  const navigate = useNavigate();
  const [showReview, setShowReview] = useState(false);
  
  const totalQuestions = constraintsQuizData.length;
  const accuracy = Math.round((stats.score / totalQuestions) * 100);
  
  let achievement = "Database Learner";
  let colorClass = "from-blue-500 to-cyan-500";
  
  if (accuracy >= 90) {
    achievement = "Database Guardian";
    colorClass = "from-yellow-400 to-orange-500";
  } else if (accuracy >= 70) {
    achievement = "Constraint Explorer";
    colorClass = "from-purple-500 to-pink-500";
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-20 px-4 relative">
      
      {/* Confetti / background glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r ${colorClass} opacity-20 blur-[150px] rounded-full pointer-events-none`}></div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="z-10 w-full max-w-3xl glass-panel p-8 md:p-12 rounded-[40px] border border-gray-700 shadow-2xl relative overflow-hidden text-center bg-[var(--color-galaxy-900)]/80"
      >
        <h2 className="text-4xl md:text-5xl font-black mb-2 text-white">Challenge Complete!</h2>
        <p className="text-xl text-gray-400 mb-10">You've unlocked the secrets of Database Constraints.</p>

        {/* Achievement Badge */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`inline-flex flex-col items-center justify-center p-8 rounded-3xl mb-12 bg-gradient-to-b ${colorClass} bg-opacity-10 border border-white/20 shadow-lg`}
        >
          <Trophy size={64} className="text-white drop-shadow-md mb-4" />
          <span className="text-sm uppercase tracking-widest text-white/80 font-bold mb-1">Rank Achieved</span>
          <span className="text-3xl font-black text-white">{achievement}</span>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="bg-black/40 p-6 rounded-2xl border border-gray-700 flex flex-col items-center"
          >
            <Star className="text-yellow-400 mb-2" size={32} />
            <span className="text-3xl font-bold text-white">{stats.xp}</span>
            <span className="text-sm text-gray-400 uppercase tracking-wider">Total XP</span>
          </motion.div>

          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
            className="bg-black/40 p-6 rounded-2xl border border-gray-700 flex flex-col items-center"
          >
            <Target className="text-green-400 mb-2" size={32} />
            <span className="text-3xl font-bold text-white">{accuracy}%</span>
            <span className="text-sm text-gray-400 uppercase tracking-wider">Accuracy</span>
          </motion.div>

          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, type: 'spring' }}
            className="bg-black/40 p-6 rounded-2xl border border-gray-700 flex flex-col items-center col-span-2 md:col-span-1"
          >
            <BookOpen className="text-purple-400 mb-2" size={32} />
            <span className="text-3xl font-bold text-white">{stats.unlockedConstraints.length}</span>
            <span className="text-sm text-gray-400 uppercase tracking-wider">Unlocked</span>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowReview(true)}
            className="px-8 py-4 bg-gray-800 text-white font-bold rounded-full text-lg flex items-center justify-center gap-2 border border-gray-600 hover:border-gray-400 transition-colors"
          >
            <BookOpen size={20} />
            Review Constraints
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRestart}
            className="px-8 py-4 bg-gray-800 text-white font-bold rounded-full text-lg flex items-center justify-center gap-2 border border-gray-600 hover:border-gray-400 transition-colors"
          >
            <RotateCcw size={20} />
            Retry Challenge
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(176, 38, 255, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-gradient-to-r from-[var(--color-neon-purple)] to-[var(--color-neon-blue)] text-white font-bold rounded-full text-lg flex items-center justify-center gap-2"
          >
            Continue Learning
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </motion.div>

      {/* Review Modal */}
      <AnimatePresence>
        {showReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-[var(--color-galaxy-900)] w-full max-w-4xl max-h-[80vh] overflow-y-auto rounded-3xl border border-gray-700 shadow-2xl p-8 relative"
            >
              <button 
                onClick={() => setShowReview(false)}
                className="absolute top-6 right-6 p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              
              <h3 className="text-3xl font-bold text-white mb-8 border-b border-gray-700 pb-4">Constraint Reference</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {constraintsQuizData.map((c, idx) => (
                  <div key={idx} className="bg-black/50 p-6 rounded-2xl border border-gray-800">
                    <h4 className="text-xl font-bold text-[var(--color-neon-cyan)] mb-2">{c.constraint}</h4>
                    <p className="text-gray-300">{c.definition}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default ConstraintsResults;
