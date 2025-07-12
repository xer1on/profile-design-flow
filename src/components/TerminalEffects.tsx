import { useEffect, useState } from "react";

interface TypingAnimationProps {
  text: string;
  speed?: number;
  className?: string;
  showCursor?: boolean;
}

export const TypingAnimation = ({ 
  text, 
  speed = 50, 
  className = "", 
  showCursor = true 
}: TypingAnimationProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayText("");
    setIsComplete(false);
    
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && !isComplete && (
        <span className="terminal-cursor text-terminal-green-bright">█</span>
      )}
    </span>
  );
};

interface TerminalPromptProps {
  user?: string;
  host?: string;
  path?: string;
  command: string;
  className?: string;
}

export const TerminalPrompt = ({ 
  user = "visitor", 
  host = "portfolio", 
  path = "~", 
  command,
  className = "" 
}: TerminalPromptProps) => {
  return (
    <div className={`font-mono text-sm ${className}`}>
      <span className="text-terminal-green-bright">{user}@{host}</span>
      <span className="text-foreground">:</span>
      <span className="text-terminal-blue">{path}</span>
      <span className="text-foreground">$ </span>
      <TypingAnimation text={command} speed={30} />
    </div>
  );
};