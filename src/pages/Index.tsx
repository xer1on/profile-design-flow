import { useState } from "react";
import { ConsoleLoader } from "@/components/ConsoleLoader";
import { TerminalHeader } from "@/components/TerminalHeader";
import { TerminalSection } from "@/components/TerminalSection";
import { ProjectItem } from "@/components/ProjectItem";
import { TerminalEducation } from "@/components/TerminalEducation";
import { TerminalSkills } from "@/components/TerminalSkills";
import { TypingAnimation } from "@/components/TerminalEffects";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Portfolio data - customize with your information
  const portfolioData = {
    personalInfo: {
      name: "John Doe",
      title: "Full Stack Developer & Linux Enthusiast",
      contact: {
        email: "john.doe@example.com", 
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        website: "https://johndoe.dev",
        linkedin: "https://linkedin.com/in/johndoe",
        github: "https://github.com/johndoe"
      }
    },
    about: "Passionate developer with 5+ years of experience crafting efficient solutions using modern technologies. Specializing in React, Node.js, and cloud architecture. Love working in terminal environments and contributing to open-source projects.",
    projects: [
      {
        name: "TechCorp Solutions",
        role: "Senior Full Stack Developer",
        duration: "2022 - Present",
        location: "Remote",
        technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker", "AWS"],
        description: [
          "Architected scalable microservices serving 50,000+ daily users",
          "Implemented CI/CD pipelines reducing deployment time by 60%",
          "Led team of 4 developers using agile methodologies",
          "Built real-time chat system using WebSocket and Redis"
        ]
      },
      {
        name: "StartupXYZ",
        role: "Frontend Developer",
        duration: "2020 - 2022",
        location: "New York, NY",
        technologies: ["React", "Next.js", "TailwindCSS", "GraphQL", "Jest"],
        description: [
          "Developed responsive web applications with 99.9% uptime",
          "Optimized bundle size reducing load times by 40%",
          "Implemented automated testing increasing code coverage to 85%",
          "Collaborated with design team for pixel-perfect implementations"
        ]
      },
      {
        name: "FreelanceHub",
        role: "Web Developer",
        duration: "2019 - 2020",
        location: "Los Angeles, CA", 
        technologies: ["JavaScript", "PHP", "MySQL", "WordPress", "Git"],
        description: [
          "Built custom WordPress themes and plugins for clients",
          "Managed hosting and deployment for 20+ client websites",
          "Implemented SEO best practices improving search rankings",
          "Provided technical support and maintenance services"
        ]
      }
    ],
    education: [
      {
        institution: "University of California, Berkeley",
        degree: "Bachelor of Science",
        field: "Computer Science",
        duration: "2015 - 2019",
        gpa: "3.8/4.0",
        achievements: [
          "Magna Cum Laude graduate",
          "ACM Programming Contest finalist",
          "Open source contributor - 100+ GitHub contributions",
          "Teaching Assistant for Data Structures course"
        ]
      }
    ],
    skills: [
      {
        category: "Frontend Development",
        skills: [
          { name: "React/Next.js", level: 9 },
          { name: "TypeScript", level: 8 },
          { name: "TailwindCSS", level: 9 },
          { name: "JavaScript", level: 10 },
          { name: "HTML/CSS", level: 10 }
        ]
      },
      {
        category: "Backend Development", 
        skills: [
          { name: "Node.js", level: 8 },
          { name: "Python", level: 7 },
          { name: "PostgreSQL", level: 7 },
          { name: "MongoDB", level: 6 },
          { name: "REST APIs", level: 9 }
        ]
      },
      {
        category: "DevOps & Tools",
        skills: [
          { name: "Git/GitHub", level: 10 },
          { name: "Docker", level: 7 },
          { name: "AWS/Cloud", level: 6 },
          { name: "Linux/Bash", level: 8 },
          { name: "CI/CD", level: 7 }
        ]
      },
      {
        category: "Soft Skills",
        skills: [
          { name: "Problem Solving", level: 9 },
          { name: "Team Leadership", level: 8 },
          { name: "Communication", level: 8 },
          { name: "Project Management", level: 7 },
          { name: "Mentoring", level: 7 }
        ]
      }
    ]
  };

  if (isLoading) {
    return <ConsoleLoader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-background terminal-scanlines">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Terminal Header */}
        <TerminalHeader 
          name={portfolioData.personalInfo.name}
          title={portfolioData.personalInfo.title}
          contact={portfolioData.personalInfo.contact}
        />

        <div className="space-y-8">
          {/* About Section */}
          <TerminalSection title="About Me" command="cat /home/user/about.txt">
            <div className="bg-muted border border-terminal-green-dim rounded p-4 font-mono">
              <TypingAnimation 
                text={portfolioData.about}
                speed={20}
                className="text-terminal-green leading-relaxed"
              />
            </div>
          </TerminalSection>

          {/* Experience/Projects */}
          <TerminalSection title="Work Experience" command="ls -la /var/log/experience/">
            {portfolioData.projects.map((project, index) => (
              <ProjectItem
                key={index}
                name={project.name}
                role={project.role}
                duration={project.duration}
                location={project.location}
                description={project.description}
                technologies={project.technologies}
              />
            ))}
          </TerminalSection>

          {/* Skills */}
          <TerminalSection title="Skills & Technologies" command="sudo apt list --installed">
            <TerminalSkills skillCategories={portfolioData.skills} />
          </TerminalSection>

          {/* Education */}
          <TerminalSection title="Education" command="cat /etc/education.conf">
            {portfolioData.education.map((edu, index) => (
              <TerminalEducation
                key={index}
                institution={edu.institution}
                degree={edu.degree}
                field={edu.field}
                duration={edu.duration}
                gpa={edu.gpa}
                achievements={edu.achievements}
              />
            ))}
          </TerminalSection>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center font-mono">
          <div className="text-terminal-green-dim text-sm">
            <TypingAnimation 
              text="portfolio@terminal:~$ Thanks for visiting! Type 'contact' to get in touch 💚"
              speed={30}
              className="terminal-glow"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
