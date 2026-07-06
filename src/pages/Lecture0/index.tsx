
import HeroSection from './components/HeroSection';
import StorySection from './components/StorySection';
import DailyLifeSection from './components/DailyLifeSection';
import ChaosSection from './components/ChaosSection';
import UsageSection from './components/UsageSection';
import MythFactSection from './components/MythFactSection';
import QuizSection from './components/QuizSection';
import MissionCompleteSection from './components/MissionCompleteSection';

const Lecture0 = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <StorySection />
      <DailyLifeSection />
      <ChaosSection />
      <UsageSection />
      <MythFactSection />
      <QuizSection />
      <MissionCompleteSection />
    </div>
  );
};

export default Lecture0;
