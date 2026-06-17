import React from 'react';
import { motion } from 'framer-motion';
import { Award, BadgeCheck } from 'lucide-react';

const CERTIFICATIONS = [
  { title: "Creating a Budget with Microsoft Excel", issuer: "Coursera", color: "blue" },
  { title: "Data Analytics", issuer: "Deloitte via Forage", color: "green" },
  { title: "HTML & CSS Bootcamp", issuer: "LetsUpgrade", color: "orange" },
  { title: "Canva Design Bootcamp", issuer: "LetsUpgrade", color: "cyan" },
  { title: "Prompt Engineering Bootcamp", issuer: "LetsUpgrade", color: "purple" },
  { title: "AI Agents Workshop", issuer: "Microsoft Learn × K.A.M.A.L.A", color: "blue" },
  { title: "Python Programming", issuer: "SCITS LAB", color: "yellow" }
];

export function Certifications() {
  return (
    <section id="certifications" className="py-24 relative bg-background/50">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
            <span className="text-primary font-mono text-xl">05.</span>
            Certifications
            <div className="h-px bg-border flex-1 ml-4" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass-panel p-6 rounded-xl group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-accent/0 group-hover:from-primary/10 group-hover:to-accent/10 transition-colors" />
                
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div className="p-3 bg-secondary/10 rounded-lg text-secondary border border-secondary/20">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    Certified
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 leading-tight relative z-10 group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>
                
                <p className="text-sm font-mono text-muted-foreground relative z-10">
                  <span className="text-foreground/50">Issued by: </span>
                  {cert.issuer}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
