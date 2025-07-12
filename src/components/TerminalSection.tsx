import { ReactNode } from "react";
import { TerminalPrompt } from "./TerminalEffects";

interface TerminalSectionProps {
  title: string;
  children: ReactNode;
  command?: string;
  className?: string;
}

export const TerminalSection = ({ 
  title, 
  children, 
  command,
  className = "" 
}: TerminalSectionProps) => {
  const defaultCommand = command || `ls -la /${title.toLowerCase().replace(/\s+/g, '_')}`;
  
  return (
    <section className={`mb-8 ${className}`}>
      <div className="bg-terminal-bg border border-terminal-green rounded-lg p-6 shadow-terminal">
        <TerminalPrompt command={defaultCommand} className="mb-4" />
        <div className="pl-4">
          <h2 className="text-xl font-bold text-terminal-green-bright terminal-glow mb-4 font-mono">
            {title.toUpperCase()}
          </h2>
          {children}
        </div>
      </div>
    </section>
  );
};