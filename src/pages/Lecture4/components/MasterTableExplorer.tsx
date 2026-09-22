import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database,
  Search,
  ArrowUpDown,
  AlertTriangle,
  Info,
  Trash2,
  PlusCircle,
  Edit3,
  RefreshCw,
  Sparkles,
  Layers,
  X
} from 'lucide-react';
import { SPACE_MISSION_MASTER, type MasterRow } from '../data/masterData';

interface Props {
  onStartNormalization?: () => void;
}

export const MasterTableExplorer: React.FC<Props> = ({ onStartNormalization }) => {
  const [data, setData] = useState<MasterRow[]>([...SPACE_MISSION_MASTER]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof MasterRow>('MissionID');
  const [sortAsc, setSortAsc] = useState(true);
  const [highlightRepeated, setHighlightRepeated] = useState(false);
  const [selectedCols] = useState<string[]>([]);

  // Anomaly Modal States
  const [activeAnomaly, setActiveAnomaly] = useState<'none' | 'update' | 'insert' | 'delete'>('none');
  const [whyBadOpen, setWhyBadOpen] = useState(false);

  // Update Anomaly state
  const [gs01Name, setGs01Name] = useState('Bengaluru');
  const [updateRow1Only, setUpdateRow1Only] = useState(false);

  // Insert Anomaly state
  const [insertError, setInsertError] = useState<string | null>(null);

  // Deletion Anomaly state
  const [deletedM003, setDeletedM003] = useState(false);

  // Handle Sort
  const handleSort = (field: keyof MasterRow) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  // Filtered & Sorted Rows
  const filteredData = data.filter((row) =>
    Object.values(row).some((val) =>
      val.toLowerCase().includes(searchTerm.toLowerCase())
    )
  ).sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
  });

  const columns: (keyof MasterRow)[] = [
    'MissionID',
    'SpacecraftID',
    'SpacecraftName',
    'MissionName',
    'LaunchSite',
    'LaunchDate',
    'CommanderID',
    'CommanderName',
    'ExperimentID',
    'ExperimentName',
    'ExperimentType',
    'GroundStationID',
    'GroundStationName'
  ];

  // Helper to check repeated values for visual highlight
  const isRepeated = (key: keyof MasterRow, val: string) => {
    if (!highlightRepeated) return false;
    const count = data.filter((r) => r[key] === val).length;
    return count > 1;
  };

  const handleResetData = () => {
    setData([...SPACE_MISSION_MASTER]);
    setGs01Name('Bengaluru');
    setUpdateRow1Only(false);
    setInsertError(null);
    setDeletedM003(false);
    setActiveAnomaly('none');
  };

  return (
    <div className="bg-slate-900/90 border border-indigo-500/30 rounded-3xl p-6 shadow-2xl space-y-6 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-indigo-500/20">
        <div>
          <div className="flex items-center gap-2">
            <Database className="text-indigo-400" size={24} />
            <h3 className="text-2xl font-bold text-white tracking-wide">
              SPACE_MISSION_MASTER
            </h3>
            <span className="text-xs bg-indigo-900/80 text-indigo-300 font-mono px-3 py-1 rounded-full border border-indigo-500/30">
              6 Rows × 13 Columns
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Educational fictional space mission dataset for normalization practice
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setHighlightRepeated(!highlightRepeated)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              highlightRepeated
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-800 text-amber-400 border border-amber-500/30 hover:bg-slate-700'
            }`}
          >
            <Sparkles size={14} />
            {highlightRepeated ? 'Repeated Values Highlighted' : 'Highlight Repeated Values'}
          </button>

          <button
            onClick={() => setWhyBadOpen(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-red-950/60 text-red-300 border border-red-500/40 hover:bg-red-900/80 flex items-center gap-2 transition-all cursor-pointer"
          >
            <AlertTriangle size={14} /> Why is this design bad?
          </button>

          {onStartNormalization && (
            <button
              onClick={onStartNormalization}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Layers size={14} /> Normalize This Table 🚀
            </button>
          )}

          <button
            onClick={handleResetData}
            title="Reset dataset"
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* ISRO Fictional Disclaimer */}
      <div className="p-3.5 bg-indigo-950/40 border border-indigo-500/20 rounded-2xl flex items-start gap-3 text-xs text-indigo-200">
        <Info className="text-indigo-400 flex-shrink-0 mt-0.5" size={16} />
        <span>
          <strong>EDUCATIONAL DISCLAIMER:</strong> This is an educational fictional dataset inspired by real space-mission database requirements. Do not claim that these exact spacecraft, missions, commanders, experiments, or relationships are real ISRO operational records.
        </span>
      </div>

      {/* Anomaly Simulation Controls */}
      <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>Interactive Anomaly Simulator Lab</span>
          <span className="text-[10px] text-indigo-400 font-mono">Test Database Vulnerabilities</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Update Anomaly Simulator */}
          <button
            onClick={() => setActiveAnomaly(activeAnomaly === 'update' ? 'none' : 'update')}
            className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
              activeAnomaly === 'update'
                ? 'bg-amber-950/50 border-amber-500/60 text-amber-200'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="font-bold text-amber-400 mb-1 flex items-center gap-1.5">
              <Edit3 size={14} /> 1. Update Anomaly Test
            </div>
            <p className="text-[11px] opacity-80">Rename GS01 in one row only and observe database inconsistency.</p>
          </button>

          {/* Insertion Anomaly Simulator */}
          <button
            onClick={() => setActiveAnomaly(activeAnomaly === 'insert' ? 'none' : 'insert')}
            className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
              activeAnomaly === 'insert'
                ? 'bg-green-950/50 border-green-500/60 text-green-200'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="font-bold text-green-400 mb-1 flex items-center gap-1.5">
              <PlusCircle size={14} /> 2. Insertion Anomaly Test
            </div>
            <p className="text-[11px] opacity-80">Try adding a new Ground Station without a Mission ID.</p>
          </button>

          {/* Deletion Anomaly Simulator */}
          <button
            onClick={() => setActiveAnomaly(activeAnomaly === 'delete' ? 'none' : 'delete')}
            className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
              activeAnomaly === 'delete'
                ? 'bg-red-950/50 border-red-500/60 text-red-200'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="font-bold text-red-400 mb-1 flex items-center gap-1.5">
              <Trash2 size={14} /> 3. Deletion Anomaly Test
            </div>
            <p className="text-[11px] opacity-80">Delete Mission M003 and check if Lucknow Ground Station survives.</p>
          </button>
        </div>

        {/* Anomaly Controls Body */}
        <AnimatePresence mode="wait">
          {activeAnomaly === 'update' && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="p-4 bg-amber-950/30 border border-amber-500/30 rounded-xl space-y-3"
            >
              <div className="text-xs text-amber-200">
                <strong>Update Simulation:</strong> Change GroundStationID <code className="bg-amber-900/60 px-1 rounded">GS01</code> name from "Bengaluru" to "ISRO Telemetry Station".
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  value={gs01Name}
                  onChange={(e) => setGs01Name(e.target.value)}
                  placeholder="New Station Name"
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-amber-500/40 text-xs text-white focus:outline-none"
                />
                <button
                  onClick={() => {
                    setUpdateRow1Only(true);
                    setData((prev) =>
                      prev.map((r, idx) =>
                        idx === 0 ? { ...r, GroundStationName: gs01Name } : r
                      )
                    );
                  }}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-bold cursor-pointer"
                >
                  Update Row 1 Only (Inconsistent!)
                </button>
                <button
                  onClick={() => {
                    setUpdateRow1Only(false);
                    setData((prev) =>
                      prev.map((r) =>
                        r.GroundStationID === 'GS01' ? { ...r, GroundStationName: gs01Name } : r
                      )
                    );
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-semibold cursor-pointer border border-slate-700"
                >
                  Update All GS01 Rows (Laborious)
                </button>
              </div>
              {updateRow1Only && (
                <div className="text-xs text-red-300 font-semibold bg-red-950/50 p-2.5 rounded-lg border border-red-500/30">
                  ⚠️ UPDATE ANOMALY DETECTED! Row 1 (M001) shows "{data[0].GroundStationName}" for GS01, but Row 6 (M006) still shows "{data[5].GroundStationName}" for GS01! The database is now INCONSISTENT!
                </div>
              )}
            </motion.div>
          )}

          {activeAnomaly === 'insert' && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="p-4 bg-green-950/30 border border-green-500/30 rounded-xl space-y-3"
            >
              <div className="text-xs text-green-200">
                <strong>Insertion Simulation:</strong> Try adding a newly constructed Ground Station <code className="bg-green-900/60 px-1 rounded">GS06 (Sriharikota GS)</code> before any space mission is assigned to it.
              </div>
              <button
                onClick={() => {
                  setInsertError(
                    "❌ INSERTION ANOMALY REJECTED! In this un-normalized relation, GroundStation information cannot be stored independently without assigning a MissionID (Primary Key cannot be NULL). You cannot record GS06 until a mission is assigned to it!"
                  );
                }}
                className="px-3.5 py-1.5 rounded-lg bg-green-600 hover:bg-green-500 text-slate-950 text-xs font-bold cursor-pointer"
              >
                Attempt Insert GS06 (No Mission)
              </button>
              {insertError && (
                <div className="text-xs text-red-300 font-semibold bg-red-950/60 p-2.5 rounded-lg border border-red-500/40 leading-relaxed">
                  {insertError}
                </div>
              )}
            </motion.div>
          )}

          {activeAnomaly === 'delete' && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="p-4 bg-red-950/30 border border-red-500/30 rounded-xl space-y-3"
            >
              <div className="text-xs text-red-200">
                <strong>Deletion Simulation:</strong> Mission <code className="bg-red-900/60 px-1 rounded">M003 (NavIC-01)</code> is canceled. Delete tuple M003.
              </div>
              <button
                onClick={() => {
                  setData((prev) => prev.filter((r) => r.MissionID !== 'M003'));
                  setDeletedM003(true);
                }}
                className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 size={13} /> Delete Mission M003 Record
              </button>
              {deletedM003 && (
                <div className="text-xs text-amber-200 bg-amber-950/60 p-2.5 rounded-lg border border-amber-500/40 leading-relaxed">
                  ⚠️ DELETION ANOMALY DETECTED! Ground Station <code className="font-bold text-white">GS03 (Lucknow)</code> was only recorded in mission M003. Deleting M003 permanently WIPED OUT all information about GroundStation GS03 from the agency database!
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search attributes, spacecraft, commanders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="text-xs text-slate-400">
          Click column headers to sort | Mark Candidate Keys with KEY tag
        </div>
      </div>

      {/* Main Table View */}
      <div className="overflow-x-auto rounded-2xl border border-slate-700/60 bg-slate-950/70 shadow-inner">
        <table className="w-full text-xs text-left border-collapse">
          <thead className="bg-slate-800/90 text-slate-300 font-semibold uppercase tracking-wider sticky top-0 border-b border-slate-700">
            <tr>
              {columns.map((col) => {
                const isSelected = selectedCols.includes(col);
                const isCandidateKeyCol = col === 'MissionID' || col === 'ExperimentID';
                return (
                  <th
                    key={col}
                    onClick={() => handleSort(col)}
                    className={`px-3.5 py-3 whitespace-nowrap cursor-pointer transition-colors border-r border-slate-700/50 hover:bg-slate-700/50 ${
                      isSelected ? 'bg-indigo-900/60 text-indigo-200' : ''
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className={isCandidateKeyCol ? 'text-amber-400 font-bold' : ''}>
                        {col}
                      </span>
                      {isCandidateKeyCol && (
                        <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1 rounded border border-amber-500/30">
                          KEY
                        </span>
                      )}
                      <ArrowUpDown size={12} className="text-slate-500 opacity-60" />
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
            {filteredData.map((row, rIdx) => (
              <tr
                key={row.MissionID + rIdx}
                className="hover:bg-indigo-950/30 transition-colors"
              >
                {columns.map((col) => {
                  const val = row[col];
                  const repeated = isRepeated(col, val);
                  return (
                    <td
                      key={col}
                      className={`px-3.5 py-2.5 whitespace-nowrap border-r border-slate-800/40 text-slate-300 ${
                        repeated ? 'bg-amber-950/30 text-amber-200 font-semibold' : ''
                      }`}
                    >
                      {val}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* "Why Is This Design Bad?" Modal */}
      <AnimatePresence>
        {whyBadOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-red-500/40 rounded-3xl p-6 max-w-2xl w-full shadow-2xl relative space-y-4 text-slate-200 font-sans"
            >
              <div className="flex items-center justify-between pb-3 border-b border-red-500/20">
                <div className="flex items-center gap-2 text-red-400 font-bold text-xl">
                  <AlertTriangle size={24} />
                  <span>Why SPACE_MISSION_MASTER Needs Normalization</span>
                </div>
                <button
                  onClick={() => setWhyBadOpen(false)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-3 text-xs leading-relaxed">
                <p>
                  <code>SPACE_MISSION_MASTER</code> combines 5 distinct real-world entities into one giant flat relation: <strong>Mission, Spacecraft, Commander, Experiment, and GroundStation</strong>.
                </p>

                <div className="p-3 bg-red-950/30 border border-red-500/30 rounded-xl space-y-2">
                  <h4 className="font-bold text-red-300 text-sm">Critical Design Flaws:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-slate-300">
                    <li>
                      <strong>Redundant Data:</strong> Spacecraft details, Commander details, and Ground Station names are repeated on every launch mission.
                    </li>
                    <li>
                      <strong>Partial Dependencies:</strong> <code>CommanderName</code> depends only on <code>CommanderID</code>, not on the entire mission tuple.
                    </li>
                    <li>
                      <strong>Transitive Dependencies:</strong> <code>MissionID → GroundStationID</code> and <code>GroundStationID → GroundStationName</code>.
                    </li>
                    <li>
                      <strong>Update, Insert, and Delete Anomalies:</strong> Modifying a station name requires updating multiple rows; new ground stations cannot be inserted without a mission; deleting a mission erases the ground station.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    setWhyBadOpen(false);
                    if (onStartNormalization) onStartNormalization();
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs rounded-xl shadow-lg hover:from-indigo-500 hover:to-purple-500 transition-all cursor-pointer"
                >
                  Start Step-by-Step Normalization 🚀
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
