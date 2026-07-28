import { useState } from 'react';
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
