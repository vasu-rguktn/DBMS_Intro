import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Compass, Key, Database, Binary, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const units = [
  { path: '/lecture/0', name: 'UNIT-0: Database Galaxy', icon: Compass, color: 'text-cyan-400' },
  { path: '/lecture/1', name: 'UNIT-1: Constraints', icon: Key, color: 'text-purple-400' },
  { path: '/lecture/3', name: 'UNIT-3: SQL Universe', icon: Database, color: 'text-yellow-400' },
  { path: '/lecture/8', name: 'UNIT-8: Relational Algebra', icon: Binary, color: 'text-red-400' }
];

export default function GlobalUnitSelector() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const activeUnit = units.find(u => location.pathname === u.path) || 
                     (location.pathname === '/' ? units[0] : null);

  if (!activeUnit) return null;

  const ActiveIcon = activeUnit.icon;

  return (
    <div className="fixed top-4 right-4 z-50 font-sans">
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsOpen(!isOpen)}
          className="glass-panel px-4 py-2.5 rounded-full flex items-center gap-2.5 text-sm font-bold text-white border border-white/10 hover:border-white/20 shadow-lg cursor-pointer bg-galaxy-800/90 backdrop-blur-md"
        >
          <ActiveIcon size={16} className={activeUnit.color} />
          <span>{activeUnit.name}</span>
          <ChevronDown size={14} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay background to close the dropdown */}
              <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
              
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-64 glass-panel rounded-2xl border border-white/10 p-2 shadow-2xl z-50 bg-galaxy-900/95 backdrop-blur-xl"
              >
                <div className="text-[10px] uppercase font-bold tracking-wider text-gray-500 p-2 border-b border-white/5 mb-1">
                  DBMS Learning Units
                </div>
                <div className="flex flex-col gap-1">
                  {units.map((unit) => {
                    const Icon = unit.icon;
                    const isActive = activeUnit.path === unit.path;
                    return (
                      <button
                        key={unit.path}
                        onClick={() => {
                          setIsOpen(false);
                          navigate(unit.path);
                        }}
                        className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left text-sm font-semibold transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-white/10 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Icon size={16} className={`${unit.color} ${isActive ? 'animate-pulse' : ''}`} />
                        <span>{unit.name.split(': ')[1]}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
