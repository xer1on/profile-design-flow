import { Terminal, Settings, Power } from "lucide-react";
import { InteractiveTerminal } from "./InteractiveTerminal";

interface OpenWindow {
  id: string;
  title: string;
  content: React.ReactNode;
  isMinimized: boolean;
}

interface TaskbarProps {
  time: string;
  openWindows: OpenWindow[];
  openWindow: (id: string, title: string, content: React.ReactNode) => void;
  restoreWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  setIsBooted: (booted: boolean) => void;
}

export const Taskbar = ({ 
  time, 
  openWindows, 
  openWindow, 
  restoreWindow, 
  minimizeWindow,
  setIsBooted 
}: TaskbarProps) => {
  return (
    <div className="h-12 bg-terminal-bg border-t border-terminal-green flex items-center justify-between px-4">
      {/* Start Menu / Logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => openWindow('terminal', 'Terminal', <InteractiveTerminal />)}
          className="flex items-center gap-2 px-3 py-1 rounded border border-terminal-green text-terminal-green hover:bg-terminal-green/10 transition-colors"
        >
          <Terminal className="w-4 h-4" />
          <span className="font-mono text-sm">Terminal</span>
        </button>
        
        {/* Open Windows */}
        <div className="flex gap-2">
          {openWindows.map(window => (
            <button
              key={window.id}
              onClick={() => window.isMinimized ? restoreWindow(window.id) : minimizeWindow(window.id)}
              className={`px-3 py-1 rounded text-xs font-mono border ${
                window.isMinimized 
                  ? 'border-terminal-green/50 text-terminal-green-dim'
                  : 'border-terminal-green text-terminal-green bg-terminal-green/10'
              }`}
            >
              {window.title}
            </button>
          ))}
        </div>
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-4">
        <div className="text-terminal-green font-mono text-sm">{time}</div>
        <button 
          onClick={() => openWindow('settings', 'System Settings', (
            <div className="p-4 text-terminal-green font-mono">
              <h3 className="text-lg mb-4">System Settings</h3>
              <div className="space-y-2">
                <div>Display: 1920x1080</div>
                <div>Memory: 16GB RAM</div>
                <div>Storage: 512GB SSD</div>
                <div>Network: Connected</div>
                <div>Theme: Matrix Green</div>
              </div>
            </div>
          ))}
          className="text-terminal-green hover:text-terminal-green-bright transition-colors"
        >
          <Settings className="w-4 h-4" />
        </button>
        <button 
          onClick={() => {
            if (confirm("Are you sure you want to shutdown the system?")) {
              setIsBooted(false);
              setTimeout(() => setIsBooted(true), 3000);
            }
          }}
          className="text-terminal-red hover:text-terminal-red/80 transition-colors"
        >
          <Power className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};