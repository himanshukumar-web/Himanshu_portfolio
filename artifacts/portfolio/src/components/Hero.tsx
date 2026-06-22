import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTypingAnimation } from '@/hooks/useTypingAnimation';
import { useResumeDownload } from '@/hooks/useResumeDownload';
import { Button } from '@/components/ui/button';
import { Download, ChevronRight, Mail } from 'lucide-react';
import { SiPython, SiGithub, SiReact } from 'react-icons/si';

const ROLES = [
  "AI & ML Student",
  "Python Developer",
  "Data Analytics Learner",
  "Prompt Engineer",
  "Tech Innovator"
];

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const typedText = useTypingAnimation(ROLES, 100, 50, 2000);
  const { downloadResume } = useResumeDownload();

  // Particle background effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.radius = Math.random() * 2 + 1;
        
        const colors = ['#00d4ff', '#0066ff', '#7c3aed'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas!.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas!.height) this.vy = -this.vy;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Add glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
      }
    }

    const initParticles = () => {
      particles = [];
      const numParticles = Math.min(Math.floor(window.innerWidth / 15), 80);
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        
        // Mouse repulsion
        const dx = mouseX - particles[i].x;
        const dy = mouseY - particles[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 100) {
          particles[i].x -= dx * 0.05;
          particles[i].y -= dy * 0.05;
        }

        particles[i].draw();

        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx2 = particles[i].x - particles[j].x;
          const dy2 = particles[i].y - particles[j].y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist2 < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 - dist2 / 600})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Particle Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none opacity-60"
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium tracking-wide">
              Hello, I'm
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
              <span className="block text-foreground">HIMANSHU</span>
              <span className="block text-gradient-primary">KUMAR</span>
            </h1>
            
            <div className="h-12 flex items-center">
              <span className="text-xl md:text-2xl text-foreground/80 font-mono">
                {typedText}
                <span className="animate-pulse text-accent ml-1">|</span>
              </span>
            </div>
            
            <p className="text-foreground/70 max-w-lg text-lg leading-relaxed">
              Curious and self-driven Computer Science Engineering (AI & ML) student passionate about Artificial Intelligence, Data Analytics, Software Development, and building impactful technology solutions that solve real-world problems.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white border-0 hover-glow transition-all duration-300 gap-2"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Projects
                <ChevronRight size={18} />
              </Button>
              
              <Button 
                variant="outline" 
                className="glass-panel text-foreground border-primary/50 hover:bg-primary/20 hover:text-white transition-all duration-300 gap-2"
                onClick={downloadResume}
              >
                <Download size={18} />
                Download Resume
              </Button>
              
              <Button 
                variant="ghost" 
                className="border border-border hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-300 gap-2"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Mail size={18} />
                Contact Me
              </Button>
            </div>
          </motion.div>
          
          {/* Right Content - Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative hidden lg:flex justify-center items-center h-[500px]"
          >
            {/* Orbital rings */}
            <div className="absolute w-[400px] h-[400px] border border-primary/20 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute w-[300px] h-[300px] border border-accent/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            
            {/* Floating Icons on orbits */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-[400px] h-[400px]"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-background p-2 rounded-full border border-primary text-primary shadow-[0_0_15px_rgba(0,102,255,0.5)]">
                <SiPython size={24} />
              </div>
            </motion.div>
            
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute w-[300px] h-[300px]"
            >
              <div className="absolute bottom-4 left-4 bg-background p-2 rounded-full border border-accent text-accent shadow-[0_0_15px_rgba(0,212,255,0.5)]">
                <SiGithub size={20} />
              </div>
              <div className="absolute top-1/4 -right-2 bg-background p-2 rounded-full border border-secondary text-secondary shadow-[0_0_15px_rgba(124,58,237,0.5)]">
                <SiReact size={20} />
              </div>
            </motion.div>

            {/* Center Avatar Placeholder */}
            <div className="relative z-10 w-48 h-48 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary rounded-full opacity-20 blur-xl animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary rounded-full p-[2px]">
                <div className="w-full h-full bg-background rounded-full flex items-center justify-center relative overflow-hidden">
                  {/* Hexagon pattern overlay */}
                  <div className="absolute inset-0 opacity-20" 
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'34.64101615137754\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M10 0l10 5.773502691896258v11.547005383792516l-10 5.773502691896258-10-5.773502691896258v-11.547005383792516z\' fill=\'none\' stroke=\'%2300d4ff\' stroke-width=\'1\'/%3E%3C/svg%3E")' }}
                  />
                  <span className="font-mono text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-primary relative z-10">
                    HK
                  </span>
                </div>
              </div>
            </div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
}
