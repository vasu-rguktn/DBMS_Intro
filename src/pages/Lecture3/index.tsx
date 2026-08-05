import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Star, HelpCircle, ArrowRight, Table } from 'lucide-react';
import { initDatabase, validateAndRunSql } from './utils/SqlEngine';
import type { TutorFeedback } from './utils/SqlEngine';
import { missionsData } from './data/MissionsData';
import SqlPlayground from './components/SqlPlayground';
import SqlTutorFeedback from './components/SqlTutorFeedback';
import SqlCompletion from './components/SqlCompletion';
import { useNavigate } from 'react-router-dom';

export default function Lecture3() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState<'hero' | 'mission' | 'completion'>('hero');
  const [dbLoading, setDbLoading] = useState(true);
  
  // Mission state
  const [currentIdx, setCurrentIdx] = useState(0);
  const currentMission = missionsData[currentIdx];
  
  // Scoring / Gamification
  const [totalXp, setTotalXp] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [hintsUsedCount, setHintsUsedCount] = useState(0);
  const [activeHintIdx, setActiveHintIdx] = useState(-1);
  const [accuracyList, setAccuracyList] = useState<number[]>([]);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [timeSpent, setTimeSpent] = useState<number>(0);

  // Playground & Editor feedback
  const [tutorFeedback, setTutorFeedback] = useState<TutorFeedback | null>(null);
  const [isMissionSolved, setIsMissionSolved] = useState(false);
  const [savedQueries, setSavedQueries] = useState<Record<number, string>>({});

  // Quiz States (specifically for Mission 8)
  const [currentQuizQuestionIdx, setCurrentQuizQuestionIdx] = useState(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);
  const [isQuizQuestionSolved, setIsQuizQuestionSolved] = useState(false);

  // Inspector state
  const [activeInspectorTable, setActiveInspectorTable] = useState<string>('Users');
  const [inspectorData, setInspectorData] = useState<{ columns: string[]; rows: any[][] } | null>(null);

  // Load saved progress from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('sql_universe_progress');
    if (saved) {
      try {
        const progress = JSON.parse(saved);
        if (typeof progress.currentIdx === 'number') setCurrentIdx(progress.currentIdx);
        if (typeof progress.totalXp === 'number') setTotalXp(progress.totalXp);
        if (Array.isArray(progress.unlockedBadges)) setUnlockedBadges(progress.unlockedBadges);
        if (Array.isArray(progress.accuracyList)) setAccuracyList(progress.accuracyList);
        if (typeof progress.startTime === 'number') setStartTime(progress.startTime);
        if (progress.savedQueries) setSavedQueries(progress.savedQueries);
      } catch (e) {
        console.error("Failed to load SQL Universe progress:", e);
      }
    }
  }, []);

  // Save progress to localStorage whenever state changes
  useEffect(() => {
    if (startTime === 0 && currentIdx === 0 && totalXp === 0) return;
    const progress = {
      currentIdx,
      totalXp,
      unlockedBadges,
      accuracyList,
      startTime,
      savedQueries
    };
    localStorage.setItem('sql_universe_progress', JSON.stringify(progress));
  }, [currentIdx, totalXp, unlockedBadges, accuracyList, startTime, savedQueries]);

  const handleResetProgress = () => {
    localStorage.removeItem('sql_universe_progress');
    setCurrentIdx(0);
    setTotalXp(0);
    setAttempts(0);
    setHintsUsedCount(0);
    setActiveHintIdx(-1);
    setAccuracyList([]);
    setUnlockedBadges([]);
    setStartTime(0);
    setTimeSpent(0);
    setSavedQueries({});
    setTutorFeedback(null);
    setIsMissionSolved(false);
    setScreen('hero');
  };

  useEffect(() => {
    if (screen === 'mission') {
      initDatabase().then(db => {
        try {
          const res = db.exec(`SELECT * FROM ${activeInspectorTable} LIMIT 10;`);
          if (res.length > 0) {
            setInspectorData({
              columns: res[0].columns,
              rows: res[0].values
            });
          }
        } catch (e) {
          console.error(e);
        }
      }).catch(err => console.error(err));
    }
  }, [activeInspectorTable, screen]);

  // Initialize SQLite database
  useEffect(() => {
    initDatabase()
      .then(() => setDbLoading(false))
      .catch(err => {
        console.error("Failed to load SQLite db: ", err);
        setDbLoading(false);
      });
  }, []);

  // Time spent tracking
  useEffect(() => {
    if (screen === 'mission' && startTime === 0) {
      setStartTime(Date.now());
    }
  }, [screen, startTime]);

  const handleStartMissions = () => {
    setScreen('mission');
    setStartTime(Date.now());
  };

  const handleNextMission = () => {
    // Reset state for new mission
    if (currentIdx < missionsData.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setAttempts(0);
      setHintsUsedCount(0);
      setActiveHintIdx(-1);
      setTutorFeedback(null);
      setIsMissionSolved(false);
      
      // Reset quiz state
      setCurrentQuizQuestionIdx(0);
      setQuizSelectedOption(null);
      setQuizFeedback(null);
      setIsQuizQuestionSolved(false);
    } else {
      // Calculate final statistics and go to completion screen
      const elapsed = startTime > 0 ? Math.floor((Date.now() - startTime) / 1000) : 180;
      setTimeSpent(elapsed);
      setScreen('completion');
      
      // Unlock final badge
      if (!unlockedBadges.includes('SQL Explorer')) {
        setUnlockedBadges(prev => [...prev, 'SQL Explorer']);
      }
    }
  };

  const handleHint = () => {
    if (activeHintIdx < currentMission.hints.length - 1) {
      const nextIdx = activeHintIdx + 1;
      setActiveHintIdx(nextIdx);
      setHintsUsedCount(prev => prev + 1);
      // Deduct 10 XP for hint usage
      setTotalXp(prev => Math.max(0, prev - 10));
    }
  };

  // Sound generator using Web Audio API for rewarding sounds
  const playRewardSound = (type: 'success' | 'failure') => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      if (type === 'success') {
        // High pitched pleasant double chime
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        osc.start();
        osc.frequency.setValueAtTime(880.00, audioCtx.currentTime + 0.15); // A5
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
        osc.stop(audioCtx.currentTime + 0.4);
      } else {
        // Lower buzzing sound
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.stop(audioCtx.currentTime + 0.3);
      }
    } catch (e) {
      console.warn("AudioContext failed to trigger sound:", e);
    }
  };

  // Evaluate Mission SQL Execution result to verify correctness
  const checkMissionCorrectness = (query: string, feedback: TutorFeedback): boolean => {
    if (!feedback.success || !feedback.result) return false;
    const { columns, rows } = feedback.result;
    const queryNormalized = query.toLowerCase().trim().replace(/;$/, '');

    switch (currentMission.id) {
      case 1: // SELECT * FROM Users
        return queryNormalized.includes('select') && queryNormalized.includes('*') && queryNormalized.includes('users') && rows.length >= 10;
      
      case 2: // SELECT Name FROM Users
        return queryNormalized.includes('name') && !queryNormalized.includes('*') && !queryNormalized.includes('country') && columns.length === 1 && columns[0] === 'Name';
      
      case 3: // SELECT * FROM Users WHERE Country = 'USA'
        return queryNormalized.includes('where') && queryNormalized.includes('country') && queryNormalized.includes('usa') && rows.length === 3;
      
      case 4: // SELECT * FROM Users ORDER BY Name ASC
        return queryNormalized.includes('order') && queryNormalized.includes('by') && queryNormalized.includes('name') && (queryNormalized.includes('asc') || !queryNormalized.includes('desc')) && rows[0][1] === 'Aditya Kumar';
      
      case 5: // SELECT COUNT(*) FROM Users
        return queryNormalized.includes('count') && queryNormalized.includes('users') && rows.length === 1;
      
      case 6: // SELECT * FROM Users WHERE LastSeen IS NULL
        return queryNormalized.includes('lastseen') && queryNormalized.includes('is') && queryNormalized.includes('null') && rows.length === 3;
      
      case 7: // Subquery: Messages longer than average
        return queryNormalized.includes('messages') && queryNormalized.includes('length') && queryNormalized.includes('avg') && rows.length === 4;
      
      case 9: // CREATE VIEW IndianUsers
        return queryNormalized.includes('create') && queryNormalized.includes('view') && queryNormalized.includes('indianusers') && queryNormalized.includes('india');
      
      case 10: // JOIN Messages and Users
        return queryNormalized.includes('join') && queryNormalized.includes('messages') && queryNormalized.includes('users') && (queryNormalized.includes('senderid') || queryNormalized.includes('userid')) && columns.includes('Name') && columns.includes('Content');

      default:
        return false;
    }
  };

  const handleExecuteSql = (code: string) => {
    if (isMissionSolved) return;

    const feedback = validateAndRunSql(code, currentMission.id);
    const solved = checkMissionCorrectness(code, feedback);

    if (solved) {
      setIsMissionSolved(true);
      playRewardSound('success');
      
      // Calculate XP
      let missionXp = 100;
      if (attempts === 1) missionXp = 80;
      else if (attempts >= 2) missionXp = 60;
      
      // Apply hint deduction
      const finalXp = Math.max(20, missionXp - (hintsUsedCount * 10));
      setTotalXp(prev => prev + finalXp);
      
      // Calculate Accuracy percentage
      const acc = Math.max(0, 100 - (attempts * 20));
      setAccuracyList(prev => [...prev, acc]);

      // Unlock special badge for perfect mission
      if (attempts === 0 && hintsUsedCount === 0 && !unlockedBadges.includes('Gold Badge')) {
        setUnlockedBadges(prev => [...prev, 'Gold Badge']);
      }

      setTutorFeedback({
        ...feedback,
        message: feedback.message || "Perfect! You solved the mission challenge. Ready to move to the next stage?"
      });
    } else {
      setAttempts(prev => prev + 1);
      playRewardSound('failure');
      if (feedback.success) {
        setTutorFeedback({
          ...feedback,
          success: false,
          message: "Your SQL query executed successfully, but it does not meet the specific requirements of the challenge. Read the 'Your Challenge' instructions and try again!",
          tip: "Check if you selected the right columns (e.g. '*' vs 'Name'), tables, or correct conditions (e.g. Marks > 80)."
        });
      } else {
        setTutorFeedback(feedback);
      }
    }
  };

  // Quiz submission handler (Mission 8)
  const handleQuizAnswer = (optionIdx: number) => {
    if (isQuizQuestionSolved) return;
    setQuizSelectedOption(optionIdx);

    const question = currentMission.quizQuestions![currentQuizQuestionIdx];
    if (optionIdx === question.correctIndex) {
      setQuizFeedback(`Correct! ${question.explanation}`);
      setIsQuizQuestionSolved(true);
      playRewardSound('success');

      // Check if all questions are completed
      if (currentQuizQuestionIdx === currentMission.quizQuestions!.length - 1) {
        setIsMissionSolved(true);
        // Calculate XP
        let quizXp = 100;
        const totalAttempts = attempts;
        if (totalAttempts === 1) quizXp = 80;
        else if (totalAttempts >= 2) quizXp = 60;
        setTotalXp(prev => prev + quizXp);
        setAccuracyList(prev => [...prev, Math.max(20, 100 - (totalAttempts * 20))]);
      }
    } else {
      setAttempts(prev => prev + 1);
      setQuizFeedback("Incorrect answer. Read the explanation and try again!");
      playRewardSound('failure');
    }
  };

  const handleNextQuizQuestion = () => {
    setCurrentQuizQuestionIdx(prev => prev + 1);
    setQuizSelectedOption(null);
    setQuizFeedback(null);
    setIsQuizQuestionSolved(false);
  };

  // Compute final accuracy average
  const getAverageAccuracy = () => {
    if (accuracyList.length === 0) return 100;
    const sum = accuracyList.reduce((a, b) => a + b, 0);
    return Math.round(sum / accuracyList.length);
  };

  return (
    <div className="min-h-screen text-white relative">
      <AnimatePresence mode="wait">
        
        {/* Screen 1: Hero Section */}
        {screen === 'hero' && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
          >
            {/* Space-inspired glow effects */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="z-10 max-w-4xl mx-auto text-center glass-panel p-12 rounded-[40px] border border-white/10 shadow-2xl relative bg-galaxy-800/80 backdrop-blur-md">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="mb-8 inline-block"
              >
                <div className="p-5 bg-gradient-to-br from-[var(--color-neon-cyan)] to-blue-600 rounded-3xl shadow-[0_0_30px_rgba(0,240,255,0.4)]">
                  <Database className="w-16 h-16 text-black" />
                </div>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-300 to-purple-400">
                UNIT-3: SQL Universe
              </h1>
              
              <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 italic">
                "Learn to communicate with databases like a real Software Engineer."
              </p>

              <div className="p-6 bg-black/40 border border-white/5 rounded-2xl max-w-md mx-auto mb-10 text-left font-mono text-sm text-cyan-300 shadow-inner">
                <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">// Mission Checklist</div>
                <div>📡 10 Interactive SQL Missions</div>
                <div>🚀 Built-in Web SQLite Database</div>
                <div>💡 Intelligent Tutor Guidance</div>
                <div>🏆 Gold Badges & Certification</div>
              </div>

              {dbLoading ? (
                <div className="text-cyan-300 font-mono animate-pulse">Initializing SQLite database engine...</div>
              ) : (
                <div className="flex flex-col gap-4 items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 240, 255, 0.6)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStartMissions}
                    className="px-10 py-5 bg-gradient-to-r from-[var(--color-neon-cyan)] to-blue-600 rounded-full font-bold text-2xl text-black shadow-lg flex items-center justify-center mx-auto gap-3 cursor-pointer"
                  >
                    {currentIdx > 0 ? 'Resume SQL Universe' : 'Enter SQL Universe'} <ArrowRight className="w-6 h-6" />
                  </motion.button>
                  {currentIdx > 0 && (
                    <button
                      onClick={handleResetProgress}
                      className="text-xs text-red-400 hover:text-red-300 underline font-mono cursor-pointer transition-colors"
                    >
                      Reset Progress & Start Over
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Screen 2: Missions Workflow */}
        {screen === 'mission' && (
          <motion.div
            key="mission"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 md:p-8 max-w-7xl mx-auto flex flex-col gap-6"
          >
            {/* Header / Mission tracker */}
            <div className="flex flex-wrap justify-between items-center gap-4 bg-galaxy-800/60 border border-white/5 p-4 rounded-2xl backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/20 text-cyan-300 rounded-lg">
                  <Database size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-white text-lg">Mission {currentMission.id} of 10</h2>
                  <p className="text-xs text-gray-400">{currentMission.title}</p>
                </div>
              </div>

              {/* Progress timeline dots */}
              <div className="hidden lg:flex gap-1">
                {missionsData.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentIdx(i);
                      setAttempts(0);
                      setHintsUsedCount(0);
                      setActiveHintIdx(-1);
                      setTutorFeedback(null);
                      setIsMissionSolved(false);
                      setCurrentQuizQuestionIdx(0);
                      setQuizSelectedOption(null);
                      setQuizFeedback(null);
                      setIsQuizQuestionSolved(false);
                    }}
                    title={`Jump to Mission ${i + 1}`}
                    className={`h-2 w-8 rounded-full transition-all duration-300 cursor-pointer ${
                      i < currentIdx
                        ? 'bg-green-500 hover:bg-green-400'
                        : i === currentIdx
                        ? 'bg-[var(--color-neon-cyan)] shadow-[0_0_10px_rgba(0,240,255,0.5)]'
                        : 'bg-white/10 hover:bg-white/30'
                    }`}
                  />
                ))}
              </div>

              {/* Gamification Stats */}
              <div className="flex gap-4 font-mono text-sm">
                <div className="bg-black/30 border border-white/5 px-3 py-1.5 rounded-lg flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-yellow-400 font-bold">{totalXp} XP</span>
                </div>
                {unlockedBadges.includes('Gold Badge') && (
                  <div className="bg-black/30 border border-yellow-500/20 px-3 py-1.5 rounded-lg flex items-center gap-2 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xs font-bold">Gold Medalist</span>
                  </div>
                )}
              </div>
            </div>

            {/* Section 1: Lesson Details */}
            <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 flex flex-col gap-4 bg-galaxy-800/80">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-neon-cyan)]">
                {currentMission.tagline}
              </span>
              <h3 className="text-2xl font-bold">{currentMission.title}</h3>
              
              {/* Markdown Explanation content */}
              <div className="text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap border-t border-white/5 pt-4">
                {currentMission.explanation}
              </div>

              {/* Challenge details */}
              <div className="p-4 bg-cyan-950/20 border border-cyan-500/20 rounded-xl mt-2">
                <span className="text-xs uppercase text-cyan-400 font-bold block mb-1">Your Challenge:</span>
                <p className="text-gray-200 text-sm font-semibold">{currentMission.challenge}</p>
              </div>

            </div>

            {/* Section 2: Database Schema Explorer */}
            <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 flex flex-col gap-6 bg-galaxy-800/80">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Table className="w-6 h-6 text-[var(--color-neon-cyan)]" />
                  <h3 className="font-bold text-xl text-white">Database Schema Explorer</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Users', 'Messages', 'Groups', 'GroupMembers'].map((tableName) => (
                    <button
                      key={tableName}
                      onClick={() => setActiveInspectorTable(tableName)}
                      className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold border transition-all cursor-pointer ${
                        activeInspectorTable === tableName
                          ? 'bg-[var(--color-neon-cyan)] border-[var(--color-neon-cyan)] text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300'
                      }`}
                    >
                      {tableName}
                    </button>
                  ))}
                </div>
              </div>

              {inspectorData ? (
                <div className="flex flex-col gap-4">
                  <div className="text-sm text-[var(--color-neon-purple)] font-mono">
                    Columns: {inspectorData.columns.join(', ')}
                  </div>
                  <div className="overflow-x-auto w-full rounded-xl border border-white/5 bg-black/40">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead>
                        <tr className="bg-white/5 text-gray-300 font-semibold border-b border-white/10 text-xs md:text-sm">
                          {inspectorData.columns.map(col => (
                            <th key={col} className="p-3 md:p-4">{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {inspectorData.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="border-b border-white/5 hover:bg-white/5 transition-colors text-xs md:text-sm">
                            {row.map((val, cIdx) => (
                              <td key={cIdx} className="p-3 md:p-4 font-mono text-cyan-300">
                                {val === null ? (
                                  <span className="text-red-400/60 italic font-sans text-xs">NULL</span>
                                ) : (
                                  String(val)
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center p-8 text-gray-500 font-mono">
                  Loading table data...
                </div>
              )}
            </div>

            {/* Show Active Hint Card (Below Table, Above SQL Editor) */}
            {activeHintIdx >= 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-5 bg-purple-950/20 border border-purple-500/30 rounded-2xl flex gap-3 items-start my-4"
              >
                <HelpCircle className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-bold text-purple-300 block mb-1">Hint {activeHintIdx + 1}</span>
                  <p className="text-gray-300 text-sm leading-relaxed">{currentMission.hints[activeHintIdx]}</p>
                </div>
              </motion.div>
            )}

            {/* Section 3: Interactive SQL Playground / Sandbox */}
            <div className="w-full flex flex-col gap-6">
              {currentMission.type === 'quiz' ? (
                /* RENDER QUIZ INTERFACE (Mission 8) */
                <div className="glass-panel p-6 md:p-10 rounded-3xl border border-white/10 flex flex-col gap-6 bg-galaxy-800/80">
                  <h3 className="text-2xl font-bold">Constraints Mini-Quiz</h3>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                    <span className="text-xs text-gray-400 uppercase tracking-widest block mb-2">Question {currentQuizQuestionIdx + 1} of 3</span>
                    <p className="text-lg font-medium">{currentMission.quizQuestions![currentQuizQuestionIdx].question}</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    {currentMission.quizQuestions![currentQuizQuestionIdx].options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleQuizAnswer(oIdx)}
                        disabled={quizSelectedOption !== null}
                        className={`w-full p-4 rounded-xl text-left font-bold text-sm md:text-base border transition-all cursor-pointer ${
                          quizSelectedOption === oIdx
                            ? oIdx === currentMission.quizQuestions![currentQuizQuestionIdx].correctIndex
                              ? 'bg-green-500/20 border-green-500 text-green-300'
                              : 'bg-red-500/20 border-red-500 text-red-300'
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {quizFeedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl border text-sm ${
                        isQuizQuestionSolved ? 'bg-green-950/20 border-green-500/30 text-green-300' : 'bg-red-950/20 border-red-500/30 text-red-300'
                      }`}
                    >
                      {quizFeedback}
                    </motion.div>
                  )}

                  {isQuizQuestionSolved && currentQuizQuestionIdx < currentMission.quizQuestions!.length - 1 && (
                    <button
                      onClick={handleNextQuizQuestion}
                      className="px-6 py-3 bg-gradient-to-r from-[var(--color-neon-cyan)] to-blue-600 text-black font-bold rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 self-end cursor-pointer"
                    >
                      Next Question <ArrowRight size={18} />
                    </button>
                  )}
                </div>
              ) : (
                /* RENDER SQL EDITOR (All other missions) */
                <SqlPlayground
                  initialCode={savedQueries[currentMission.id] !== undefined ? savedQueries[currentMission.id] : (currentMission.sqlTemplate || '')}
                  onExecute={handleExecuteSql}
                  onHint={handleHint}
                  activeHintIndex={activeHintIdx}
                  maxHints={currentMission.hints.length}
                  onChange={(code) => {
                    setSavedQueries(prev => ({
                      ...prev,
                      [currentMission.id]: code
                    }));
                  }}
                />
              )}

              {/* Intelligent Tutor Feedback Section */}
              {currentMission.type !== 'quiz' && tutorFeedback && (
                <SqlTutorFeedback feedback={tutorFeedback} challenge={currentMission.challenge} />
              )}

              {/* Skip / Continue Controls */}
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                {!isMissionSolved && (
                  <button
                    onClick={handleNextMission}
                    className="flex-1 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 font-extrabold text-lg rounded-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Skip Mission
                  </button>
                )}
                {isMissionSolved && (
                  <motion.button
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    onClick={handleNextMission}
                    className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-extrabold text-lg rounded-2xl hover:from-green-500 hover:to-emerald-500 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 cursor-pointer"
                  >
                    {currentIdx < missionsData.length - 1 ? 'Go to Next Mission' : 'Complete SQL Universe Journey'} 
                    <ArrowRight size={20} />
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Screen 3: Completion Certificate Screen */}
        {screen === 'completion' && (
          <SqlCompletion
            xp={totalXp}
            accuracy={getAverageAccuracy()}
            timeSpentSeconds={timeSpent}
            onContinue={() => navigate('/lecture/8')}
          />
        )}

      </AnimatePresence>
    </div>
  );
}
