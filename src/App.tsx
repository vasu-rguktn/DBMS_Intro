import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lecture0 from './pages/Lecture0';
import Lecture1 from './pages/Lecture1';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen font-sans text-white relative">
        <div className="stars"></div>
        <Routes>
          <Route path="/" element={<Lecture0 />} />
          <Route path="/lecture/0" element={<Lecture0 />} />
          <Route path="/lecture/1" element={<Lecture1 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
