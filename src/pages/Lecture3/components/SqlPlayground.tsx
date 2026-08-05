import { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, HelpCircle } from 'lucide-react';

interface SqlPlaygroundProps {
  initialCode: string;
  onExecute: (code: string) => void;
  onHint: () => void;
  activeHintIndex: number;
  maxHints: number;
  onChange?: (code: string) => void;
}

export default function SqlPlayground({
  initialCode,
  onExecute,
  onHint,
  activeHintIndex,
  maxHints,
  onChange
}: SqlPlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [lineCount, setLineCount] = useState(1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  useEffect(() => {
    const lines = code.split('\n').length;
    setLineCount(lines > 0 ? lines : 1);
  }, [code]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newValue);
      
      // Reset cursor position
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  const handleExecute = () => {
    onExecute(code);
  };

  const handleReset = () => {
    setCode(initialCode);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Editor & Controls */}
      <div className="flex flex-col gap-4">
        <div className="relative rounded-2xl border border-white/10 bg-black/40 shadow-inner py-4 pl-4 min-h-[220px] flex overflow-hidden">
          {/* Line Numbers */}
          <div 
            ref={lineNumbersRef}
            className="flex flex-col text-right text-gray-600 font-mono pr-4 select-none text-sm leading-6 border-r border-white/5 overflow-hidden h-[188px]"
          >
            {Array.from({ length: lineCount }).map((_, idx) => (
              <span key={idx}>{idx + 1}</span>
            ))}
          </div>
          {/* Main Input Textarea */}
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              if (onChange) onChange(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            onScroll={handleScroll}
            className="flex-1 pl-4 pr-4 bg-transparent border-0 outline-none font-mono text-sm leading-6 text-cyan-300 placeholder-gray-600 resize-none h-[188px] w-full focus:ring-0 focus:outline-none overflow-y-auto"
            placeholder="SELECT * FROM Students;"
            spellCheck={false}
          />
        </div>

        {/* Toolbar Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            <button
              onClick={handleExecute}
              className="px-6 py-3 bg-gradient-to-r from-[var(--color-neon-cyan)] to-blue-600 hover:from-[var(--color-neon-cyan)] hover:to-blue-500 text-black font-bold rounded-xl shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current" /> Execute Query
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold rounded-xl active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>

          <button
            onClick={onHint}
            className="px-4 py-3 bg-purple-950/40 border border-purple-500/30 hover:border-purple-500/60 text-purple-300 font-semibold rounded-xl active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" /> 
            {activeHintIndex >= 0 ? `Show Hint ${activeHintIndex + 2}` : "Ask for Hint"} 
            {activeHintIndex >= 0 && <span className="text-xs text-purple-400">({activeHintIndex + 1}/{maxHints})</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
