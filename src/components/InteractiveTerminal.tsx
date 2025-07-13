import { useState, useEffect, useRef } from "react";
import { TerminalPrompt } from "./TerminalEffects";

interface Command {
  command: string;
  output: string;
  type?: 'success' | 'error' | 'info';
}

export const InteractiveTerminal = () => {
  const [commands, setCommands] = useState<Command[]>([
    { command: "ls -la", output: "total 8\ndrwxr-xr-x  portfolio/\ndrwxr-xr-x  projects/\ndrwxr-xr-x  skills/\n-rw-r--r--  about.txt\n-rw-r--r--  contact.txt", type: 'success' },
  ]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const availableCommands = {
    help: "Available commands:\n  help     - Show this help message\n  clear    - Clear terminal\n  whoami   - Display user info\n  pwd      - Show current directory\n  ls       - List directory contents\n  cat      - Display file contents\n  echo     - Display text\n  date     - Show current date\n  contact  - Show contact information",
    clear: "",
    whoami: "visitor@portfolio.dev",
    pwd: "/home/portfolio",
    ls: "about.txt  contact.txt  projects/  skills/  education/",
    date: new Date().toString(),
    contact: "📧 john.doe@example.com\n📞 +1 (555) 123-4567\n🌐 https://johndoe.dev\n💼 LinkedIn: /in/johndoe\n🐙 GitHub: /johndoe",
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output = "";
    let type: Command['type'] = 'success';

    if (trimmedCmd === 'clear') {
      setCommands([]);
      return;
    }

    if (trimmedCmd.startsWith('echo ')) {
      output = cmd.substring(5);
    } else if (trimmedCmd.startsWith('cat ')) {
      const filename = cmd.substring(4).trim();
      if (filename === 'about.txt') {
        output = "Passionate developer with 5+ years of experience crafting efficient solutions using modern technologies. Specializing in React, Node.js, and cloud architecture.";
      } else if (filename === 'contact.txt') {
        output = availableCommands.contact;
      } else {
        output = `cat: ${filename}: No such file or directory`;
        type = 'error';
      }
    } else if (availableCommands[trimmedCmd as keyof typeof availableCommands]) {
      output = availableCommands[trimmedCmd as keyof typeof availableCommands];
    } else if (trimmedCmd) {
      output = `bash: ${trimmedCmd}: command not found\nType 'help' for available commands`;
      type = 'error';
    }

    if (output !== undefined) {
      setCommands(prev => [...prev, { command: cmd, output, type }]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentCommand.trim()) {
      setIsTyping(true);
      setTimeout(() => {
        executeCommand(currentCommand);
        setCurrentCommand("");
        setIsTyping(false);
      }, 300);
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const getOutputColor = (type?: Command['type']) => {
    switch (type) {
      case 'error':
        return 'text-terminal-red';
      case 'success':
        return 'text-terminal-green';
      case 'info':
        return 'text-terminal-amber';
      default:
        return 'text-terminal-green';
    }
  };

  return (
    <div className="bg-terminal-bg border border-terminal-green rounded-lg p-4 h-96 flex flex-col">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-terminal-green">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
          <div className="w-3 h-3 rounded-full bg-terminal-amber"></div>
          <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
        </div>
        <span className="text-terminal-green-dim text-sm font-mono ml-2">interactive-terminal</span>
      </div>

      <div ref={terminalRef} className="flex-1 overflow-y-auto font-mono text-sm space-y-2">
        <div className="text-terminal-green-dim mb-2">
          Welcome to the interactive terminal! Type 'help' for available commands.
        </div>
        
        {commands.map((cmd, index) => (
          <div key={index} className="space-y-1">
            <TerminalPrompt command={cmd.command} className="text-sm" />
            {cmd.output && (
              <div className={`pl-4 whitespace-pre-wrap ${getOutputColor(cmd.type)}`}>
                {cmd.output}
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-center gap-2 text-terminal-green-dim">
            <span className="animate-spin">⏳</span>
            <span>Processing...</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
        <span className="text-terminal-green font-mono text-sm">visitor@portfolio:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          className="flex-1 bg-transparent text-terminal-green font-mono text-sm outline-none border-none"
          placeholder="Type a command..."
          autoComplete="off"
        />
        <span className="text-terminal-green-bright animate-pulse">█</span>
      </form>
    </div>
  );
};