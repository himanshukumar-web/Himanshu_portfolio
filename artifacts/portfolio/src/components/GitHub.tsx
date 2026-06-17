import React from 'react';
import { motion } from 'framer-motion';
import { SiGithub } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export function GitHub() {
  const username = "himanshukumar-web";
  
  return (
    <section id="github" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-4">
              <span className="text-primary font-mono text-xl">06.</span>
              GitHub Stats
            </h2>
            
            <Button 
              variant="outline"
              className="glass-panel border-primary/50 hover:bg-primary/20 hover:text-white w-fit gap-2"
              onClick={() => window.open(`https://github.com/${username}`, '_blank')}
            >
              <SiGithub />
              @{username}
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Top Languages */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="glass-panel p-1 rounded-xl flex items-center justify-center overflow-hidden border border-border/50 hover:border-primary/50"
            >
              <img 
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=tokyonight&hide_border=true&bg_color=00000000&title_color=00d4ff&text_color=a0aec0`}
                alt="Top Languages"
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </motion.div>

            <div className="flex flex-col gap-6">
              {/* Profile Stats */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="glass-panel p-1 rounded-xl flex items-center justify-center overflow-hidden border border-border/50 hover:border-accent/50"
              >
                <img 
                  src={`https://github-readme-stats.vercel.app/api?username=${username}&theme=tokyonight&hide_border=true&bg_color=00000000&title_color=00d4ff&text_color=a0aec0&icon_color=7c3aed`}
                  alt="GitHub Stats"
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </motion.div>

              {/* Streak Stats */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="glass-panel p-1 rounded-xl flex items-center justify-center overflow-hidden border border-border/50 hover:border-secondary/50"
              >
                <img 
                  src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=tokyonight&hide_border=true&background=00000000&ring=00d4ff&fire=7c3aed&currStreakLabel=a0aec0`}
                  alt="GitHub Streak"
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
