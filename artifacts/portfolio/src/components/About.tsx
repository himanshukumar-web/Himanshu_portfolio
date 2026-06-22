import React from 'react';
import { motion } from 'framer-motion';
import { useCountUp } from '@/hooks/useCountUp';

export function About() {
  const isVisible = true; // Could hook to intersection observer
  
  const techSkills = useCountUp(10, 2000, isVisible);
  const certs = useCountUp(7, 2000, isVisible);
  const hackathons = useCountUp(5, 2000, isVisible);
  const projects = useCountUp(7, 2000, isVisible);

  const stats = [
    { label: "Technical Skills", value: `${techSkills}+` },
    { label: "Certifications Earned", value: `${certs}` },
    { label: "Hackathons", value: `${hackathons}` },
    { label: "Projects Completed", value: `${projects}` }
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
            <span className="text-primary font-mono text-xl">01.</span>
            About Me
            <div className="h-px bg-border flex-1 ml-4" />
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-panel p-6 rounded-xl text-center group hover:border-primary/50 transition-colors"
                >
                  <div className="text-4xl font-bold text-gradient-cyan mb-2 group-hover:glow-accent transition-shadow">
                    {stat.value}
                  </div>
                  <div className="text-sm text-foreground/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Right Column - Text */}
            <div className="space-y-6 text-lg text-foreground/80">
              <p>
                Hello! I'm Himanshu Kumar, currently pursuing my{' '}
                <strong className="text-primary font-semibold">B.Tech (Hons) in Computer Science & Engineering</strong>{' '}
                with a specialization in <strong className="text-accent font-semibold">AI & ML</strong> at{' '}
                <span className="text-secondary font-semibold">SDGI Global University</span>.
              </p>
              <p>
                My journey into tech began with a fascination for how data shapes our world. Today, I'm 
                building a strong foundation in <span className="text-white">Python, Machine Learning, and Data Analytics</span>. 
                I thrive in environments where I can solve complex problems and learn emerging technologies.
              </p>
              <p>
                Whether it's developing AI-powered tools at hackathons or creating voice-activated personal assistants, 
                I approach every project with curiosity and a drive to innovate. I'm constantly seeking opportunities 
                to apply my skills to real-world challenges and grow as an engineer.
              </p>
              <div className="pt-4 flex items-center gap-2 text-sm font-mono text-accent">
                <span>&gt;</span>
                <span className="border-b border-accent border-dashed">Expected Graduation: 2028</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
