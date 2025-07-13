import { useState, useRef, useEffect } from "react";
import { Minus, Square, X } from "lucide-react";

interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  isMinimized?: boolean;
  onRestore?: () => void;
}

export const Window = ({ 
  title, 
  children, 
  onClose, 
  onMinimize, 
  defaultPosition = { x: 100, y: 100 },
  defaultSize = { width: 600, height: 400 },
  isMinimized = false,
  onRestore
}: WindowProps) => {
  const [position, setPosition] = useState(defaultPosition);
  const [size, setSize] = useState(defaultSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return;
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: Math.max(0, Math.min(window.innerWidth - size.width, e.clientX - dragStart.x)),
          y: Math.max(0, Math.min(window.innerHeight - size.height, e.clientY - dragStart.y))
        });
      } else if (isResizing) {
        const newWidth = Math.max(300, resizeStart.width + (e.clientX - resizeStart.x));
        const newHeight = Math.max(200, resizeStart.height + (e.clientY - resizeStart.y));
        
        setSize({
          width: Math.min(window.innerWidth - position.x, newWidth),
          height: Math.min(window.innerHeight - position.y, newHeight)
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, resizeStart, position, size]);

  if (isMinimized) return null;

  return (
    <div
      ref={windowRef}
      className="fixed bg-terminal-bg border border-terminal-green rounded-lg shadow-2xl shadow-terminal-green/20 z-10 flex flex-col overflow-hidden"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
    >
      {/* Title Bar */}
      <div
        className="bg-terminal-green/10 border-b border-terminal-green flex items-center justify-between p-2 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
      >
        <span className="text-terminal-green font-mono text-sm">{title}</span>
        <div className="window-controls flex items-center gap-2">
          <button
            onClick={onMinimize}
            className="w-4 h-4 rounded-full bg-terminal-amber hover:bg-terminal-amber/80 flex items-center justify-center"
          >
            <Minus className="w-2 h-2 text-black" />
          </button>
          <button
            onClick={() => {}}
            className="w-4 h-4 rounded-full bg-terminal-green hover:bg-terminal-green/80 flex items-center justify-center"
          >
            <Square className="w-2 h-2 text-black" />
          </button>
          <button
            onClick={onClose}
            className="w-4 h-4 rounded-full bg-terminal-red hover:bg-terminal-red/80 flex items-center justify-center"
          >
            <X className="w-2 h-2 text-black" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>

      {/* Resize Handle */}
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
        onMouseDown={handleResizeMouseDown}
      >
        <div className="absolute bottom-1 right-1 w-0 h-0 border-l-4 border-b-4 border-l-transparent border-b-terminal-green/50" />
      </div>
    </div>
  );
};