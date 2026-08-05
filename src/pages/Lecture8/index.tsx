import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Homepage from './components/Homepage';
import OperatorRoadmap from './components/OperatorRoadmap';
import OperatorSection from './components/OperatorSection';
import { operatorsData } from './components/OperatorData';
import SymbolMemoryStudio from './components/SymbolMemoryStudio';
import SandboxAndEditor from './components/SandboxAndEditor';
import FinalMission from './components/FinalMission';
import ComparisonTable from './components/ComparisonTable';

const Lecture8 = () => {
  const [currentStage, setCurrentStage] = useState<'home' | 'roadmap' | 'operator' | 'symbol-studio' | 'sandbox' | 'final-mission' | 'comparison'>('home');
  const [unlockedOperatorIndex, setUnlockedOperatorIndex] = useState(0);
  const [activeOperatorIndex, setActiveOperatorIndex] = useState(0);

  // Load progress from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('relational_algebra_progress');
    if (saved) {
      try {
        const progress = JSON.parse(saved);
        if (typeof progress.currentStage === 'string') setCurrentStage(progress.currentStage);
        if (typeof progress.unlockedOperatorIndex === 'number') setUnlockedOperatorIndex(progress.unlockedOperatorIndex);
        if (typeof progress.activeOperatorIndex === 'number') setActiveOperatorIndex(progress.activeOperatorIndex);
      } catch (e) {
        console.error("Failed to load Relational Algebra progress:", e);
      }
    }
  }, []);

  // Save progress to localStorage whenever state changes
  useEffect(() => {
    if (currentStage === 'home' && unlockedOperatorIndex === 0 && activeOperatorIndex === 0) return;
    
    const progress = {
      currentStage,
      unlockedOperatorIndex,
      activeOperatorIndex
    };
    localStorage.setItem('relational_algebra_progress', JSON.stringify(progress));
  }, [currentStage, unlockedOperatorIndex, activeOperatorIndex]);

  const handleOperatorComplete = () => {
    if (activeOperatorIndex === unlockedOperatorIndex) {
      setUnlockedOperatorIndex(prev => prev + 1);
    }
    setCurrentStage('roadmap');
  };

  const handleRoadmapSelect = (index: number) => {
    if (index >= operatorsData.length) {
      setCurrentStage('symbol-studio');
    } else {
      setActiveOperatorIndex(index);
      setCurrentStage('operator');
    }
  };

  const handlePrevOperator = () => {
    if (activeOperatorIndex > 0) {
      setActiveOperatorIndex(prev => prev - 1);
    }
  };

  const handleNextOperator = () => {
    if (activeOperatorIndex < operatorsData.length - 1) {
      if (activeOperatorIndex === unlockedOperatorIndex) {
        setUnlockedOperatorIndex(prev => prev + 1);
      }
      setActiveOperatorIndex(prev => prev + 1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-white overflow-x-hidden relative">
      <AnimatePresence mode="wait">
        {currentStage === 'home' && (
          <Homepage key="home" onStart={() => setCurrentStage('roadmap')} />
        )}
        
        {currentStage === 'roadmap' && (
          <OperatorRoadmap 
            key="roadmap" 
            unlockedIndex={unlockedOperatorIndex} 
            onSelect={handleRoadmapSelect} 
          />
        )}

        {currentStage === 'operator' && (
          <motion.div key="operator" className="flex-1 flex items-center justify-center pt-20">
             <OperatorSection 
               key={operatorsData[activeOperatorIndex].id}
               operator={operatorsData[activeOperatorIndex]} 
               onComplete={handleOperatorComplete} 
               onBack={() => setCurrentStage('roadmap')}
               onPrev={handlePrevOperator}
               onNext={handleNextOperator}
               hasPrev={activeOperatorIndex > 0}
               hasNext={activeOperatorIndex < operatorsData.length - 1}
             />
          </motion.div>
        )}

        {currentStage === 'symbol-studio' && (
          <SymbolMemoryStudio key="symbol-studio" onComplete={() => setCurrentStage('sandbox')} />
        )}

        {currentStage === 'sandbox' && (
          <SandboxAndEditor key="sandbox" onComplete={() => setCurrentStage('final-mission')} />
        )}

        {currentStage === 'final-mission' && (
          <FinalMission key="final-mission" onComplete={() => setCurrentStage('comparison')} />
        )}

        {currentStage === 'comparison' && (
          <ComparisonTable key="comparison" />
        )}

      </AnimatePresence>
    </div>
  );
};

export default Lecture8;
