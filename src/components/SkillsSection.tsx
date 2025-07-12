interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

interface SkillsSectionProps {
  skillCategories: SkillCategory[];
}

const getLevelColor = (level: Skill['level']) => {
  switch (level) {
    case 'Expert':
      return 'bg-primary';
    case 'Advanced':
      return 'bg-primary/80';
    case 'Intermediate':
      return 'bg-primary/60';
    case 'Beginner':
      return 'bg-primary/40';
    default:
      return 'bg-muted';
  }
};

const getLevelWidth = (level: Skill['level']) => {
  switch (level) {
    case 'Expert':
      return 'w-full';
    case 'Advanced':
      return 'w-4/5';
    case 'Intermediate':
      return 'w-3/5';
    case 'Beginner':
      return 'w-2/5';
    default:
      return 'w-1/5';
  }
};

export const SkillsSection = ({ skillCategories }: SkillsSectionProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {skillCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="bg-card border border-border rounded-lg p-6 shadow-card">
          <h3 className="text-lg font-semibold text-foreground mb-4 text-primary">
            {category.category}
          </h3>
          <div className="space-y-4">
            {category.skills.map((skill, skillIndex) => (
              <div key={skillIndex} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-foreground font-medium">{skill.name}</span>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {skill.level}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${getLevelColor(skill.level)} ${getLevelWidth(skill.level)}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};