import { useState } from "react";
import { Terminal, User, Folder, Settings, Power } from "lucide-react";
import { Window } from "./Window";
import { InteractiveTerminal } from "./InteractiveTerminal";
import { TerminalHeader } from "./TerminalHeader";
import { TerminalSection } from "./TerminalSection";
import { TerminalSkills } from "./TerminalSkills";
import { TerminalEducation } from "./TerminalEducation";
import { ProjectItem } from "./ProjectItem";

interface OpenWindow {
  id: string;
  title: string;
  content: React.ReactNode;
  isMinimized: boolean;
}

export const Desktop = () => {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // Update time every second
  setInterval(() => {
    setTime(new Date().toLocaleTimeString());
  }, 1000);

  const portfolioData = {
    name: "John Doe",
    title: "Full Stack Developer",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    website: "https://johndoe.dev",
    summary: "Passionate full-stack developer with 5+ years of experience building scalable web applications using modern technologies.",
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "React", level: 85 },
      { name: "Node.js", level: 80 },
      { name: "Python", level: 75 },
      { name: "Docker", level: 70 },
      { name: "AWS", level: 65 }
    ],
    experience: [
      {
        title: "Senior Full Stack Developer",
        company: "TechCorp Inc.",
        period: "2022 - Present",
        description: "Lead development of microservices architecture serving 1M+ users. Built React dashboards and REST APIs."
      },
      {
        title: "Full Stack Developer",
        company: "StartupXYZ",
        period: "2020 - 2022",
        description: "Developed e-commerce platform from scratch. Implemented real-time features and payment integration."
      }
    ],
    projects: [
      {
        name: "E-Commerce Platform",
        description: "Full-stack e-commerce solution with React, Node.js, and PostgreSQL",
        technologies: ["React", "Node.js", "PostgreSQL", "Docker"],
        link: "https://github.com/johndoe/ecommerce",
        status: "Production"
      },
      {
        name: "Real-time Chat App",
        description: "WebSocket-based chat application with user authentication",
        technologies: ["React", "Socket.io", "Express", "MongoDB"],
        link: "https://github.com/johndoe/chat-app",
        status: "Complete"
      }
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        school: "University of Technology",
        year: "2018",
        gpa: "3.8/4.0"
      }
    ]
  };

  const openWindow = (id: string, title: string, content: React.ReactNode) => {
    const existingWindow = openWindows.find(w => w.id === id);
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        setOpenWindows(prev => 
          prev.map(w => w.id === id ? { ...w, isMinimized: false } : w)
        );
      }
      return;
    }

    setOpenWindows(prev => [...prev, { id, title, content, isMinimized: false }]);
  };

  const closeWindow = (id: string) => {
    setOpenWindows(prev => prev.filter(w => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setOpenWindows(prev => 
      prev.map(w => w.id === id ? { ...w, isMinimized: true } : w)
    );
  };

  const restoreWindow = (id: string) => {
    setOpenWindows(prev => 
      prev.map(w => w.id === id ? { ...w, isMinimized: false } : w)
    );
  };

  const getWindowPosition = (index: number) => ({
    x: 50 + (index * 30),
    y: 50 + (index * 30)
  });

  return (
    <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col relative overflow-hidden">
      {/* Desktop Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(34,197,94,0.3)_1px,_transparent_0)] [background-size:20px_20px]" />
      </div>

      {/* Desktop Icons */}
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

      {/* Windows */}
      {openWindows.map((window, index) => (
        <Window
          key={window.id}
          title={window.title}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onRestore={() => restoreWindow(window.id)}
          defaultPosition={getWindowPosition(index)}
          defaultSize={window.id === 'portfolio' ? { width: 800, height: 600 } : { width: 600, height: 400 }}
          isMinimized={window.isMinimized}
        >
          {window.content}
        </Window>
      ))}

      {/* Taskbar */}
      <div className="h-12 bg-terminal-bg border-t border-terminal-green flex items-center justify-between px-4">
        {/* Start Menu / Logo */}
        <div className="flex items-center gap-4">
          <div className="text-terminal-green font-mono font-bold">◉ Portfolio OS</div>
          
          {/* Open Windows */}
          <div className="flex gap-2">
            {openWindows.map(window => (
              <button
                key={window.id}
                onClick={() => window.isMinimized ? restoreWindow(window.id) : minimizeWindow(window.id)}
                className={`px-3 py-1 rounded text-xs font-mono border ${
                  window.isMinimized 
                    ? 'border-terminal-green/50 text-terminal-green-dim'
                    : 'border-terminal-green text-terminal-green bg-terminal-green/10'
                }`}
              >
                {window.title}
              </button>
            ))}
          </div>
        </div>

        {/* System Tray */}
        <div className="flex items-center gap-4">
          <div className="text-terminal-green font-mono text-sm">{time}</div>
          <button className="text-terminal-green hover:text-terminal-green-bright">
            <Settings className="w-4 h-4" />
          </button>
          <button className="text-terminal-red hover:text-terminal-red/80">
            <Power className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};