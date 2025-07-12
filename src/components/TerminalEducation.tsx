import { GraduationCap, Calendar, Award } from "lucide-react";

interface EducationItemProps {
  institution: string;
  degree: string;
  field: string;
  duration: string;
  gpa?: string;
  achievements?: string[];
}

export const TerminalEducation = ({ 
  institution, 
  degree, 
  field, 
  duration, 
  gpa,
  achievements 
}: EducationItemProps) => {
  return (
    <div className="bg-card border border-terminal-green rounded p-4 mb-4 font-mono hover:shadow-glow transition-all duration-300">
      <div className="flex items-start gap-3">
        <GraduationCap className="w-5 h-5 text-terminal-blue mt-1" />
        
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
            <div>
              <h3 className="text-lg font-bold text-terminal-green-bright terminal-glow">
                {degree}
              </h3>
              <h4 className="text-terminal-green mb-1">
                {field} @ {institution}
              </h4>
            </div>
            <div className="flex items-center gap-1 text-terminal-green-dim text-sm bg-muted px-2 py-1 rounded">
              <Calendar className="w-3 h-3" />
              {duration}
            </div>
          </div>
          
          {gpa && (
            <div className="text-terminal-green-dim text-sm mb-2">
              <span className="text-terminal-green">GPA:</span> {gpa}
            </div>
          )}
          
          {achievements && achievements.length > 0 && (
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-terminal-amber text-sm">
                <Award className="w-4 h-4" />
                <span>Achievements:</span>
              </div>
              <ul className="space-y-1 text-terminal-green text-sm ml-6">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-terminal-green-bright">▸</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};