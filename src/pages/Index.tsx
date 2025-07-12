import { ResumeHeader } from "@/components/ResumeHeader";
import { ResumeSection } from "@/components/ResumeSection";
import { ExperienceItem } from "@/components/ExperienceItem";
import { EducationItem } from "@/components/EducationItem";
import { SkillsSection } from "@/components/SkillsSection";

const Index = () => {
  // Sample resume data - customize this with your own information
  const resumeData = {
    personalInfo: {
      name: "Your Name",
      title: "Software Developer",
      contact: {
        email: "your.email@example.com",
        phone: "+1 (555) 123-4567",
        location: "Your City, State",
        website: "https://yourwebsite.com",
        linkedin: "https://linkedin.com/in/yourprofile",
        github: "https://github.com/yourusername"
      }
    },
    summary: "Passionate software developer with 3+ years of experience building modern web applications. Skilled in React, Node.js, and cloud technologies. Strong problem-solving abilities and commitment to writing clean, maintainable code.",
    experience: [
      {
        company: "Tech Company Inc.",
        position: "Senior Software Developer",
        duration: "2022 - Present",
        location: "Remote",
        description: [
          "Developed and maintained React-based web applications serving 10,000+ users",
          "Implemented CI/CD pipelines reducing deployment time by 50%",
          "Mentored junior developers and conducted code reviews",
          "Collaborated with cross-functional teams to deliver features on time"
        ]
      },
      {
        company: "Startup Solutions",
        position: "Frontend Developer",
        duration: "2021 - 2022",
        location: "New York, NY",
        description: [
          "Built responsive web applications using React, TypeScript, and TailwindCSS",
          "Optimized application performance resulting in 30% faster load times",
          "Worked closely with UX/UI designers to implement pixel-perfect designs",
          "Participated in agile development processes and sprint planning"
        ]
      },
      {
        company: "Digital Agency",
        position: "Junior Developer",
        duration: "2020 - 2021",
        location: "Los Angeles, CA",
        description: [
          "Developed client websites using HTML, CSS, JavaScript, and WordPress",
          "Assisted in debugging and maintaining existing codebases",
          "Learned modern development practices and version control with Git",
          "Supported senior developers in project delivery and testing"
        ]
      }
    ],
    education: [
      {
        institution: "University of Technology",
        degree: "Bachelor of Science",
        field: "Computer Science",
        duration: "2016 - 2020",
        gpa: "3.7/4.0",
        achievements: [
          "Dean's List for 3 consecutive semesters",
          "President of Computer Science Club",
          "Winner of Annual Hackathon 2019"
        ]
      }
    ],
    skills: [
      {
        category: "Frontend Technologies",
        skills: [
          { name: "React/Next.js", level: "Advanced" as const },
          { name: "TypeScript", level: "Advanced" as const },
          { name: "TailwindCSS", level: "Expert" as const },
          { name: "JavaScript", level: "Expert" as const }
        ]
      },
      {
        category: "Backend & Database",
        skills: [
          { name: "Node.js", level: "Advanced" as const },
          { name: "PostgreSQL", level: "Intermediate" as const },
          { name: "MongoDB", level: "Intermediate" as const },
          { name: "REST APIs", level: "Advanced" as const }
        ]
      },
      {
        category: "Tools & Platforms",
        skills: [
          { name: "Git/GitHub", level: "Expert" as const },
          { name: "Docker", level: "Intermediate" as const },
          { name: "AWS", level: "Intermediate" as const },
          { name: "Figma", level: "Intermediate" as const }
        ]
      },
      {
        category: "Soft Skills",
        skills: [
          { name: "Problem Solving", level: "Expert" as const },
          { name: "Team Collaboration", level: "Advanced" as const },
          { name: "Communication", level: "Advanced" as const },
          { name: "Project Management", level: "Intermediate" as const }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <ResumeHeader 
          name={resumeData.personalInfo.name}
          title={resumeData.personalInfo.title}
          contact={resumeData.personalInfo.contact}
        />

        <div className="mt-8 space-y-8">
          {/* Professional Summary */}
          <ResumeSection title="Professional Summary">
            <div className="bg-card border border-border rounded-lg p-6 shadow-card">
              <p className="text-muted-foreground leading-relaxed">
                {resumeData.summary}
              </p>
            </div>
          </ResumeSection>

          {/* Experience */}
          <ResumeSection title="Professional Experience">
            {resumeData.experience.map((exp, index) => (
              <ExperienceItem
                key={index}
                company={exp.company}
                position={exp.position}
                duration={exp.duration}
                location={exp.location}
                description={exp.description}
              />
            ))}
          </ResumeSection>

          {/* Skills */}
          <ResumeSection title="Skills & Technologies">
            <SkillsSection skillCategories={resumeData.skills} />
          </ResumeSection>

          {/* Education */}
          <ResumeSection title="Education">
            {resumeData.education.map((edu, index) => (
              <EducationItem
                key={index}
                institution={edu.institution}
                degree={edu.degree}
                field={edu.field}
                duration={edu.duration}
                gpa={edu.gpa}
                achievements={edu.achievements}
              />
            ))}
          </ResumeSection>
        </div>
      </div>
    </div>
  );
};

export default Index;
