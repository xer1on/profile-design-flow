import { Calendar } from "lucide-react";

interface ExperienceItemProps {
  company: string;
  position: string;
  duration: string;
  location?: string;
  description: string[];
}

export const ExperienceItem = ({ 
  company, 
  position, 
  duration, 
  location, 
  description 
}: ExperienceItemProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card hover:shadow-soft transition-shadow duration-300 mb-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-1">
            {position}
          </h3>
          <h4 className="text-lg font-medium text-primary mb-2">
            {company}
          </h4>
          {location && (
            <p className="text-muted-foreground text-sm mb-2">
              {location}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground text-sm bg-muted px-3 py-1 rounded-full">
          <Calendar className="w-4 h-4" />
          {duration}
        </div>
      </div>
      
      <ul className="space-y-2 text-muted-foreground">
        {description.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-primary font-bold mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};