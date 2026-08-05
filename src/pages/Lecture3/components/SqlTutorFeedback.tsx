import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Sparkles, BookOpen, ArrowRight } from 'lucide-react';
import type { TutorFeedback } from '../utils/SqlEngine';

interface SqlTutorFeedbackProps {
  feedback: TutorFeedback | null;
  challenge: string;
}

export default function SqlTutorFeedback({ feedback, challenge }: SqlTutorFeedbackProps) {
  if (!feedback) return null;

  const { success, message, highlight, suggestion, tip, result } = feedback;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full max-w-7xl mx-auto rounded-3xl border p-6 md:p-8 overflow-hidden bg-galaxy-800/80 backdrop-blur-md ${
        success
          ? 'border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.1)]'
          : 'border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.1)]'
      }`}
    >
      {/* Header status */}
      <div className="flex items-center gap-3 mb-6">
        {success ? (
          <div className="p-2 bg-green-500/20 text-green-400 rounded-full">
            <CheckCircle className="w-6 h-6" />
          </div>
        ) : (
          <div className="p-2 bg-red-500/20 text-red-400 rounded-full">
            <AlertCircle className="w-6 h-6" />
          </div>
        )}
        <h3 className={`font-bold text-xl ${success ? 'text-green-400' : 'text-red-400'}`}>
          {success ? 'Success! Code Executed' : 'SQL Tutor Feedback'}
        </h3>
      </div>

      {/* Message / Explanation */}
      {message && (
        <p className="text-gray-200 text-lg mb-6 leading-relaxed">
          {message}
        </p>
      )}

      {/* Failure Tutoring Details */}
      {!success && (
        <div className="flex flex-col gap-6">
          {/* Challenge Reminder */}
          <div className="p-4 bg-cyan-950/20 border border-cyan-500/20 rounded-xl">
            <span className="text-xs uppercase text-cyan-400 font-bold block mb-1">What was asked in the query:</span>
            <p className="text-gray-200 text-sm font-semibold">{challenge}</p>
          </div>

          {/* Highlight incorrect part */}
          {highlight && (
            <div className="p-4 bg-red-950/20 border border-red-500/20 rounded-xl">
              <span className="text-xs uppercase text-red-400 font-bold block mb-1">Look closely at:</span>
              <code className="text-red-300 font-mono text-sm break-all">{highlight}</code>
            </div>
          )}

          {/* Suggestion */}
          {suggestion && (
            <div className="p-4 bg-gray-900 border border-gray-700 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase text-gray-400 font-bold block mb-1">Suggested correction:</span>
                <code className="text-green-300 font-mono text-sm break-all">{suggestion}</code>
              </div>
              <button
                onClick={() => {
                  // If we wanted to inject, we could, but a copy button or visual guide is simple and neat
                  navigator.clipboard.writeText(suggestion);
                }}
                className="self-start md:self-auto px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg text-xs font-semibold active:scale-[0.98] transition-all flex items-center gap-1"
              >
                Copy Suggestion <ArrowRight size={14} />
              </button>
            </div>
          )}

          {/* Learning Tip */}
          {tip && (
            <div className="p-5 bg-gradient-to-r from-purple-950/20 to-indigo-950/20 border border-purple-500/20 rounded-2xl flex gap-3 items-start">
              <Sparkles className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
              <div>
                <span className="font-bold text-purple-300 block mb-1">SQL Learning Tip</span>
                <p className="text-gray-300 text-sm leading-relaxed">{tip}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Success execution table results */}
      {success && result && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <BookOpen size={16} />
            <span>Result Set: {result.rows.length} rows returned</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/5 bg-black/40">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-gray-300 font-semibold border-b border-white/10 text-sm">
                  {result.columns.map(col => (
                    <th key={col} className="p-4">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="border-b border-white/5 hover:bg-white/5 transition-colors text-sm">
                    {row.map((val, cIdx) => (
                      <td key={cIdx} className="p-4 font-mono text-cyan-300">
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
      )}
    </motion.div>
  );
}
