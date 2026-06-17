import React from 'react';
import { motion } from 'framer-motion';
import { SiPython, SiCplusplus, SiC, SiHtml5, SiCss, SiJavascript, SiGithub, SiCanva } from 'react-icons/si';
import { BrainCircuit, Database, Terminal, FileCode2, Code2, Cpu } from 'lucide-react';

const SKILL_CATEGORIES = [
  {
    title: "Programming Languages",
    icon: <Terminal className="w-6 h-6 text-primary" />,
    skills: [
      { name: "Python", icon: <SiPython className="w-8 h-8 text-[#3776AB]" />, level: 85 },
      { name: "C++", icon: <SiCplusplus className="w-8 h-8 text-[#00599C]" />, level: 75 },
      { name: "C", icon: <SiC className="w-8 h-8 text-[#A8B9CC]" />, level: 80 }
    ]
  },
  {
    title: "Web Development",
    icon: <FileCode2 className="w-6 h-6 text-accent" />,
    skills: [
      { name: "HTML", icon: <SiHtml5 className="w-8 h-8 text-[#E34F26]" />, level: 90 },
      { name: "CSS", icon: <SiCss className="w-8 h-8 text-[#1572B6]" />, level: 85 },
      { name: "JavaScript", icon: <SiJavascript className="w-8 h-8 text-[#F7DF1E]" />, level: 70 }
    ]
  },
  {
    title: "AI & Data",
    icon: <BrainCircuit className="w-6 h-6 text-secondary" />,
    skills: [
      { name: "Data Analytics", icon: <Database className="w-8 h-8 text-blue-400" />, level: 80 },
      { name: "Prompt Eng.", icon: <Code2 className="w-8 h-8 text-purple-400" />, level: 85 },
      { name: "Machine Learning", icon: <Cpu className="w-8 h-8 text-emerald-400" />, level: 70 }
    ]
  }
];

export function Skills() {
  return (
    <section id="skills" className="py-24 relative bg-background/50">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
            <span className="text-primary font-mono text-xl">02.</span>
            Technical Arsenal
            <div className="h-px bg-border flex-1 ml-4" />
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {SKILL_CATEGORIES.map((category, idx) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="glass-panel p-8 rounded-2xl relative overflow-hidden group hover:border-primary/40 transition-colors"
              >
                {/* Background glow effect */}
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  {category.icon}
                </div>
                
                <div className="flex items-center gap-3 mb-8">
                  {category.icon}
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>

                <div className="space-y-6">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {skill.icon}
                          <span className="font-medium text-foreground/90">{skill.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground font-mono">{skill.level}%</span>
                      </div>
                      
                      {/* Animated Progress Bar */}
                      <div className="h-1.5 w-full bg-secondary/20 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-primary to-accent relative"
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse" />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tools Row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 glass-panel p-6 rounded-xl flex flex-wrap items-center justify-center gap-8 md:gap-16"
          >
            <span className="text-muted-foreground font-mono text-sm uppercase tracking-wider">Other Tools:</span>
            <div className="flex items-center gap-2 text-foreground/80 hover:text-white transition-colors">
              <SiGithub className="w-6 h-6" /> GitHub
            </div>
            <div className="flex items-center gap-2 text-foreground/80 hover:text-white transition-colors">
              <SiCanva className="w-6 h-6 text-[#00C4CC]" /> Canva
            </div>
            <div className="flex items-center gap-2 text-foreground/80 hover:text-white transition-colors">
              <div className="w-6 h-6 rounded bg-orange-600 flex items-center justify-center text-xs font-bold text-white">O</div> MS Office
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
