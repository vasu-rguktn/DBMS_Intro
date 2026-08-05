import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Clock, Target, Award, ArrowRight, Zap, Shield, Database } from 'lucide-react';
import Confetti from 'react-confetti';
import SqlPlayground from './SqlPlayground';
import { validateAndRunSql } from '../utils/SqlEngine';

interface SqlCompletionProps {
  xp: number;
  accuracy: number;
  timeSpentSeconds: number;
  onContinue: () => void;
}

export default function SqlCompletion({ xp, accuracy, timeSpentSeconds, onContinue }: SqlCompletionProps) {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [customQuery, setCustomQuery] = useState('SELECT Users.Name, Messages.Content \nFROM Messages \nINNER JOIN Users ON Messages.SenderID = Users.UserID;');
  const [customFeedback, setCustomFeedback] = useState<{ success: boolean; isMedium: boolean; message: string; reasons: string[] } | null>(null);
  const [customResult, setCustomResult] = useState<{ columns: string[]; rows: any[][] } | null>(null);

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  const isMediumLevelQuery = (query: string): { passes: boolean; reasons: string[] } => {
    const q = query.toLowerCase();
    const reasons: string[] = [];
    
    if (q.includes('join')) {
      reasons.push("Table JOINs");
    }
    if (q.includes('group by')) {
      reasons.push("GROUP BY grouping");
    }
    if (q.includes('having')) {
      reasons.push("HAVING aggregate filter");
    }
    if (/\bselect\b.*?\bselect\b/i.test(q)) {
      reasons.push("Nested Subquery");
    }
    if (q.includes('create view')) {
      reasons.push("VIEW creation");
    }
    if (q.includes('avg(') || q.includes('sum(') || q.includes('count(') || q.includes('max(') || q.includes('min(')) {
      if (q.includes('where') || q.includes('group by') || q.includes('order by')) {
        reasons.push("Aggregate + Filtering/Sorting");
      }
    }
    if ((q.match(/\band\b/g) || []).length + (q.match(/\bor\b/g) || []).length >= 1) {
      if (q.includes('where')) {
        reasons.push("Compound conditions (AND/OR)");
      }
    }
    
    return {
      passes: reasons.length > 0,
      reasons
    };
  };

  const handleExecuteCustomQuery = (code: string) => {
    setCustomQuery(code);
    const feedback = validateAndRunSql(code, 0);

    if (feedback.success && feedback.result) {
      const evaluation = isMediumLevelQuery(code);
      setCustomFeedback({
        success: true,
        isMedium: evaluation.passes,
        message: feedback.message || "Query executed correctly! Check the results table below.",
        reasons: evaluation.reasons
      });
      setCustomResult({
        columns: feedback.result.columns,
        rows: feedback.result.rows
      });
    } else {
      setCustomFeedback({
        success: false,
        isMedium: false,
        message: feedback.message || "An unexpected SQL syntax error occurred.",
        reasons: []
      });
      setCustomResult(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden"
    >
      <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={300} />

      <div className="max-w-4xl w-full z-10 text-center flex flex-col items-center justify-center py-8">
        {/* Animated Trophy Banner */}
        <motion.div
          initial={{ scale: 0.5, rotate: -15, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.4, delay: 0.2 }}
          className="relative mb-6"
        >
          <div className="absolute inset-0 bg-yellow-500 blur-3xl opacity-30 rounded-full animate-pulse"></div>
          <Trophy className="w-28 h-28 text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.6)]" />
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-600 tracking-tight">
          🎉 Congratulations!
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-white leading-relaxed">
          You completed <span className="text-[var(--color-neon-cyan)]">UNIT-3 — Explore SQL Universe</span>!
        </h2>

        <p className="text-gray-400 max-w-lg mb-10">
          You've successfully solved all 10 interactive SQL missions and proved you can query database tables like a software engineer.
        </p>

        {/* Certificate Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-2xl glass-panel p-8 rounded-[32px] border-yellow-500/30 bg-gradient-to-br from-galaxy-800 to-black/60 shadow-[0_0_50px_rgba(250,204,21,0.1)] relative overflow-hidden mb-10 text-center"
        >
          {/* Certificate Badge watermark */}
          <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
            <Award size={200} />
          </div>

          <div className="border border-yellow-500/20 p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <Shield className="w-8 h-8 text-yellow-500" />
              <span className="text-[10px] tracking-widest font-mono text-gray-500 uppercase">DBMS GALAXY PLATFORM</span>
            </div>

            <h3 className="font-serif text-3xl font-bold text-yellow-400 mb-2 tracking-wide">SQL EXPLORER CERTIFICATE</h3>
            <p className="text-sm text-gray-400 font-mono italic mb-8">This certifies that you have completed basic training in SQL database queries.</p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                <Zap className="w-5 h-5 text-yellow-400 mx-auto mb-2" />
                <div className="text-xs text-gray-400">Total XP</div>
                <div className="text-lg font-bold text-white mt-1">{xp} XP</div>
              </div>
              <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                <Target className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                <div className="text-xs text-gray-400">Accuracy</div>
                <div className="text-lg font-bold text-white mt-1">{accuracy}%</div>
              </div>
              <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                <Clock className="w-5 h-5 text-purple-400 mx-auto mb-2" />
                <div className="text-xs text-gray-400">Time Spent</div>
                <div className="text-sm font-bold text-white mt-2 truncate">{formatTime(timeSpentSeconds)}</div>
              </div>
              <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                <Star className="w-5 h-5 text-green-400 mx-auto mb-2" />
                <div className="text-xs text-gray-400">Badge Earned</div>
                <div className="text-sm font-bold text-green-400 mt-2">SQL Explorer</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Graduation Sandbox Challenge */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-2xl glass-panel p-6 rounded-[32px] border-cyan-500/20 bg-galaxy-800/80 shadow-[0_0_40px_rgba(0,240,255,0.05)] text-left mb-10 flex flex-col gap-4"
        >
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Database className="w-6 h-6 text-[var(--color-neon-cyan)]" />
            <h3 className="text-xl font-bold text-white">Graduation Challenge: Custom Sandbox</h3>
          </div>
          <p className="text-sm text-gray-300">
            Show off your database skills! Write any custom SQL query using our schema. 
            Try to write a <strong className="text-cyan-300">medium-level query</strong> (using features like <code className="text-cyan-300 font-mono">JOIN</code>, <code className="text-cyan-300 font-mono">GROUP BY</code>, <code className="text-cyan-300 font-mono">HAVING</code>, compound conditions, or subqueries).
          </p>

          <SqlPlayground
            initialCode={customQuery}
            onExecute={handleExecuteCustomQuery}
            onHint={() => {}}
            activeHintIndex={-1}
            maxHints={0}
          />

          {customFeedback && (
            <div className={`p-4 rounded-xl border text-sm flex gap-3 ${
              customFeedback.success 
                ? customFeedback.isMedium 
                  ? 'bg-green-950/20 border-green-500/30 text-green-300' 
                  : 'bg-yellow-950/20 border-yellow-500/30 text-yellow-300'
                : 'bg-red-950/20 border-red-500/30 text-red-300'
            }`}>
              {customFeedback.success ? (
                customFeedback.isMedium ? (
                  <div>
                    <span className="font-bold block mb-1">🏆 Outstanding! Medium Query Verified:</span>
                    <p>{customFeedback.message}</p>
                    <div className="mt-2 text-xs text-green-400 font-mono">
                      Detected: {customFeedback.reasons.join(', ')}
                    </div>
                  </div>
                ) : (
                  <div>
                    <span className="font-bold block mb-1">✅ Query Executed successfully:</span>
                    <p>{customFeedback.message}</p>
                    <p className="mt-1 text-xs text-yellow-400/80 italic">Tip: Level up your query by adding a JOIN, GROUP BY, subquery, or compound filters to achieve the "Medium" validation rating!</p>
                  </div>
                )
              ) : (
                <div>
                  <span className="font-bold block mb-1">❌ SQL Syntax / Tutor Error:</span>
                  <p>{customFeedback.message}</p>
                </div>
              )}
            </div>
          )}

          {/* Result Table Preview */}
          {customResult && customResult.columns.length > 0 && (
            <div className="overflow-x-auto w-full rounded-xl border border-white/5 bg-black/40 max-h-[160px] overflow-y-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="bg-white/5 text-gray-300 font-semibold border-b border-white/10 text-xs">
                    {customResult.columns.map((col: string) => (
                      <th key={col} className="p-2">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {customResult.rows.map((row: any[], rIdx: number) => (
                    <tr key={rIdx} className="border-b border-white/5 hover:bg-white/5 transition-colors text-xs">
                      {row.map((val, cIdx) => (
                        <td key={cIdx} className="p-2 font-mono text-cyan-300">
                          {val === null ? <span className="text-red-400/60 italic font-sans">NULL</span> : String(val)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 240, 255, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className="px-10 py-5 bg-gradient-to-r from-[var(--color-neon-cyan)] to-blue-600 text-black font-bold rounded-full text-xl flex items-center gap-3 shadow-lg active:scale-[0.98] transition-all cursor-pointer"
        >
          Continue to Relational Algebra
          <ArrowRight size={24} />
        </motion.button>
      </div>
    </motion.div>
  );
}
