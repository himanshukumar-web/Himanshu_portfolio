import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Terminal, X, Brain, Globe, ShoppingCart, Newspaper, Mic, Heart, Code2, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TECH_COLORS: Record<string, string> = {
  Python: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  TypeScript: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  JavaScript: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  HTML: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  CSS: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  SpeechRecognition: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  pyttsx3: 'bg-green-500/10 text-green-400 border-green-500/20',
  React: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  AI: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  NLP: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  Automation: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  'News API': 'bg-red-500/10 text-red-400 border-red-500/20',
  'Web Scraping': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'REST API': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
};

const techBadge = (tech: string) =>
  TECH_COLORS[tech] || 'bg-muted text-foreground/70 border-border';

interface Project {
  id: number;
  featured?: boolean;
  title: string;
  subtitle: string;
  description: string;
  longDesc: string;
  tech: string[];
  github: string;
  icon: React.ReactNode;
  color: string;
  terminalLines?: string[];
}

const PROJECTS: Project[] = [
  {
    id: 1,
    featured: true,
    title: 'Voice Activated AI Personal Assistant',
    subtitle: 'Python · AI · Automation',
    description:
      'A smart voice-controlled AI assistant capable of processing voice commands, automating browser tasks, managing files, and enhancing personal productivity through hands-free interaction.',
    longDesc:
      'Built with Python, this assistant listens to voice commands via SpeechRecognition, responds using text-to-speech (pyttsx3), and automates tasks like opening applications, searching the web, managing files, and more — all without touching a keyboard.',
    tech: ['Python', 'SpeechRecognition', 'pyttsx3', 'Automation'],
    github: 'https://github.com/himanshukumar-web/Ai-voice-Detector',
    icon: <Mic className="w-6 h-6" />,
    color: 'primary',
    terminalLines: [
      '> Initializing Voice Assistant...',
      '> Loading SpeechRecognition modules...',
      '> Engine pyttsx3 ready.',
      '> Listening for commands...',
    ],
  },
  {
    id: 2,
    title: 'NEWS AI Agent',
    subtitle: 'AI · Automation · NLP',
    description:
      'Autonomous news agent that fetches real-time news from the internet, analyzes and ranks stories by importance, and delivers the top 10–15 most relevant news items tailored to the user\'s interests.',
    longDesc:
      'Designed as an autonomous AI pipeline — the agent fetches live news, runs analysis to score and rank stories by relevance and importance, and delivers a personalized briefing. Demonstrates end-to-end agentic behavior: perception → reasoning → delivery.',
    tech: ['Python', 'AI', 'NLP', 'News API', 'Automation'],
    github: 'https://github.com/himanshukumar-web/NEWS-AI-AGENT',
    icon: <Newspaper className="w-6 h-6" />,
    color: 'accent',
    terminalLines: [
      '> Fetching live news feeds...',
      '> Running NLP analysis pipeline...',
      '> Ranking by relevance score...',
      '> Delivering top 15 stories...',
    ],
  },
  {
    id: 3,
    title: 'Mental Health CBT Companion',
    subtitle: 'TypeScript · AI · Healthcare',
    description:
      'A Cognitive Behavioral Therapy (CBT) companion app designed to support mental wellness. Provides guided CBT exercises, mood tracking, and AI-driven suggestions to help users manage stress and anxiety.',
    longDesc:
      'Built in TypeScript, this full-stack mental health app incorporates CBT methodologies to guide users through evidence-based exercises. Features mood journaling, progress tracking, and personalized AI insights to support daily mental wellness routines.',
    tech: ['TypeScript', 'React', 'AI'],
    github: 'https://github.com/himanshukumar-web/mental-health-cbt-companion',
    icon: <Brain className="w-6 h-6" />,
    color: 'secondary',
  },
  {
    id: 4,
    title: 'AI Agent (Work in Progress)',
    subtitle: 'Python · AI · Agentic Systems',
    description:
      'An experimental AI agent framework exploring autonomous task execution, tool use, and multi-step reasoning. Pushing the boundaries of what a solo AI agent can accomplish.',
    longDesc:
      'An ongoing research and development project exploring the fundamentals of agentic AI systems — autonomous decision making, tool calling, and iterative self-improvement. Built to deepen understanding of how modern AI agents like AutoGPT work under the hood.',
    tech: ['Python', 'AI', 'Automation'],
    github: 'https://github.com/himanshukumar-web/AI-AGENT',
    icon: <Bot className="w-6 h-6" />,
    color: 'primary',
  },
  {
    id: 5,
    title: 'Mental Health App',
    subtitle: 'JavaScript · Wellness · UI',
    description:
      'A JavaScript-based mental health support web app offering mood tracking, relaxation exercises, and wellness resources to promote mental well-being.',
    longDesc:
      'A user-friendly mental health web application built with JavaScript. Includes features for mood logging, guided breathing exercises, motivational content, and resource links to professional help — making mental health support more accessible.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/himanshukumar-web/Mantel-health',
    icon: <Heart className="w-6 h-6" />,
    color: 'accent',
  },
  {
    id: 6,
    title: 'E-Commerce Website',
    subtitle: 'JavaScript · Web Dev · Full UI',
    description:
      'A fully functional e-commerce frontend featuring product listings, cart management, and a checkout flow — built with vanilla JavaScript, HTML, and CSS.',
    longDesc:
      'A complete e-commerce web application with product catalog, category filtering, shopping cart, and checkout flow. Demonstrates strong frontend development skills including DOM manipulation, state management, and responsive design — all without a framework.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/himanshukumar-web/E-commerce-website-',
    icon: <ShoppingCart className="w-6 h-6" />,
    color: 'secondary',
  },
  {
    id: 8,
    title: 'Python Task Automation',
    subtitle: 'Python · Scripting · Productivity',
    description:
      'A Python scripting project focused on automating repetitive tasks, file operations, and productivity workflows — showcasing core Python programming fundamentals.',
    longDesc:
      'A collection of Python automation scripts that handle repetitive tasks such as file management, data processing, and workflow automation. Demonstrates solid understanding of Python\'s standard library, file I/O, and scripting best practices.',
    tech: ['Python', 'Automation'],
    github: 'https://github.com/himanshukumar-web/task',
    icon: <Code2 className="w-6 h-6" />,
    color: 'accent',
  },
];

const colorMap: Record<string, string> = {
  primary: 'border-primary/30 hover:border-primary/60 text-primary bg-primary/10',
  accent: 'border-accent/30 hover:border-accent/60 text-accent bg-accent/10',
  secondary: 'border-secondary/30 hover:border-secondary/60 text-secondary bg-secondary/10',
};

const glowMap: Record<string, string> = {
  primary: 'shadow-[0_0_30px_rgba(0,102,255,0.15)]',
  accent: 'shadow-[0_0_30px_rgba(0,212,255,0.15)]',
  secondary: 'shadow-[0_0_30px_rgba(124,58,237,0.15)]',
};

function TerminalVisual({ lines, color }: { lines?: string[]; color: string }) {
  const termColors: Record<string, string[]> = {
    primary: ['text-primary', 'text-accent', 'text-foreground/80', 'text-secondary'],
    accent: ['text-accent', 'text-primary', 'text-foreground/80', 'text-secondary'],
    secondary: ['text-secondary', 'text-accent', 'text-foreground/80', 'text-primary'],
  };
  const cols = termColors[color] || termColors.primary;
  const defaultLines = ['> Initializing...', '> Loading modules...', '> Processing...', '> Done.'];
  const displayLines = lines || defaultLines;
  return (
    <div className="relative rounded-xl overflow-hidden glass-panel border border-primary/20 aspect-video flex items-center justify-center bg-[#0a0f1a]">
      <div className="w-full h-full flex flex-col">
        <div className="h-8 bg-black/50 border-b border-white/5 flex items-center px-4 gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <div className="ml-4 text-xs font-mono text-muted-foreground">himanshu@ai-lab:~$</div>
        </div>
        <div className="p-6 font-mono text-sm space-y-2 flex-1">
          {displayLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.4 }}
              className={cols[i % cols.length]}
            >
              {line}
            </motion.div>
          ))}
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="text-white flex items-center gap-2 mt-4"
          >
            <div className="w-2 h-4 bg-primary" />
          </motion.div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 pointer-events-none" />
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="glass-panel border border-border/60 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorMap[project.color]}`}>
            {project.icon}
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{project.subtitle}</span>
        <h3 className="text-2xl font-bold text-white mt-1 mb-4">{project.title}</h3>
        <p className="text-foreground/80 leading-relaxed mb-6">{project.longDesc}</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map(t => (
            <span key={t} className={`px-3 py-1 rounded-full text-xs font-mono border ${techBadge(t)}`}>{t}</span>
          ))}
        </div>
        <a href={project.github} target="_blank" rel="noreferrer">
          <Button className="bg-gradient-to-r from-primary to-accent text-white border-0 gap-2">
            <Github className="w-4 h-4" />
            View on GitHub
          </Button>
        </a>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const featured = PROJECTS[0];
  const rest = PROJECTS.slice(1);

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-4">
            <span className="text-primary font-mono text-xl">03.</span>
            GitHub Projects
            <div className="h-px bg-border flex-1 ml-4" />
          </h2>
          <p className="text-muted-foreground font-mono text-sm mb-14">
            All projects from{' '}
            <a href="https://github.com/himanshukumar-web" target="_blank" rel="noreferrer" className="text-accent hover:underline">
              github.com/himanshukumar-web
            </a>
          </p>

          {/* Featured Project */}
          <div className="grid lg:grid-cols-12 gap-8 items-center mb-20 relative">
            <div className="lg:col-span-7 relative z-10">
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                <TerminalVisual lines={featured.terminalLines} color={featured.color} />
              </motion.div>
            </div>
            <div className="lg:col-span-5 relative z-20 lg:-ml-12">
              <div className="glass-panel p-8 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 bg-background/95 lg:text-right">
                <div className="text-accent font-mono text-sm mb-2">Featured Project</div>
                <h3 className="text-2xl font-bold mb-4 text-white hover:text-primary transition-colors cursor-pointer" onClick={() => setSelected(featured)}>
                  {featured.title}
                </h3>
                <div className="text-foreground/80 mb-6 leading-relaxed bg-[#0a0f1a]/80 p-4 rounded-lg lg:-ml-8 lg:w-[calc(100%+2rem)] text-left lg:text-right shadow-lg">
                  {featured.description}
                </div>
                <ul className="flex flex-wrap gap-2 lg:justify-end mb-6 font-mono text-xs">
                  {featured.tech.map(t => (
                    <li key={t} className={`px-3 py-1 rounded-full border ${techBadge(t)}`}>{t}</li>
                  ))}
                </ul>
                <div className="flex gap-4 lg:justify-end items-center">
                  <a href={featured.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <Github className="w-6 h-6" />
                  </a>
                  <button onClick={() => setSelected(featured)} className="text-muted-foreground hover:text-accent transition-colors">
                    <ExternalLink className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* All Other Projects Grid */}
          <h3 className="text-xl font-semibold text-foreground/80 mb-8 font-mono">
            <span className="text-primary">// </span>Other Projects
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`glass-panel border border-border/40 hover:${glowMap[project.color]} transition-all duration-300 rounded-xl p-6 flex flex-col gap-4 cursor-pointer group`}
                onClick={() => setSelected(project)}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorMap[project.color]}`}>
                    {project.icon}
                  </div>
                  <div className="flex gap-3 text-muted-foreground">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="hover:text-accent transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <ExternalLink className="w-5 h-5 group-hover:text-primary transition-colors" />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-mono text-muted-foreground mb-1">{project.subtitle}</p>
                  <h4 className="font-bold text-white group-hover:text-primary transition-colors leading-snug">{project.title}</h4>
                </div>
                <p className="text-sm text-foreground/70 leading-relaxed flex-1 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 3).map(t => (
                    <span key={t} className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${techBadge(t)}`}>{t}</span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono border border-border text-muted-foreground">+{project.tech.length - 3}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* GitHub CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-14"
          >
            <a href="https://github.com/himanshukumar-web" target="_blank" rel="noreferrer">
              <Button variant="outline" className="border-primary/40 hover:border-primary hover:bg-primary/10 text-foreground gap-2 px-8 py-6 text-base rounded-xl">
                <Github className="w-5 h-5" />
                View All Repositories on GitHub
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
