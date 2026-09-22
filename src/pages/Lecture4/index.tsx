import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Database, AlertTriangle, Activity, Info, ChevronRight } from 'lucide-react';
import { SPACE_MISSION_MASTER } from './data/masterData';
import { FdTab, KeysTab, AxiomsTab } from './components/Lecture4Part1';
import { ClosureTab, TwoNFTab, ThreeNFTab, DecompositionTab } from './components/Lecture4Part2';
import { JourneyTab, FlashcardsTab } from './components/Lecture4Part3';

export default function Lecture4() {
  const [activeTab, setActiveTab] = useState('intro');
  const [masterExpanded, setMasterExpanded] = useState(false);

  return (
    <div className="relative min-h-screen text-slate-200 p-8 pt-20 overflow-hidden font-sans">
      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-indigo-950 to-black"></div>
      
      {/* Master Table Drawer */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 z-40"
        initial={{ y: "100%" }}
        animate={{ y: masterExpanded ? 0 : "calc(100% - 40px)" }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <div className="bg-slate-900/95 backdrop-blur-xl border-t border-indigo-500/30 shadow-[0_-10px_40px_-10px_rgba(79,70,229,0.3)] rounded-t-3xl h-[60vh] max-h-[800px] flex flex-col">
          <button 
            onClick={() => setMasterExpanded(!masterExpanded)}
            className="w-full py-2 flex justify-center items-center text-indigo-300 hover:text-indigo-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Database size={16} />
              <span className="text-sm font-bold tracking-widest uppercase">SPACE_MISSION_MASTER Explorer</span>
            </div>
          </button>
          
          <div className="flex-1 overflow-auto p-6 scrollbar-thin scrollbar-thumb-indigo-500/50 scrollbar-track-transparent">
            <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-500/20 mb-6 flex items-start gap-4">
               <Info className="text-indigo-400 mt-1 flex-shrink-0" />
               <p className="text-sm text-indigo-200">
                 <strong>NOTE:</strong> This is an educational fictional dataset inspired by real space-mission database requirements. 
                 Do not claim that these exact spacecraft, missions, commanders, experiments or relationships are real ISRO operational records.
               </p>
            </div>
            
            <div className="overflow-x-auto rounded-xl border border-slate-700/50 bg-slate-900/50">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-800/80 text-slate-300 uppercase text-xs font-semibold tracking-wider">
                  <tr>
                    {Object.keys(SPACE_MISSION_MASTER[0]).map(key => (
                      <th key={key} className="px-4 py-3 border-b border-slate-700/50 whitespace-nowrap">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {SPACE_MISSION_MASTER.map((row, i) => (
                    <tr key={i} className="hover:bg-indigo-900/20 transition-colors">
                      {Object.values(row).map((val, j) => (
                        <td key={j} className="px-4 py-3 whitespace-nowrap text-slate-300">{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto pb-32">
        <header className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center p-4 bg-indigo-500/10 rounded-full mb-6 border border-indigo-500/20"
          >
            <Rocket size={48} className="text-indigo-400" />
          </motion.div>
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 tracking-tight mb-4">
            UNIT 4: GOOD RELATIONAL DESIGN
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Mission: Design a Reliable Space Database. Transform a badly designed relation into a well-designed relational database.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="space-y-2">
            {[
              { id: 'intro', label: '1. Mission Brief' },
              { id: 'atomic', label: '2. Atomic Data & 1NF' },
              { id: 'anomalies', label: '3. Problems in Bad Design' },
              { id: 'fd', label: '4. Functional Dependencies' },
              { id: 'keys', label: '5. Keys & Prime Attributes' },
              { id: 'axioms', label: '6. Armstrongs Axioms' },
              { id: 'closure', label: '7. Closure & Minimal Cover' },
              { id: '2nf', label: '8. 2NF (Second Normal Form)' },
              { id: '3nf', label: '9. 3NF & BCNF' },
              { id: 'decomposition', label: '10. Decomposition' },
              { id: 'journey', label: '11. Complete Journey' },
              { id: 'flashcards', label: '12. Flash Cards & Traps' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50 scale-[1.02]' 
                    : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-3 bg-slate-800/40 backdrop-blur-md rounded-3xl border border-slate-700/50 p-8 shadow-2xl relative overflow-hidden">
            
            <AnimatePresence mode="wait">
              
              {activeTab === 'intro' && (
                <motion.div key="intro" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <Activity className="text-indigo-400" /> Mission: Design a Reliable Space Database
                  </h2>
                  <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
                    <p>
                      A space agency operates spacecraft, launches, astronauts, ground stations, experiments, and mission activities.
                    </p>
                    <div className="bg-red-900/20 border border-red-500/30 p-6 rounded-2xl">
                      <h3 className="text-red-400 font-bold mb-3 flex items-center gap-2">
                        <AlertTriangle /> The Problem
                      </h3>
                      <p className="mb-4">
                        The database team initially stored too much information in a few large tables. This creates problems:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-red-200">
                        <li>Repeated data</li>
                        <li>Inconsistent data</li>
                        <li>Difficulty updating information</li>
                        <li>Difficulty inserting new information</li>
                        <li>Accidental loss of information when deleting a record</li>
                      </ul>
                    </div>
                    <p>
                      You are assigned as a <strong>Database Engineer</strong>. Your mission is to transform this badly designed relation into a well-designed relational database.
                    </p>
                    <div className="p-6 bg-indigo-900/20 border border-indigo-500/30 rounded-2xl flex items-center gap-4 overflow-x-auto whitespace-nowrap">
                       <span className="font-bold text-indigo-300">Raw Data</span>
                       <ChevronRight className="text-indigo-500" />
                       <span className="font-bold text-indigo-300">1NF</span>
                       <ChevronRight className="text-indigo-500" />
                       <span className="font-bold text-indigo-300">FDs</span>
                       <ChevronRight className="text-indigo-500" />
                       <span className="font-bold text-indigo-300">2NF</span>
                       <ChevronRight className="text-indigo-500" />
                       <span className="font-bold text-indigo-300">3NF</span>
                       <ChevronRight className="text-indigo-500" />
                       <span className="font-bold text-indigo-300">BCNF</span>
                       <ChevronRight className="text-indigo-500" />
                       <span className="font-bold text-green-400">Good Design</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'atomic' && (
                <motion.div key="atomic" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-3xl font-bold mb-6 text-indigo-300">Atomic Data & 1NF</h2>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4 text-white">Atomic Domains</h3>
                    <p className="mb-4 text-slate-300">
                      An attribute has an <strong>atomic value</strong> when each cell contains a single value that cannot be meaningfully divided into smaller values for the purposes of the relation.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-red-950/30 border border-red-500/30 p-4 rounded-xl">
                        <div className="text-red-400 font-bold mb-2">BAD (Non-Atomic)</div>
                        <table className="w-full text-sm text-left border-collapse">
                           <thead><tr className="border-b border-red-500/30 text-red-200"><th>MissionID</th><th>CommanderName</th><th>ExperimentNames</th></tr></thead>
                           <tbody className="text-slate-300"><tr><td>M001</td><td>Arjun Rao</td><td className="bg-red-500/20 text-white font-bold p-1 rounded">Life Support Test, Crew Health Study</td></tr></tbody>
                        </table>
                        <p className="text-sm mt-3 text-red-200">ExperimentNames contains multiple values in one cell.</p>
                      </div>
                      <div className="bg-green-950/30 border border-green-500/30 p-4 rounded-xl">
                        <div className="text-green-400 font-bold mb-2">GOOD (Atomic)</div>
                        <table className="w-full text-sm text-left border-collapse">
                           <thead><tr className="border-b border-green-500/30 text-green-200"><th>MissionID</th><th>ExperimentID</th><th>ExperimentName</th></tr></thead>
                           <tbody className="text-slate-300">
                             <tr><td>M001</td><td>E201</td><td>Life Support Test</td></tr>
                             <tr><td>M001</td><td>E206</td><td>Crew Health Study</td></tr>
                           </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="bg-indigo-900/20 border border-indigo-500/30 p-6 rounded-2xl">
                    <h3 className="text-xl font-bold mb-2 text-indigo-300">First Normal Form (1NF)</h3>
                    <p className="text-slate-300 mb-4">
                      A relation is in <strong>First Normal Form (1NF)</strong> when each attribute contains atomic values and there are no repeating groups or multivalued attributes represented inside a single cell.
                    </p>
                    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                      <p className="text-sm text-slate-400">
                        <AlertTriangle className="inline mr-2 text-yellow-500" size={16}/>
                        <strong>Important:</strong> 1NF does NOT mean the table is fully normalized. A table can satisfy 1NF and still contain partial dependencies, transitive dependencies, and update anomalies.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'anomalies' && (
                <motion.div key="anomalies" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-3xl font-bold mb-6 text-red-400 flex items-center gap-2"><AlertTriangle /> Problems in Bad Schema Design</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-slate-800/80 border border-slate-600 p-6 rounded-2xl">
                      <h3 className="text-xl font-bold text-yellow-400 mb-2">A. Update Anomaly</h3>
                      <p className="text-slate-300">
                        Suppose GroundStationID GS01 changes its name. If the station name is repeated in many rows, every occurrence must be updated. If one row is missed, the database becomes inconsistent.
                      </p>
                    </div>
                    
                    <div className="bg-slate-800/80 border border-slate-600 p-6 rounded-2xl">
                      <h3 className="text-xl font-bold text-green-400 mb-2">B. Insertion Anomaly</h3>
                      <p className="text-slate-300">
                        Suppose a new ground station is established, but no mission has been assigned to it yet. If station information is stored only inside the mission relation, we may not be able to store the station independently without creating an artificial mission record.
                      </p>
                    </div>

                    <div className="bg-slate-800/80 border border-slate-600 p-6 rounded-2xl">
                      <h3 className="text-xl font-bold text-red-400 mb-2">C. Deletion Anomaly</h3>
                      <p className="text-slate-300">
                        Suppose M003 is the only mission using GS03. If deleting M003 also removes the only stored information about GS03, we lose information about the ground station.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'fd' && <FdTab key="fd" />}
              {activeTab === 'keys' && <KeysTab key="keys" />}
              {activeTab === 'axioms' && <AxiomsTab key="axioms" />}
              {activeTab === 'closure' && <ClosureTab key="closure" />}
              {activeTab === '2nf' && <TwoNFTab key="2nf" />}
              {activeTab === '3nf' && <ThreeNFTab key="3nf" />}
              {activeTab === 'decomposition' && <DecompositionTab key="decomposition" />}
              {activeTab === 'journey' && <JourneyTab key="journey" />}
              {activeTab === 'flashcards' && <FlashcardsTab key="flashcards" />}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
