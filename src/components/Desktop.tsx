import { useState, useEffect } from "react";
import { Window } from "./Window";
import { BootScreen } from "./BootScreen";
import { DesktopIcons } from "./DesktopIcons";
import { Taskbar } from "./Taskbar";

interface OpenWindow {
  id: string;
  title: string;
  content: React.ReactNode;
  isMinimized: boolean;
}

export const Desktop = () => {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [isBooted, setIsBooted] = useState(false);

  // Update time every second with proper cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Boot sequence
  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setIsBooted(true);
    }, 2000);

    return () => clearTimeout(bootTimer);
  }, []);


  const openWindow = (id: string, title: string, content: React.ReactNode) => {
    const existingWindow = openWindows.find(w => w.id === id);
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        setOpenWindows(prev => 
          prev.map(w => w.id === id ? { ...w, isMinimized: false } : w)
        );
      }
      return;
    }

    setOpenWindows(prev => [...prev, { id, title, content, isMinimized: false }]);
  };

  const closeWindow = (id: string) => {
    setOpenWindows(prev => prev.filter(w => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setOpenWindows(prev => 
      prev.map(w => w.id === id ? { ...w, isMinimized: true } : w)
    );
  };

  const restoreWindow = (id: string) => {
    setOpenWindows(prev => 
      prev.map(w => w.id === id ? { ...w, isMinimized: false } : w)
    );
  };

  const getWindowPosition = (index: number) => ({
    x: 50 + (index * 30),
    y: 50 + (index * 30)
  });

  // Show boot screen initially
  if (!isBooted) {
    return <BootScreen />;
  }

  return (
    <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col relative overflow-hidden">
      {/* Desktop Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(34,197,94,0.3)_1px,_transparent_0)] [background-size:20px_20px]" />
      </div>

      {/* Desktop Icons */}
      <DesktopIcons openWindow={openWindow} />

      {/* Windows */}
      {openWindows.map((window, index) => (
        <Window
          key={window.id}
          title={window.title}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onRestore={() => restoreWindow(window.id)}
          defaultPosition={getWindowPosition(index)}
          defaultSize={window.id === 'portfolio' ? { width: 800, height: 600 } : { width: 600, height: 400 }}
          isMinimized={window.isMinimized}
        >
          {window.content}
        </Window>
      ))}

      {/* Taskbar */}
      <Taskbar
        time={time}
        openWindows={openWindows}
        openWindow={openWindow}
        restoreWindow={restoreWindow}
        minimizeWindow={minimizeWindow}
        setIsBooted={setIsBooted}
      />
    </div>
  );
};