import { useEffect, useState } from "react";

interface ConsoleLoaderProps {
  onComplete: () => void;
}

export const ConsoleLoader = ({ onComplete }: ConsoleLoaderProps) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const bootSequence = [
    "Initializing portfolio system...",
    "Loading personal data...",
    "Checking authentication credentials...", 
    "Mounting filesystem...",
    "Starting user interface services...",
    "Loading project repositories...",
    "Scanning for available skills...",
    "Establishing network connections...",
    "Portfolio system ready.",
    "Welcome to the terminal portfolio!"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentLine < bootSequence.length - 1) {
        setCurrentLine(currentLine + 1);
      } else {
        setTimeout(onComplete, 1000);
      }
    }, Math.random() * 500 + 200);

    return () => clearTimeout(timer);
  }, [currentLine, onComplete, bootSequence.length]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <div className="fixed inset-0 bg-terminal-bg z-50 flex items-center justify-center font-mono">
      <div className="max-w-2xl w-full p-8">
        <div className="space-y-1">
          {bootSequence.slice(0, currentLine + 1).map((line, index) => (
            <div key={index} className="text-terminal-green text-sm md:text-base">
              <span className="text-terminal-green-dim">$</span> {line}
              {index === currentLine && (
                <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>
                  █
                </span>
              )}
              {index < currentLine && <span className="text-terminal-green-bright"> ✓</span>}
            </div>
          ))}
        </div>
        
        <div className="mt-8">
          <div className="bg-muted h-2 rounded overflow-hidden">
            <div 
              className="h-full bg-terminal-green transition-all duration-300 terminal-glow"
              style={{ width: `${((currentLine + 1) / bootSequence.length) * 100}%` }}
            />
          </div>
          <div className="text-terminal-green-dim text-xs mt-2 text-center">
            {Math.round(((currentLine + 1) / bootSequence.length) * 100)}% complete
          </div>
        </div>
      </div>
    </div>
  );
};