import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenTool, CheckCircle2, ArrowRight, XCircle, AlertCircle } from 'lucide-react';
import { operatorsData } from './OperatorData';

type Point = { x: number, y: number };
type Stroke = Point[];

// Geometric heuristics
type SymbolHeuristic = {
  minStrokes: number;
  maxStrokes: number;
  expectedAspect: 'tall' | 'wide' | 'square' | 'any';
  minAspect?: number;
  maxAspect?: number;
  hint: string;
};

const heuristics: Record<string, SymbolHeuristic> = {
  'σ': { minStrokes: 1, maxStrokes: 2, expectedAspect: 'any', hint: 'Sigma (σ) should have a loop and a horizontal tail. (1-2 strokes)' },
  'π': { minStrokes: 2, maxStrokes: 3, expectedAspect: 'square', minAspect: 0.5, maxAspect: 2.0, hint: 'Projection (π) needs one horizontal line and two vertical legs. (2-3 strokes)' },
  '∪': { minStrokes: 1, maxStrokes: 1, expectedAspect: 'any', hint: 'Union (∪) is a single continuous U-shape. (Exactly 1 stroke)' },
  '−': { minStrokes: 1, maxStrokes: 1, expectedAspect: 'wide', minAspect: 2.0, hint: 'Difference (−) is a single horizontal line. It must be very wide.' },
  '×': { minStrokes: 2, maxStrokes: 2, expectedAspect: 'square', hint: 'Cartesian Product (×) consists of two intersecting diagonal lines. (Exactly 2 strokes)' },
  'ρ': { minStrokes: 1, maxStrokes: 2, expectedAspect: 'tall', maxAspect: 1.0, hint: 'Rename (ρ) looks like a lowercase "p" with a curved tail. It should be taller than it is wide.' },
  '⋈': { minStrokes: 2, maxStrokes: 4, expectedAspect: 'wide', minAspect: 1.2, hint: 'Join (⋈) looks like a bowtie and should be wider than it is tall.' },
  '⋈θ': { minStrokes: 3, maxStrokes: 6, expectedAspect: 'wide', hint: 'Theta Join (⋈θ) is a bowtie with a theta symbol next to it.' },
  '⋈=': { minStrokes: 3, maxStrokes: 6, expectedAspect: 'wide', hint: 'Equi Join (⋈=) is a bowtie with an equals sign.' },
  '⟕': { minStrokes: 2, maxStrokes: 5, expectedAspect: 'wide', hint: 'Left Outer Join (⟕) is a bowtie with extra lines on the left.' },
  '⟖': { minStrokes: 2, maxStrokes: 5, expectedAspect: 'wide', hint: 'Right Outer Join (⟖) is a bowtie with extra lines on the right.' },
  '⟗': { minStrokes: 2, maxStrokes: 6, expectedAspect: 'wide', hint: 'Full Outer Join (⟗) is a bowtie with extra lines on both sides.' },
  '∩': { minStrokes: 1, maxStrokes: 1, expectedAspect: 'any', hint: 'Intersection (∩) is an upside-down U-shape. (Exactly 1 stroke)' },
  '÷': { minStrokes: 3, maxStrokes: 3, expectedAspect: 'any', hint: 'Division (÷) is a horizontal line with a dot above and below. (Exactly 3 strokes)' },
};

export default function SymbolMemoryStudio({ onComplete }: { onComplete: () => void }) {
  const [currentSymbolIndex, setCurrentSymbolIndex] = useState(0);
  const [mode, setMode] = useState<'practice' | 'challenge'>('practice');
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Stroke>([]);
  const [score, setScore] = useState<{ value: number, text: string, status: 'excellent' | 'correct' | 'almost' | 'fail', hint?: string } | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentOp = operatorsData[currentSymbolIndex];
  const heuristic = heuristics[currentOp.symbol] || heuristics['σ'];

  const getPoint = (e: React.MouseEvent | React.TouchEvent): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    let clientX, clientY;
    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    } else {
      return null;
    }
    const rect = canvas.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    setScore(null); // allow unlimited retries by clearing previous score
    const point = getPoint(e);
    if (!point) return;
    setCurrentStroke([point]);
    
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const point = getPoint(e);
    if (!point) return;
    setCurrentStroke(prev => [...prev, point]);
    
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.lineTo(point.x, point.y);
      ctx.strokeStyle = '#00F0FF';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    if (isDrawing && currentStroke.length > 0) {
      setStrokes(prev => [...prev, currentStroke]);
    }
    setIsDrawing(false);
    setCurrentStroke([]);
  };

  const evaluateDrawing = () => {
    if (strokes.length === 0) return;
    
    let baseScore = 100;
    const strokeCount = strokes.length;
    
    // 1. Check Stroke Count
    if (strokeCount < heuristic.minStrokes) {
      baseScore -= (heuristic.minStrokes - strokeCount) * 40;
    } else if (strokeCount > heuristic.maxStrokes) {
      baseScore -= (strokeCount - heuristic.maxStrokes) * 30;
    }

    // 2. Check Bounding Box & Aspect Ratio
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    strokes.forEach(stroke => {
      stroke.forEach(p => {
        if (p.x < minX) minX = p.x;
        if (p.x > maxX) maxX = p.x;
        if (p.y < minY) minY = p.y;
        if (p.y > maxY) maxY = p.y;
      });
    });

    const width = Math.max(1, maxX - minX);
    const height = Math.max(1, maxY - minY);
    const aspect = width / height;

    if (heuristic.expectedAspect === 'wide' || heuristic.minAspect) {
      const minA = heuristic.minAspect || 1.2;
      if (aspect < minA) baseScore -= 30;
    } else if (heuristic.expectedAspect === 'tall' || heuristic.maxAspect) {
      const maxA = heuristic.maxAspect || 0.8;
      if (aspect > maxA) baseScore -= 30;
    } else if (heuristic.expectedAspect === 'square') {
      if (aspect < 0.5 || aspect > 2.0) baseScore -= 30;
    }

    // 3. Reject Scribbles (density check)
    // If drawing covers too much area compared to stroke length
    let totalLength = 0;
    strokes.forEach(stroke => {
      for (let i = 1; i < stroke.length; i++) {
        const dx = stroke[i].x - stroke[i-1].x;
        const dy = stroke[i].y - stroke[i-1].y;
        totalLength += Math.sqrt(dx*dx + dy*dy);
      }
    });
    
    // Density: Length vs bounding box diagonal
    const diag = Math.sqrt(width*width + height*height);
    if (diag > 0 && (totalLength / diag) > 10) {
      // Too dense, likely a scribble
      baseScore -= 50;
    }

    const finalScore = Math.max(0, Math.min(100, baseScore));
    
    let status: 'excellent' | 'correct' | 'almost' | 'fail';
    let text = "";
    
    if (finalScore >= 90) { status = 'excellent'; text = "Excellent"; }
    else if (finalScore >= 85) { status = 'correct'; text = "Correct"; }
    else if (finalScore >= 70) { status = 'almost'; text = "Almost Correct"; }
    else { status = 'fail'; text = "Try Again"; }

    setScore({
      value: finalScore,
      status,
      text,
      hint: status === 'fail' || status === 'almost' ? heuristic.hint : undefined
    });
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // Complete reset
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setStrokes([]);
    setCurrentStroke([]);
    setScore(null);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      // Ensure canvas internal resolution matches CSS resolution * DPR
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    }
  }, []);

  const handleNextMode = () => {
    if (mode === 'practice') {
      setMode('challenge');
      clearCanvas();
    } else {
      if (currentSymbolIndex < operatorsData.length - 1) {
        setCurrentSymbolIndex(prev => prev + 1);
        setMode('practice');
        clearCanvas();
      } else {
        onComplete();
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-8 max-w-6xl mx-auto w-full"
    >
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-4">
          <PenTool className="text-cyan-400 w-10 h-10" /> Symbol Memory Studio
        </h2>
        <div className="flex justify-center gap-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">
           <span className={mode === 'practice' ? 'text-cyan-400' : ''}>1. Practice</span> &rarr; 
           <span className={mode === 'challenge' ? 'text-cyan-400' : ''}>2. Challenge</span>
        </div>
      </div>

      <div className="glass-panel p-8 rounded-3xl w-full flex flex-col md:flex-row gap-12 items-center">
        
        <div className="flex-1 text-center w-full min-h-[300px] flex flex-col justify-center">
           {mode === 'practice' && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
               <h3 className="text-2xl font-semibold mb-2 text-purple-300">Practice Mode</h3>
               <p className="text-gray-400 mb-8">Draw the symbol from memory.</p>
               <h4 className="text-4xl font-bold mb-4">{currentOp.name}</h4>
               <div className="text-6xl text-white/30 font-serif mb-4 select-none">{currentOp.symbol}</div>
             </motion.div>
           )}
           {mode === 'challenge' && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
               <h3 className="text-2xl font-semibold mb-2 text-yellow-300">Challenge Mode</h3>
               <p className="text-gray-400 mb-8">Identify the operator from the description and draw it. No peeking!</p>
               <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 italic text-xl">
                 "{currentOp.meaning}"
               </div>
             </motion.div>
           )}
        </div>

        <div className="flex-1 w-full flex flex-col items-center relative">
          
          <div className="relative mb-6">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              style={{ width: '300px', height: '300px', cursor: 'crosshair', touchAction: 'none' }}
              className={`bg-gray-900 border-2 rounded-xl z-10 relative transition-colors ${score && score.value >= 70 ? 'border-cyan-500 shadow-[0_0_20px_rgba(0,240,255,0.3)]' : 'border-gray-700'}`}
            />
          </div>

          <div className="flex gap-4 w-full max-w-[300px]">
            <button onClick={clearCanvas} className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 rounded-full font-semibold transition-colors">
              Clear
            </button>
            <button 
              onClick={evaluateDrawing}
              disabled={strokes.length === 0}
              className={`flex-1 py-3 rounded-full font-bold transition-all ${strokes.length > 0 ? 'bg-blue-600 hover:bg-blue-500' : 'bg-gray-800 text-gray-600'}`}
            >
              Check
            </button>
          </div>

          <AnimatePresence>
            {score && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className={`mt-6 p-4 rounded-xl w-full max-w-[300px] border ${
                  score.status === 'excellent' ? 'bg-green-500/20 border-green-500 text-green-300' :
                  score.status === 'correct' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' :
                  score.status === 'almost' ? 'bg-yellow-500/20 border-yellow-500 text-yellow-300' :
                  'bg-red-500/20 border-red-500 text-red-300'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="font-bold flex items-center gap-2">
                    {score.status === 'fail' ? <XCircle className="w-5 h-5"/> : score.status === 'almost' ? <AlertCircle className="w-5 h-5"/> : <CheckCircle2 className="w-5 h-5"/>}
                    {score.text}
                  </div>
                  <div className="font-mono">{score.value}% Match</div>
                </div>
                {score.hint && <p className="text-sm opacity-80 mt-2">Hint: {score.hint}</p>}
                
                {score.value >= 70 && (
                  <button onClick={handleNextMode} className="w-full mt-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-center text-sm font-bold flex items-center justify-center gap-2">
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
