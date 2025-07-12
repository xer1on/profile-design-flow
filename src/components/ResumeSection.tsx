import { ReactNode } from "react";

interface ResumeSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const ResumeSection = ({ title, children, className = "" }: ResumeSectionProps) => {
  return (
    <section className={`mb-8 ${className}`}>
      <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b-2 border-primary">
        {title}
      </h2>
      {children}
    </section>
  );
};