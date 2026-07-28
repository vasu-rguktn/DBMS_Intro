import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Database } from 'lucide-react';

const mockQueries = [
  {
    id: 'q1',
    name: 'Show all users from Hyderabad',
    sql: "SELECT *\nFROM Users\nWHERE City = 'Hyderabad';",
    ra: "σ City='Hyderabad' (Users)",
    resultCols: ['UserID', 'Name', 'City'],
    resultData: [
      [1, 'Alex', 'Hyderabad'],
      [3, 'Sam', 'Hyderabad']
    ]
  },
  {
    id: 'q2',
    name: 'Get only usernames',
    sql: "SELECT Name\nFROM Users;",
    ra: "π Name (Users)",
    resultCols: ['Name'],
    resultData: [
      ['Alex'],
      ['Jordan'],
      ['Sam']
    ]
  }
];

export default function SandboxAndEditor({ onComplete }: { onComplete: () => void }) {
  const [activeQueryId, setActiveQueryId] = useState(mockQueries[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const activeQuery = mockQueries.find(q => q.id === activeQueryId)!;

  const handlePlay = () => {
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 100);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto w-full p-4 md:p-8"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Sandbox & Editor</h2>
        <p className="text-gray-400">See how SQL translates directly into Relational Algebra</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Queries & Editor */}
        <div className="flex-1 space-y-6">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
            <h3 className="font-semibold text-gray-300 mb-4">Select a Query</h3>
            <div className="space-y-2">
              {mockQueries.map(q => (
                <button
                  key={q.id}
                  onClick={() => setActiveQueryId(q.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${activeQueryId === q.id ? 'bg-cyan-900/40 border-cyan-500 text-cyan-300' : 'bg-gray-800 border-gray-700 hover:bg-gray-700'}`}
                >
                  {q.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black border border-gray-700 rounded-xl p-4 font-mono">
              <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider">SQL Query</div>
              <pre className="text-sm text-cyan-400">{activeQuery.sql}</pre>
            </div>
            <div className="bg-black border border-gray-700 rounded-xl p-4 font-mono">
              <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Relational Algebra</div>
              <pre className="text-sm text-purple-400">{activeQuery.ra}</pre>
            </div>
          </div>

          <button 
            onClick={handlePlay}
            className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-bold text-xl hover:from-green-500 hover:to-emerald-500 transition-colors flex items-center justify-center gap-2"
          >
            <Play className="w-6 h-6 fill-current" /> Execute Query
          </button>
        </div>

        {/* Right Column: Visualizer */}
        <div className="flex-1 bg-gray-900 border border-gray-700 rounded-xl p-6 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-6 text-gray-400">
            <Database className="w-5 h-5" />
            <h3 className="font-semibold">Execution Result</h3>
          </div>

          {isPlaying ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="overflow-x-auto"
            >
              <table className="w-full text-left">
                <thead className="bg-gray-800">
                  <tr>
                    {activeQuery.resultCols.map(c => (
                      <th key={c} className="p-3 border-b border-gray-700">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {activeQuery.resultData.map((row, i) => (
                    <motion.tr 
                      key={i} 
                      className="border-b border-gray-800 bg-gray-800/30"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      {row.map((cell, j) => (
                        <td key={j} className="p-3 text-gray-300">{cell}</td>
                      ))}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          ) : (
            <div className="h-48 flex items-center justify-center text-gray-500">
              Click Execute to view results
            </div>
          )}
        </div>

      </div>

      <div className="mt-12 flex justify-center">
        <button onClick={onComplete} className="px-10 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform text-lg">
          Final Mission &rarr;
        </button>
      </div>
    </motion.div>
  );
}
