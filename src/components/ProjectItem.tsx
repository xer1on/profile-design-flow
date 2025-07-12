import { Calendar, Folder } from "lucide-react";

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
  return (
    <div className="bg-card border border-terminal-green rounded p-4 mb-4 font-mono hover:shadow-glow transition-all duration-300">
      <div className="flex items-start gap-3 mb-3">
        <Folder className="w-5 h-5 text-terminal-amber mt-1" />
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
            <div>
              <h3 className="text-lg font-bold text-terminal-green-bright terminal-glow">
                {role}
              </h3>
              <h4 className="text-terminal-green mb-1">
                @ {name}
              </h4>
              {location && (
                <p className="text-terminal-green-dim text-sm">
                  📍 {location}
                </p>
              )}
            </div>
            <div className="flex items-center gap-1 text-terminal-green-dim text-sm bg-muted px-2 py-1 rounded">
              <Calendar className="w-3 h-3" />
              {duration}
            </div>
          </div>
          
          <div className="space-y-1 text-terminal-green text-sm mb-3">
            {description.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-terminal-green-bright">▸</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          {technologies && technologies.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="text-xs bg-terminal-green text-terminal-bg px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};