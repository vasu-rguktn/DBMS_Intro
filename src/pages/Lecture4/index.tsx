import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Rocket,
  Database,
  AlertTriangle,
  Activity,
  ChevronRight,
  BookOpen,
  ShieldCheck,
  Network
} from 'lucide-react';
import { MasterTableExplorer } from './components/MasterTableExplorer';
import { SymbolsDrawer } from './components/SymbolsDrawer';
import { RulesDrawer } from './components/RulesDrawer';
import { KnowledgeMapModal } from './components/KnowledgeMapModal';
import { FdTab, KeysTab, AxiomsTab } from './components/Lecture4Part1';
import { ClosureTab, TwoNFTab, ThreeNFTab, DecompositionTab } from './components/Lecture4Part2';
import { JourneyTab, FlashcardsTab } from './components/Lecture4Part3';
import { NormalFormComparisonTable } from './components/NormalFormComparisonTable';
import { ActivityAtomicity, Activity1NF, ActivityFinalMission } from './components/ActivityModules';

export default function Lecture4() {
  const [activeTab, setActiveTab] = useState('intro');
  const [difficultyLevel, setDifficultyLevel] = useState<'explorer' | 'engineer' | 'architect'>('engineer');
  const [masterExpanded, setMasterExpanded] = useState(false);

  // Drawer & Modal States
  const [symbolsOpen, setSymbolsOpen] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);

  const tabs = [
    { id: 'intro', label: '1. Mission Brief & Path' },
    { id: 'master', label: '2. Master DB Explorer' },
    { id: 'atomic', label: '3. Atomic Data & 1NF' },
    { id: 'anomalies', label: '4. Problems in Bad Design' },
    { id: 'fd', label: '5. Functional Dependencies' },
    { id: 'keys', label: '6. Keys & Prime Attributes' },
    { id: 'axioms', label: '7. Armstrongs Axioms' },
    { id: 'closure', label: '8. Closure & Minimal Cover' },
    { id: '2nf', label: '9. 2NF (Second Normal Form)' },
    { id: '3nf', label: '10. 3NF & BCNF' },
    { id: 'comparison', label: '11. Comparison Table' },
    { id: 'decomposition', label: '12. Decomposition' },
    { id: 'journey', label: '13. 12-Stage Journey' },
    { id: 'flashcards', label: '14. Flash Cards & Traps' },
    { id: 'final-mission', label: '15. Final Assessment 🚀' },
  ];

  return (
    <div className="relative min-h-screen text-slate-200 p-4 md:p-8 pt-20 overflow-hidden font-sans">
      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-indigo-950 to-black"></div>

      {/* Drawers & Modals */}
      <SymbolsDrawer isOpen={symbolsOpen} onClose={() => setSymbolsOpen(false)} />
      <RulesDrawer isOpen={rulesOpen} onClose={() => setRulesOpen(false)} />
      <KnowledgeMapModal
        isOpen={mapOpen}
        onClose={() => setMapOpen(false)}
        onSelectTab={(tabId) => setActiveTab(tabId)}
      />

      {/* Bottom Master Table Explorer Drawer */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-40"
        initial={{ y: '100%' }}
        animate={{ y: masterExpanded ? 0 : 'calc(100% - 44px)' }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <div className="bg-slate-900/95 backdrop-blur-xl border-t border-indigo-500/30 shadow-[0_-10px_40px_-10px_rgba(79,70,229,0.3)] rounded-t-3xl h-[70vh] max-h-[850px] flex flex-col">
          <button
            onClick={() => setMasterExpanded(!masterExpanded)}
            className="w-full py-2.5 flex justify-center items-center text-indigo-300 hover:text-indigo-100 transition-colors bg-slate-950/80 rounded-t-3xl border-b border-slate-800 cursor-pointer"
          >
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
              <Database size={16} className="text-amber-400" />
              <span>SPACE_MISSION_MASTER Drawer ({masterExpanded ? 'Click to Collapse' : 'Click to Expand Master DB'})</span>
            </div>
          </button>

          <div className="flex-1 overflow-auto p-6 scrollbar-thin scrollbar-thumb-indigo-500/50 scrollbar-track-transparent">
            <MasterTableExplorer onStartNormalization={() => {
              setMasterExpanded(false);
              setActiveTab('journey');
            }} />
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto pb-32">
        {/* Header Section */}
        <header className="mb-8 text-center space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Difficulty Level Selector */}
            <div className="bg-slate-900/90 border border-indigo-500/30 p-1.5 rounded-2xl flex items-center gap-1 shadow-lg">
              <span className="text-[10px] uppercase font-bold text-slate-400 px-2">Level:</span>
              <button
                onClick={() => setDifficultyLevel('explorer')}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  difficultyLevel === 'explorer'
                    ? 'bg-cyan-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Explorer
              </button>
              <button
                onClick={() => setDifficultyLevel('engineer')}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  difficultyLevel === 'engineer'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Engineer
              </button>
              <button
                onClick={() => setDifficultyLevel('architect')}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  difficultyLevel === 'architect'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Architect
              </button>
            </div>

            {/* Quick Access Drawer Controls */}
            <button
              onClick={() => setSymbolsOpen(true)}
              className="px-3.5 py-1.5 rounded-2xl bg-slate-900/90 border border-indigo-500/30 text-xs font-bold text-indigo-300 hover:text-white hover:border-indigo-400 flex items-center gap-1.5 shadow-lg cursor-pointer"
            >
              <BookOpen size={14} className="text-amber-400" /> Symbols Drawer
            </button>

            <button
              onClick={() => setRulesOpen(true)}
              className="px-3.5 py-1.5 rounded-2xl bg-slate-900/90 border border-emerald-500/30 text-xs font-bold text-emerald-300 hover:text-white hover:border-emerald-400 flex items-center gap-1.5 shadow-lg cursor-pointer"
            >
              <ShieldCheck size={14} /> Rules Drawer
            </button>

            <button
              onClick={() => setMapOpen(true)}
              className="px-3.5 py-1.5 rounded-2xl bg-slate-900/90 border border-purple-500/30 text-xs font-bold text-purple-300 hover:text-white hover:border-purple-400 flex items-center gap-1.5 shadow-lg cursor-pointer"
            >
              <Network size={14} /> Knowledge Map
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center p-4 bg-indigo-500/10 rounded-full border border-indigo-500/20"
          >
            <Rocket size={42} className="text-indigo-400" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-amber-300 tracking-tight">
            UNIT 4 — GOOD RELATIONAL DESIGN 🚀
          </h1>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Mission: Design a Reliable Space Database. Explore, inspect, manipulate, derive dependencies, and normalize step by step.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="space-y-1.5">
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-3 pb-1">
              Unit Modules ({tabs.length})
            </div>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg shadow-indigo-900/50 scale-[1.02]'
                    : 'bg-slate-800/40 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent hover:border-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Main Content View */}
          <div className="lg:col-span-3 bg-slate-800/30 backdrop-blur-md rounded-3xl border border-slate-700/50 p-6 md:p-8 shadow-2xl relative overflow-hidden">
            <AnimatePresence mode="wait">
              {activeTab === 'intro' && (
                <motion.div key="intro" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <Activity className="text-indigo-400" /> Mission: Design a Reliable Space Database
                  </h2>
                  <div className="space-y-6 text-slate-300 leading-relaxed text-sm">
                    <p className="text-base">
                      A space agency operates spacecraft, launches, astronauts, ground stations, experiments, and mission activities.
                    </p>

                    <div className="bg-red-950/40 border border-red-500/30 p-6 rounded-2xl space-y-3">
                      <h3 className="text-red-400 font-bold text-base flex items-center gap-2">
                        <AlertTriangle /> Scenario: The Un-normalized Data Crisis
                      </h3>
                      <p>
                        The database team initially stored too much information in a few large tables. This creates severe operational problems:
                      </p>
                      <ul className="list-disc pl-6 space-y-1.5 text-red-200 font-medium">
                        <li>Repeated data across multiple launch records</li>
                        <li>Inconsistent data when information is updated in one place but missed in another</li>
                        <li>Difficulty updating information (Update Anomaly)</li>
                        <li>Difficulty inserting new information without creating artificial mission records (Insertion Anomaly)</li>
                        <li>Accidental loss of ground station records when deleting a mission (Deletion Anomaly)</li>
                      </ul>
                    </div>

                    <p className="text-base">
                      You are assigned as a <strong>Database Engineer</strong>. Your mission is to transform a badly designed relation into a well-designed relational database.
                    </p>

                    {/* Galaxy Progression Path */}
                    <div className="p-6 bg-slate-950 border border-indigo-500/30 rounded-2xl space-y-3">
                      <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        Galaxy Mission Path Progression:
                      </div>
                      <div className="flex items-center gap-2 overflow-x-auto py-2 font-mono text-xs text-indigo-300">
                        <span className="bg-indigo-950 px-3 py-1.5 rounded-lg border border-indigo-500/30 font-bold text-white">Raw Data</span>
                        <ChevronRight className="text-indigo-500 flex-shrink-0" />
                        <span className="bg-indigo-950 px-3 py-1.5 rounded-lg border border-indigo-500/30">Atomic Data</span>
                        <ChevronRight className="text-indigo-500 flex-shrink-0" />
                        <span className="bg-indigo-950 px-3 py-1.5 rounded-lg border border-indigo-500/30">1NF</span>
                        <ChevronRight className="text-indigo-500 flex-shrink-0" />
                        <span className="bg-indigo-950 px-3 py-1.5 rounded-lg border border-indigo-500/30">FDs</span>
                        <ChevronRight className="text-indigo-500 flex-shrink-0" />
                        <span className="bg-indigo-950 px-3 py-1.5 rounded-lg border border-indigo-500/30">2NF</span>
                        <ChevronRight className="text-indigo-500 flex-shrink-0" />
                        <span className="bg-indigo-950 px-3 py-1.5 rounded-lg border border-indigo-500/30">3NF</span>
                        <ChevronRight className="text-indigo-500 flex-shrink-0" />
                        <span className="bg-indigo-950 px-3 py-1.5 rounded-lg border border-indigo-500/30">BCNF</span>
                        <ChevronRight className="text-indigo-500 flex-shrink-0" />
                        <span className="bg-emerald-950 px-3 py-1.5 rounded-lg border border-emerald-500/40 text-emerald-300 font-bold">Good Design 🚀</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'master' && (
                <motion.div key="master" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <MasterTableExplorer onStartNormalization={() => setActiveTab('journey')} />
                </motion.div>
              )}

              {activeTab === 'atomic' && (
                <motion.div key="atomic" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="text-3xl font-bold text-indigo-300">Mission 1 — Atomic Data & 1NF</h2>

                  <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                    <p>
                      An attribute has an <strong>atomic value</strong> when each cell contains a single value that cannot be meaningfully divided into smaller values for the purposes of the relation.
                    </p>

                    <div className="p-4 bg-indigo-950/40 border border-indigo-500/30 rounded-2xl text-xs text-indigo-200">
                      💡 <strong>Domain Context Note:</strong> Atomicity is NOT an absolute physical indivisibility rule; atomicity depends on the intended meaning and domain of the attribute in the relation.
                    </div>

                    <ActivityAtomicity />
                    <Activity1NF />
                  </div>
                </motion.div>
              )}

              {activeTab === 'anomalies' && (
                <motion.div key="anomalies" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="text-3xl font-bold text-red-400 flex items-center gap-2">
                    <AlertTriangle /> Problems in Bad Schema Design
                  </h2>
                  <p className="text-slate-300 text-sm">
                    Test the three classic relational anomalies using the interactive simulator in the Master DB Explorer:
                  </p>
                  <MasterTableExplorer onStartNormalization={() => setActiveTab('journey')} />
                </motion.div>
              )}

              {activeTab === 'fd' && <FdTab key="fd" />}
              {activeTab === 'keys' && <KeysTab key="keys" />}
              {activeTab === 'axioms' && <AxiomsTab key="axioms" />}
              {activeTab === 'closure' && <ClosureTab key="closure" />}
              {activeTab === '2nf' && <TwoNFTab key="2nf" />}
              {activeTab === '3nf' && <ThreeNFTab key="3nf" />}
              {activeTab === 'comparison' && <NormalFormComparisonTable key="comparison" />}
              {activeTab === 'decomposition' && <DecompositionTab key="decomposition" />}
              {activeTab === 'journey' && <JourneyTab key="journey" />}
              {activeTab === 'flashcards' && <FlashcardsTab key="flashcards" />}
              {activeTab === 'final-mission' && <ActivityFinalMission key="final-mission" />}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
