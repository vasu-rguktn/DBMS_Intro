import React from 'react';
import { Table, Sparkles, CheckCircle2 } from 'lucide-react';

export const NormalFormComparisonTable: React.FC = () => {
  const rows = [
    {
      nf: '1NF (First Normal Form)',
      condition: 'All attribute values are atomic; no repeating groups or multi-valued cells.',
      problem: 'Unstructured multi-valued cells, inability to query individual elements directly.',
      remember: 'Atomicity & No Repeating Groups'
    },
    {
      nf: '2NF (Second Normal Form)',
      condition: '1NF + every non-prime attribute is fully functionally dependent on every candidate key.',
      problem: 'Partial dependencies on composite candidate keys; redundant entity attributes.',
      remember: 'No Partial Dependency'
    },
    {
      nf: '3NF (Third Normal Form)',
      condition: '2NF + for every non-trivial FD X → A, either X is a superkey OR A is a prime attribute.',
      problem: 'Transitive dependencies involving non-prime attributes; update/delete anomalies.',
      remember: 'No Transitive Dependency (Non-Prime)'
    },
    {
      nf: 'BCNF (Boyce-Codd Normal Form)',
      condition: 'For EVERY non-trivial FD X → Y, X MUST be a superkey of the relation.',
      problem: 'Remaining dependency-based redundancies where determinants are non-superkeys.',
      remember: 'Every Determinant is a Superkey'
    }
  ];

  return (
    <div className="bg-slate-900/90 border border-indigo-500/30 rounded-3xl p-6 space-y-6 font-sans shadow-2xl">
      <div className="flex items-center justify-between pb-4 border-b border-indigo-500/20">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-600/20 rounded-2xl text-indigo-400 border border-indigo-500/30">
            <Table size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Normalization Comparison Matrix</h3>
            <p className="text-xs text-indigo-300">Quick Reference for 1NF, 2NF, 3NF & BCNF</p>
          </div>
        </div>
        <span className="text-xs font-bold bg-indigo-950 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/30 flex items-center gap-1.5">
          <Sparkles size={14} className="text-amber-400" /> Summary Matrix
        </span>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-700 bg-slate-950/80">
        <table className="w-full text-xs text-left border-collapse">
          <thead className="bg-slate-800 text-slate-200 uppercase font-bold text-[10px] tracking-wider border-b border-slate-700">
            <tr>
              <th className="p-3.5 border-r border-slate-700/60">Normal Form</th>
              <th className="p-3.5 border-r border-slate-700/60">Main Formal Condition</th>
              <th className="p-3.5 border-r border-slate-700/60">Main Problem Addressed</th>
              <th className="p-3.5">Memory Rule</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {rows.map((r, idx) => (
              <tr key={idx} className="hover:bg-indigo-950/20 transition-colors">
                <td className="p-3.5 font-bold text-indigo-300 border-r border-slate-800 whitespace-nowrap">
                  {r.nf}
                </td>
                <td className="p-3.5 border-r border-slate-800 leading-relaxed font-mono text-[11px]">
                  {r.condition}
                </td>
                <td className="p-3.5 border-r border-slate-800 leading-relaxed text-slate-400">
                  {r.problem}
                </td>
                <td className="p-3.5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-500/30">
                    <CheckCircle2 size={13} /> {r.remember}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Remember Box */}
      <div className="p-4 bg-indigo-950/40 border border-indigo-500/30 rounded-2xl space-y-2">
        <h4 className="font-bold text-indigo-300 text-xs uppercase tracking-wider">
          Mnemonic Rules to Remember:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="font-bold text-indigo-400 block mb-0.5">1NF</span>
            <span className="text-slate-300">Atomicity</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="font-bold text-indigo-400 block mb-0.5">2NF</span>
            <span className="text-slate-300">No Partial Dependency</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="font-bold text-indigo-400 block mb-0.5">3NF</span>
            <span className="text-slate-300">No Non-Prime Transitive Dependency</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="font-bold text-indigo-400 block mb-0.5">BCNF</span>
            <span className="text-slate-300">Every Determinant is a Superkey</span>
          </div>
        </div>
      </div>
    </div>
  );
};
