import { Mail, Phone, MapPin, Github, Linkedin, Globe, Terminal } from "lucide-react";
import { TerminalPrompt } from "./TerminalEffects";

interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

interface TerminalHeaderProps {
  name: string;
  title: string;
  contact: ContactInfo;
}

export const TerminalHeader = ({ name, title, contact }: TerminalHeaderProps) => {
  return (
    <div className="bg-terminal-bg border border-terminal-green p-6 rounded-lg shadow-terminal mb-8">
      {/* Terminal header bar */}
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-terminal-green">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
          <div className="w-3 h-3 rounded-full bg-terminal-amber"></div>
          <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <Terminal className="w-4 h-4 text-terminal-green" />
          <span className="text-terminal-green-dim text-sm font-mono">portfolio@terminal</span>
        </div>
      </div>

      {/* Terminal content */}
      <div className="font-mono space-y-2">
        <TerminalPrompt command="whoami" />
        <div className="pl-4 text-terminal-green-bright terminal-glow">
          <div className="text-2xl md:text-4xl font-bold mb-2">{name}</div>
          <div className="text-lg md:text-xl text-terminal-green mb-4">{title}</div>
        </div>

        <TerminalPrompt command="cat /usr/local/contact.txt" />
        <div className="pl-4 space-y-1 text-terminal-green">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <a href={`mailto:${contact.email}`} className="hover:text-terminal-green-bright transition-colors">
              {contact.email}
            </a>
          </div>
          
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <a href={`tel:${contact.phone}`} className="hover:text-terminal-green-bright transition-colors">
              {contact.phone}
            </a>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{contact.location}</span>
          </div>
          
          {contact.website && (
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <a 
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-terminal-green-bright transition-colors"
              >
                {contact.website.replace('https://', '')}
              </a>
            </div>
          )}
          
          {contact.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin className="w-4 h-4" />
              <a 
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-terminal-green-bright transition-colors"
              >
                LinkedIn Profile
              </a>
            </div>
          )}
          
          {contact.github && (
            <div className="flex items-center gap-2">
              <Github className="w-4 h-4" />
              <a 
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-terminal-green-bright transition-colors"
              >
                GitHub Profile
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};