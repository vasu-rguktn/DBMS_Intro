import { useState, useEffect } from 'react';
import ConstraintsHeroSection from './components/ConstraintsHeroSection';
import ConstraintsQuiz from './components/ConstraintsQuiz';
import ConstraintsResults from './components/ConstraintsResults';

type QuizState = 'start' | 'playing' | 'completed';

export type UserStats = {
  score: number;
  xp: number;
  correctAnswers: number;
  unlockedConstraints: string[];
};

const Lecture1 = () => {
  const [gameState, setGameState] = useState<QuizState>('start');
  const [stats, setStats] = useState<UserStats>({
    score: 0,
    xp: 0,
    correctAnswers: 0,
    unlockedConstraints: []
  });

  // Load saved state if any
  useEffect(() => {
    const savedStats = localStorage.getItem('dbms_constraints_stats');
    if (savedStats) {
      // Optional: you can restore stats or keep it simple and start fresh.
      // We'll keep it fresh for each session but save high score if needed later.
    }
  }, []);

  const handleStart = () => setGameState('playing');

  const handleComplete = (finalStats: UserStats) => {
    setStats(finalStats);
    setGameState('completed');
    localStorage.setItem('dbms_constraints_stats', JSON.stringify(finalStats));
  };

  const handleRestart = () => {
    setStats({
      score: 0,
      xp: 0,
      correctAnswers: 0,
      unlockedConstraints: []
    });
    setGameState('playing');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {gameState === 'start' && <ConstraintsHeroSection onStart={handleStart} />}
      {gameState === 'playing' && <ConstraintsQuiz onComplete={handleComplete} />}
      {gameState === 'completed' && <ConstraintsResults stats={stats} onRestart={handleRestart} />}
    </div>
  );
};

export default Lecture1;
