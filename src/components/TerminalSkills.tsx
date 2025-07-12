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

const getSkillBar = (level: number) => {
  const filled = Math.floor(level);
  const bars = '█'.repeat(filled) + '░'.repeat(10 - filled);
  return bars;
};

const getSkillColor = (level: number) => {
  if (level >= 8) return 'text-terminal-green-bright';
  if (level >= 6) return 'text-terminal-green';
  if (level >= 4) return 'text-terminal-amber';
  return 'text-terminal-green-dim';
};

export const TerminalSkills = ({ skillCategories }: TerminalSkillsProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {skillCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="bg-card border border-terminal-green rounded p-4">
          <h3 className="text-terminal-green-bright font-bold mb-3 font-mono terminal-glow">
            ./{category.category.toLowerCase().replace(/\s+/g, '_')}
          </h3>
          <div className="space-y-2 font-mono text-sm">
            {category.skills.map((skill, skillIndex) => (
              <div key={skillIndex} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-terminal-green">{skill.name}</span>
                  <span className="text-terminal-green-dim text-xs">
                    [{skill.level}/10]
                  </span>
                </div>
                <div className={`text-xs ${getSkillColor(skill.level)}`}>
                  {getSkillBar(skill.level)}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};