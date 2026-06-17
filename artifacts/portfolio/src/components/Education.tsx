import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';

export function Education() {
  return (
    <section id="education" className="py-12 relative">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-panel rounded-2xl overflow-hidden border border-primary/20 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            
            <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
              
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-10 h-10 text-accent" />
              </div>

              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">B.Tech (Hons) Computer Science & Engineering</h3>
                <h4 className="text-lg text-primary font-medium mb-4">Specialization in AI & ML</h4>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-foreground/70 font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="text-accent">@</span> SDGI Global University
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-secondary" />
                    Expected Graduation: 2028
                  </div>
                </div>

                <p className="mt-6 text-foreground/80 leading-relaxed max-w-2xl">
                  Focusing on core computer science fundamentals while delving deep into Artificial Intelligence, 
                  Machine Learning algorithms, and data structures. Building a strong foundation for a future career 
                  as an AI Engineer.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
