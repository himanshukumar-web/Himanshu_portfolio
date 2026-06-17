import React from 'react';
import { SiGithub } from 'react-icons/si';
import { FaLinkedin, FaWhatsapp } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-[#020510] border-t border-border/50 py-12 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-primary/5 rounded-[100%] blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          
          <a href="#home" className="inline-block mb-6">
            <span className="font-mono font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              HK
            </span>
          </a>
          
          <h3 className="text-xl font-bold text-white mb-2">Himanshu Kumar</h3>
          <p className="text-muted-foreground font-mono text-sm mb-8">
            AI & ML Enthusiast <span className="text-primary">|</span> Python Developer <span className="text-accent">|</span> Tech Innovator
          </p>
          
          <div className="flex gap-6 mb-8">
            <a href="https://github.com/himanshukumar-web" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
              <SiGithub className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/himanshu-kumar-813626327" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a href="https://wa.me/919417885574" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-[#25D366] transition-colors">
              <FaWhatsapp className="w-5 h-5" />
            </a>
          </div>
          
          <div className="h-px w-full max-w-sm bg-border/50 mb-8" />
          
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Himanshu Kumar. Crafted with passion for AI & Innovation.
          </p>
        </div>
      </div>
    </footer>
  );
}
