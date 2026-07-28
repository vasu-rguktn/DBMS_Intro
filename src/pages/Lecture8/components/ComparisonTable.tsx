import { motion } from 'framer-motion';
import { operatorsData } from './OperatorData';

export default function ComparisonTable() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen p-8 max-w-6xl mx-auto w-full"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 glow-text-cyan">Relational Algebra Mastered</h2>
        <p className="text-gray-400 text-xl">Your complete reference guide.</p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-700 bg-gray-900/50 backdrop-blur-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-800 text-gray-300">
              <th className="p-4 border-b border-gray-700">Operator</th>
              <th className="p-4 border-b border-gray-700 text-center">Symbol</th>
              <th className="p-4 border-b border-gray-700">SQL Equivalent</th>
              <th className="p-4 border-b border-gray-700">Real Example</th>
            </tr>
          </thead>
          <tbody>
            {operatorsData.map((op, i) => (
              <motion.tr 
                key={op.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
              >
                <td className="p-4 font-semibold">{op.name}</td>
                <td className="p-4 text-center text-3xl font-serif text-cyan-400 glow-text-cyan">{op.symbol}</td>
                <td className="p-4 font-mono text-sm text-purple-300 whitespace-pre-line">{op.sqlEquivalent.split('\n')[0]}...</td>
                <td className="p-4 text-gray-400 text-sm">{op.scenario}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 text-center">
        <a href="/" className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full font-bold shadow-[0_0_20px_rgba(0,240,255,0.3)]">
          Return to Galaxy Map
        </a>
      </div>
    </motion.div>
  );
}
