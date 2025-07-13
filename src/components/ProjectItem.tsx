import { useState } from "react";
import { Calendar, Folder, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

interface ProjectItemProps {
  name: string;
  role: string;
  duration: string;
  location?: string;
  description: string[];
  technologies?: string[];
}

export const ProjectItem = ({ 
  name, 
  role, 
  duration, 
  location, 
  description,
  technologies 
}: ProjectItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-card border border-terminal-green rounded p-4 mb-4 font-mono hover:shadow-glow hover:border-terminal-green-bright transition-all duration-300 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start gap-3 mb-3">
        <Folder className={`w-5 h-5 mt-1 transition-all duration-300 ${isHovered ? 'text-terminal-green-bright scale-110' : 'text-terminal-amber'}`} />
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className={`text-lg font-bold terminal-glow transition-all duration-300 ${isHovered ? 'text-terminal-green-bright scale-105' : 'text-terminal-green-bright'}`}>
                  {role}
                </h3>
                <ExternalLink className={`w-4 h-4 transition-all duration-300 ${isHovered ? 'text-terminal-green-bright opacity-100' : 'text-terminal-green-dim opacity-0'}`} />
              </div>
              <h4 className={`mb-1 transition-colors duration-300 ${isHovered ? 'text-terminal-green-bright' : 'text-terminal-green'}`}>
                @ {name}
              </h4>
              {location && (
                <p className="text-terminal-green-dim text-sm">
                  📍 {location}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-terminal-green-dim text-sm bg-muted px-2 py-1 rounded">
                <Calendar className="w-3 h-3" />
                {duration}
              </div>
              <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                <ChevronDown className="w-4 h-4 text-terminal-green-dim" />
              </div>
            </div>
          </div>
          
          <div className={`space-y-1 text-terminal-green text-sm mb-3 transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-20 opacity-70'}`}>
            {description.map((item, index) => (
              <div 
                key={index} 
                className={`flex items-start gap-2 transition-all duration-300 ${isExpanded ? 'animate-fade-in' : ''}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className={`transition-colors duration-300 ${isHovered ? 'text-terminal-green-bright' : 'text-terminal-green-bright'}`}>
                  ▸
                </span>
                <span className={isExpanded ? 'group-hover:text-terminal-green-bright transition-colors' : ''}>{item}</span>
              </div>
            ))}
          </div>

          {technologies && technologies.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {technologies.map((tech, index) => (
                <span 
                  key={index}
                  className={`text-xs px-2 py-1 rounded transition-all duration-300 cursor-pointer ${
                    isHovered 
                      ? 'bg-terminal-green-bright text-terminal-bg hover:scale-110 terminal-glow' 
                      : 'bg-terminal-green text-terminal-bg hover:bg-terminal-green-bright'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {isExpanded && (
            <div className="mt-3 pt-3 border-t border-terminal-green-dim">
              <div className="text-xs text-terminal-green-dim animate-fade-in">
                ► Click technologies to filter projects • Press ESC to collapse
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};