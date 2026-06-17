import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Trophy, Users, Lightbulb } from 'lucide-react';

const EXPERIENCES = [
  {
    title: "Volunteer",
    event: "SGU Hackathon 2.0",
    org: "SDGI Global University",
    date: "2026",
    icon: <Users className="w-5 h-5" />,
    color: "accent",
    points: [
      "Volunteered for the second edition of SGU Hackathon as an organizer and coordinator",
      "Managed participant registration, team coordination, and on-ground event logistics",
      "Demonstrated leadership and communication skills in a large-scale tech event"
    ]
  },
  {
    title: "Volunteer",
    event: "SGU Hackathon 2025",
    org: "SDGI Global University",
    date: "2025",
    icon: <Users className="w-5 h-5" />,
    color: "primary",
    points: [
      "Assisted in event coordination and participant management",
      "Supported smooth execution of hackathon activities",
      "Developed teamwork and leadership skills in a high-pressure environment"
    ]
  },
  {
    title: "Participant",
    event: "Rescon 2025 Hackathon",
    org: "Bennett University",
    date: "2025",
    icon: <Lightbulb className="w-5 h-5" />,
    color: "secondary",
    points: [
      "Worked on AI/ML-based Resume Analysis and Optimization Solution at Bennett University (Rescon 2025)",
      "Collaborated in a team environment to build prototype features",
      "Applied machine learning concepts to real-world HR problems"
    ]
  },
  {
    title: "Participant",
    event: "Smart India Hackathon (SIH 2025)",
    org: "Government of India",
    date: "2025",
    icon: <Trophy className="w-5 h-5" />,
    color: "accent",
    points: [
      "Developed an AI-powered Resume Screening Tool using Python, ML, and NLP",
      "Competed nationally against top engineering teams across India",
      "Enhanced problem-solving and rapid prototyping skills under pressure"
    ]
  },
  {
    title: "Participant",
    event: "Smart India Hackathon (SIH 2024)",
    org: "Government of India",
    date: "2024",
    icon: <Trophy className="w-5 h-5" />,
    color: "primary",
    points: [
      "Participated in India's largest national hackathon organized by the Government of India",
      "Worked on an innovative tech solution addressing a real government problem statement",
      "Strengthened Python programming, teamwork, and technical implementation skills"
    ]
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-24 relative bg-background/30">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-16 flex items-center gap-4">
            <span className="text-primary font-mono text-xl">04.</span>
            Experience & Achievements
            <div className="h-px bg-border flex-1 ml-4" />
          </h2>

          <div className="relative max-w-4xl mx-auto">
            {/* Center Neon Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-transparent transform md:-translate-x-1/2 glow-primary" />

            <div className="space-y-12">
              {EXPERIENCES.map((exp, index) => {
                const isLeft = index % 2 === 0;
                
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={`relative flex flex-col md:flex-row items-start ${
                      isLeft ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-4 md:left-1/2 w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center transform -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(0,102,255,0.6)] text-primary">
                      {exp.icon}
                    </div>

                    {/* Content Card */}
                    <div className={`ml-14 md:ml-0 w-full md:w-5/12 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <div className="glass-panel p-6 rounded-xl border border-border/50 hover:border-primary/50 transition-colors group relative overflow-hidden">
                        
                        <div className={`flex flex-col ${isLeft ? 'md:items-end' : 'md:items-start'} mb-4`}>
                          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{exp.title}</h3>
                          <div className="text-accent font-medium mb-0.5">{exp.event}</div>
                          <div className="text-xs text-muted-foreground mb-1">{exp.org}</div>
                          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {exp.date}
                          </div>
                        </div>

                        <ul className={`space-y-2 text-sm text-foreground/80 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                          {exp.points.map((point, i) => (
                            <li key={i} className={`flex items-start gap-2 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                              <span className="text-primary mt-1 flex-shrink-0">▹</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
