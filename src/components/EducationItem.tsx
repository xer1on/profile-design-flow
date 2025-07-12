import { GraduationCap, Calendar } from "lucide-react";

interface EducationItemProps {
  institution: string;
  degree: string;
  field: string;
  duration: string;
  gpa?: string;
  achievements?: string[];
}

export const EducationItem = ({ 
  institution, 
  degree, 
  field, 
  duration, 
  gpa,
  achievements 
}: EducationItemProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card hover:shadow-soft transition-shadow duration-300 mb-4">
      <div className="flex items-start gap-4">
        <div className="bg-primary/10 p-3 rounded-full">
          <GraduationCap className="w-6 h-6 text-primary" />
        </div>
        
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-1">
                {degree} in {field}
              </h3>
              <h4 className="text-lg font-medium text-primary mb-2">
                {institution}
              </h4>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm bg-muted px-3 py-1 rounded-full">
              <Calendar className="w-4 h-4" />
              {duration}
            </div>
          </div>
          
          {gpa && (
            <p className="text-muted-foreground mb-3">
              <span className="font-medium">GPA:</span> {gpa}
            </p>
          )}
          
          {achievements && achievements.length > 0 && (
            <ul className="space-y-1 text-muted-foreground">
              {achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};