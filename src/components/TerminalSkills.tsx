import { useState } from "react";

interface Skill {
  name: string;
  level: number; // 1-10 scale
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

interface TerminalSkillsProps {
  skillCategories: SkillCategory[];
}

const getSkillBar = (level: number, isHovered: boolean = false) => {
  const filled = Math.floor(level);
  const bars = '█'.repeat(filled) + '░'.repeat(10 - filled);
  return bars;
};

const getSkillColor = (level: number, isHovered: boolean = false) => {
  const baseColor = level >= 8 ? 'text-terminal-green-bright' :
                   level >= 6 ? 'text-terminal-green' :
                   level >= 4 ? 'text-terminal-amber' :
                   'text-terminal-green-dim';
  
  return isHovered ? `${baseColor} terminal-glow animate-pulse` : baseColor;
};

export const TerminalSkills = ({ skillCategories }: TerminalSkillsProps) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const handleSkillClick = (skillName: string) => {
    console.log(`Skill clicked: ${skillName}`);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {skillCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="bg-card border border-terminal-green rounded p-4 hover:border-terminal-green-bright transition-all duration-300 hover:shadow-glow">
          <h3 className="text-terminal-green-bright font-bold mb-3 font-mono terminal-glow hover:scale-105 transition-transform cursor-pointer">
            ./{category.category.toLowerCase().replace(/\s+/g, '_')}
          </h3>
          <div className="space-y-2 font-mono text-sm">
            {category.skills.map((skill, skillIndex) => {
              const skillKey = `${categoryIndex}-${skillIndex}`;
              const isHovered = hoveredSkill === skillKey;
              
              return (
                <div 
                  key={skillIndex} 
                  className="space-y-1 p-2 rounded hover:bg-terminal-bg/30 transition-all duration-300 cursor-pointer group"
                  onMouseEnter={() => setHoveredSkill(skillKey)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  onClick={() => handleSkillClick(skill.name)}
                >
                  <div className="flex justify-between items-center">
                    <span className={`text-terminal-green group-hover:text-terminal-green-bright transition-colors ${isHovered ? 'transform translate-x-1' : ''}`}>
                      {isHovered ? '▸ ' : ''}{skill.name}
                    </span>
                    <span className={`text-terminal-green-dim text-xs transition-all duration-300 ${isHovered ? 'text-terminal-green scale-110' : ''}`}>
                      [{skill.level}/10]
                    </span>
                  </div>
                  <div className={`text-xs transition-all duration-300 ${getSkillColor(skill.level, isHovered)} ${isHovered ? 'transform scale-105' : ''}`}>
                    {getSkillBar(skill.level, isHovered)}
                  </div>
                  {isHovered && (
                    <div className="text-xs text-terminal-green-dim animate-fade-in">
                      ► Click to view projects using {skill.name}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};