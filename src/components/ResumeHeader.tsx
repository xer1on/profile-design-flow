import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";

interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

interface ResumeHeaderProps {
  name: string;
  title: string;
  contact: ContactInfo;
}

export const ResumeHeader = ({ name, title, contact }: ResumeHeaderProps) => {
  return (
    <header className="relative bg-gradient-primary text-primary-foreground p-8 md:p-12 rounded-lg shadow-soft">
      <div className="max-w-4xl mx-auto">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">
            {name}
          </h1>
          <h2 className="text-xl md:text-2xl font-light mb-6 opacity-90">
            {title}
          </h2>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm md:text-base">
            <a 
              href={`mailto:${contact.email}`}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Mail className="w-4 h-4" />
              {contact.email}
            </a>
            
            <a 
              href={`tel:${contact.phone}`}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Phone className="w-4 h-4" />
              {contact.phone}
            </a>
            
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {contact.location}
            </div>
            
            {contact.website && (
              <a 
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <Globe className="w-4 h-4" />
                Website
              </a>
            )}
            
            {contact.linkedin && (
              <a 
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            )}
            
            {contact.github && (
              <a 
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};