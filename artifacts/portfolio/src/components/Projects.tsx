import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Projects() {
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
            <span className="text-primary font-mono text-xl">03.</span>
            Featured Projects
            <div className="h-px bg-border flex-1 ml-4" />
          </h2>

          <div className="grid lg:grid-cols-12 gap-8 items-center mb-16 relative">
            {/* Visual Graphic Area */}
            <div className="lg:col-span-7 relative z-10">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-xl overflow-hidden glass-panel border border-primary/20 aspect-video flex items-center justify-center bg-[#0a0f1a]"
              >
                {/* Terminal Mockup */}
                <div className="w-full h-full flex flex-col">
                  <div className="h-8 bg-black/50 border-b border-white/5 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <div className="ml-4 text-xs font-mono text-muted-foreground">ai_assistant.py</div>
                  </div>
                  <div className="p-6 font-mono text-sm space-y-2 flex-1">
                    <div className="text-primary">&gt; Initializing Voice Assistant...</div>
                    <div className="text-accent">&gt; Loading SpeechRecognition modules...</div>
                    <div className="text-foreground/80">&gt; Engine pyttsx3 ready.</div>
                    <div className="text-secondary">&gt; Listening for commands...</div>
                    <motion.div 
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-white flex items-center gap-2 mt-4"
                    >
                      <div className="w-2 h-4 bg-primary" />
                    </motion.div>
                  </div>
                </div>
                
                {/* Overlay glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 pointer-events-none" />
              </motion.div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-5 relative z-20 lg:-ml-12">
              <div className="glass-panel p-8 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 bg-background/95 lg:text-right">
                <div className="text-accent font-mono text-sm mb-2">Featured Project</div>
                <h3 className="text-2xl font-bold mb-4 text-white hover:text-primary transition-colors">
                  Voice Activated AI Assistant
                </h3>
                
                <div className="text-foreground/80 mb-6 leading-relaxed bg-[#0a0f1a]/80 p-4 rounded-lg lg:-ml-8 lg:w-[calc(100%+2rem)] text-left lg:text-right shadow-lg">
                  Developed a smart voice-controlled AI assistant capable of processing voice commands, automating browser tasks, managing files, and enhancing personal productivity through hands-free interaction.
                </div>
                
                <ul className="flex flex-wrap gap-2 lg:justify-end mb-6 font-mono text-xs">
                  <li className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">Python</li>
                  <li className="px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">SpeechRecognition</li>
                  <li className="px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20">pyttsx3</li>
                  <li className="px-3 py-1 rounded-full bg-muted text-foreground/70 border border-border">Automation</li>
                </ul>
                
                <div className="flex gap-4 lg:justify-end items-center">
                  <a href="https://github.com/himanshukumar-web" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <Github className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                    <ExternalLink className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* More Projects Coming Soon */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="glass-panel border border-dashed border-border p-8 rounded-xl max-w-lg w-full text-center flex flex-col items-center gap-4 hover:border-primary/30 transition-colors">
              <Terminal className="w-10 h-10 text-muted-foreground" />
              <h4 className="text-lg font-medium text-foreground/90">More Projects Brewing</h4>
              <p className="text-sm text-muted-foreground">Currently working on new AI models and data analytics dashboards. Check back soon for updates.</p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
