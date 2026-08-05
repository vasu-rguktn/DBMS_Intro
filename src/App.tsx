import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lecture0 from './pages/Lecture0';
import Lecture1 from './pages/Lecture1';
import Lecture3 from './pages/Lecture3';
import Lecture8 from './pages/Lecture8';
import GlobalUnitSelector from './components/GlobalUnitSelector';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen font-sans text-white relative">
        <div className="stars"></div>
        <GlobalUnitSelector />
        <Routes>
          <Route path="/" element={<Lecture0 />} />
          <Route path="/lecture/0" element={<Lecture0 />} />
          <Route path="/lecture/1" element={<Lecture1 />} />
          <Route path="/lecture/3" element={<Lecture3 />} />
          <Route path="/lecture/8" element={<Lecture8 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
