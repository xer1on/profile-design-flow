import { Terminal, User, Folder } from "lucide-react";
import { InteractiveTerminal } from "./InteractiveTerminal";
import { TerminalHeader } from "./TerminalHeader";
import { TerminalSection } from "./TerminalSection";
import { TerminalSkills } from "./TerminalSkills";
import { TerminalEducation } from "./TerminalEducation";
import { ProjectItem } from "./ProjectItem";
import { portfolioData } from "../data/portfolioData";

interface DesktopIconsProps {
  openWindow: (id: string, title: string, content: React.ReactNode) => void;
}

export const DesktopIcons = ({ openWindow }: DesktopIconsProps) => {
  return (
    <div className="flex-1 p-4">
      <div className="grid grid-cols-1 gap-4 w-20">
        <button
          onClick={() => openWindow('terminal', 'Terminal', <InteractiveTerminal />)}
          className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-terminal-green/10 text-terminal-green group"
        >
          <Terminal className="w-8 h-8 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-mono">Terminal</span>
        </button>

        <button
          onClick={() => openWindow('portfolio', 'Portfolio', (
            <div className="p-6 space-y-6 h-full overflow-auto">
              <TerminalHeader 
                name={portfolioData.name}
                title={portfolioData.title}
                contact={{
                  email: portfolioData.email,
                  phone: portfolioData.phone,
                  location: portfolioData.location,
                  website: portfolioData.website,
                  linkedin: portfolioData.linkedin,
                  github: portfolioData.github
                }}
              />
              
              <TerminalSection title="Experience">
                <div className="space-y-4">
                  {portfolioData.experience.map((exp, index) => (
                    <div key={index} className="border-l-2 border-terminal-green pl-4">
                      <h3 className="text-terminal-green font-semibold">{exp.title}</h3>
                      <p className="text-terminal-green-dim">{exp.company} • {exp.period}</p>
                      <p className="text-terminal-green-dim text-sm mt-1">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </TerminalSection>

              <TerminalSkills skillCategories={[
                {
                  category: "Programming Languages",
                  skills: portfolioData.skills.slice(0, 3)
                },
                {
                  category: "Technologies & Tools", 
                  skills: portfolioData.skills.slice(3)
                }
              ]} />

              <TerminalSection title="Projects">
                <div className="grid gap-4">
                  {portfolioData.projects.map((project, index) => (
                    <ProjectItem 
                      key={index} 
                      name={project.name}
                      role={project.name}
                      duration={project.status}
                      description={[project.description]}
                      technologies={project.technologies}
                    />
                  ))}
                </div>
              </TerminalSection>

              {portfolioData.education.map((edu, index) => (
                <TerminalEducation 
                  key={index}
                  institution={edu.school}
                  degree={edu.degree}
                  field="Computer Science"
                  duration={edu.year}
                  gpa={edu.gpa}
                />
              ))}
            </div>
          ))}
          className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-terminal-green/10 text-terminal-green group"
        >
          <User className="w-8 h-8 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-mono">Portfolio</span>
        </button>

        <button
          onClick={() => openWindow('files', 'File Manager', (
            <div className="p-4">
              <div className="text-terminal-green font-mono">
                <div className="mb-4">📁 /home/user</div>
                <div className="space-y-2">
                  <div className="hover:bg-terminal-green/10 p-2 rounded">📄 resume.pdf</div>
                  <div className="hover:bg-terminal-green/10 p-2 rounded">📁 projects/</div>
                  <div className="hover:bg-terminal-green/10 p-2 rounded">📁 documents/</div>
                  <div className="hover:bg-terminal-green/10 p-2 rounded">📁 downloads/</div>
                </div>
              </div>
            </div>
          ))}
          className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-terminal-green/10 text-terminal-green group"
        >
          <Folder className="w-8 h-8 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-mono">Files</span>
        </button>
      </div>
    </div>
  );
};