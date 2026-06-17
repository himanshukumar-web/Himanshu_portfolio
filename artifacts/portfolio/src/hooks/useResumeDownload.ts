import { jsPDF } from 'jspdf';

export function useResumeDownload() {
  const downloadResume = () => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const W = 210;
    const margin = 15;
    const contentW = W - margin * 2;
    let y = 0;

    // ── Helpers ────────────────────────────────────────────────────────────
    const hex = (h: string) => {
      const r = parseInt(h.slice(1, 3), 16);
      const g = parseInt(h.slice(3, 5), 16);
      const b = parseInt(h.slice(5, 7), 16);
      return [r, g, b] as [number, number, number];
    };

    const setFill = (color: string) => doc.setFillColor(...hex(color));
    const setTextColor = (color: string) => doc.setTextColor(...hex(color));
    const setDraw = (color: string) => doc.setDrawColor(...hex(color));

    const text = (
      str: string,
      x: number,
      yPos: number,
      opts?: { align?: 'left' | 'center' | 'right'; maxWidth?: number }
    ) => {
      doc.text(str, x, yPos, opts as object);
    };

    const newPageIfNeeded = (needed: number) => {
      if (y + needed > 280) {
        doc.addPage();
        y = 18;
      }
    };

    const sectionTitle = (title: string) => {
      newPageIfNeeded(14);
      y += 6;
      setTextColor('#0066ff');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      text(title.toUpperCase(), margin, y);
      y += 2;
      setDraw('#0066ff');
      doc.setLineWidth(0.5);
      doc.line(margin, y, margin + contentW, y);
      y += 5;
      setTextColor('#1a1a2e');
    };

    const bullet = (line: string, indent = margin + 4) => {
      newPageIfNeeded(6);
      setTextColor('#374151');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      setFill('#0066ff');
      doc.circle(indent - 1.5, y - 1.2, 0.8, 'F');
      const lines = doc.splitTextToSize(line, contentW - (indent - margin) - 2);
      doc.text(lines, indent + 1, y);
      y += lines.length * 4.5;
    };

    // ── HEADER ─────────────────────────────────────────────────────────────
    setFill('#050a1a');
    doc.rect(0, 0, W, 42, 'F');

    // Accent strip
    setFill('#0066ff');
    doc.rect(0, 42, W, 1.5, 'F');

    // Name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    setTextColor('#ffffff');
    text('HIMANSHU KUMAR', W / 2, 16, { align: 'center' });

    // Title
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    setTextColor('#00d4ff');
    text('AI & ML Enthusiast  |  Python Developer  |  Tech Innovator', W / 2, 24, { align: 'center' });

    // Contact row
    doc.setFontSize(8.5);
    setTextColor('#a0aec0');
    const contacts = [
      '+91 9417885574',
      'himanshukumar160077@gmail.com',
      'github.com/himanshukumar-web',
      'linkedin.com/in/himanshu-kumar-813626327',
      'Ghaziabad, UP, India',
    ];
    text(contacts.join('   •   '), W / 2, 33, { align: 'center' });

    y = 52;

    // ── SUMMARY ────────────────────────────────────────────────────────────
    sectionTitle('Professional Summary');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    setTextColor('#374151');
    const summary =
      'Curious and self-driven Computer Science Engineering (AI & ML) student at SDGI Global University ' +
      'passionate about Artificial Intelligence, Data Analytics, Software Development, and building impactful ' +
      'technology solutions. Strong foundation in Python programming, machine learning concepts, and prompt engineering. ' +
      'Active hackathon participant with hands-on project experience.';
    const summaryLines = doc.splitTextToSize(summary, contentW);
    doc.text(summaryLines, margin, y);
    y += summaryLines.length * 4.8 + 2;

    // ── EDUCATION ──────────────────────────────────────────────────────────
    sectionTitle('Education');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    setTextColor('#1a1a2e');
    text('B.Tech (Hons) Computer Science & Engineering — AI & ML', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    setTextColor('#6b7280');
    text('SDGI Global University', margin, y + 5);
    text('Expected Graduation: 2028', margin + contentW, y + 5, { align: 'right' });
    y += 12;

    // ── SKILLS ─────────────────────────────────────────────────────────────
    sectionTitle('Technical Skills');

    const skillGroups = [
      { label: 'Programming Languages', items: 'Python, C, C++' },
      { label: 'Web Development', items: 'HTML, CSS, JavaScript' },
      {
        label: 'AI & Data',
        items: 'Data Analytics, Prompt Engineering, AI Fundamentals, Machine Learning Concepts',
      },
      { label: 'Tools & Platforms', items: 'GitHub, Canva, Microsoft Office' },
    ];

    for (const group of skillGroups) {
      newPageIfNeeded(8);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      setTextColor('#0066ff');
      text(group.label + ':', margin, y);
      doc.setFont('helvetica', 'normal');
      setTextColor('#374151');
      text(group.items, margin + 42, y);
      y += 5.5;
    }

    // ── PROJECTS ───────────────────────────────────────────────────────────
    sectionTitle('Projects');

    const projects = [
      {
        title: 'Voice Activated AI Personal Assistant',
        tech: 'Python, SpeechRecognition, pyttsx3, Automation Libraries',
        url: 'github.com/himanshukumar-web/Ai-voice-Detector',
        points: [
          'Developed a smart voice-controlled AI assistant with real-time voice command processing.',
          'Implemented browser automation, file management, and productivity automation features.',
          'Built using Python with SpeechRecognition for input and pyttsx3 for text-to-speech output.',
        ],
      },
      {
        title: 'NEWS AI Agent — Autonomous News Delivery Agent',
        tech: 'Python, NLP, News API, Automation',
        url: 'github.com/himanshukumar-web/NEWS-AI-AGENT',
        points: [
          'Designed an autonomous AI agent that fetches live news, analyzes and ranks stories by importance.',
          'Delivers top 10–15 most relevant news items tailored to user interests using NLP pipeline.',
        ],
      },
      {
        title: 'Mental Health CBT Companion',
        tech: 'TypeScript, React, AI',
        url: 'github.com/himanshukumar-web/mental-health-cbt-companion',
        points: [
          'Built a full-stack Cognitive Behavioral Therapy companion app with AI-driven suggestions.',
          'Features mood tracking, guided CBT exercises, and personalized mental wellness insights.',
        ],
      },
      {
        title: 'E-Commerce Website',
        tech: 'JavaScript, HTML, CSS',
        url: 'github.com/himanshukumar-web/E-commerce-website-',
        points: [
          'Developed a fully functional e-commerce frontend with product listings and cart management.',
          'Implemented category filtering, cart state management, and checkout flow without a framework.',
        ],
      },
      {
        title: 'Python Task Automation',
        tech: 'Python',
        url: 'github.com/himanshukumar-web/task',
        points: [
          'Created Python automation scripts for file operations and productivity workflow automation.',
        ],
      },
    ];

    for (const project of projects) {
      newPageIfNeeded(24);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      setTextColor('#1a1a2e');
      text(project.title, margin, y);
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8.5);
      setTextColor('#7c3aed');
      text(project.tech, margin, y + 4.5);
      doc.setFont('helvetica', 'normal');
      setTextColor('#6b7280');
      text(project.url, margin + contentW, y + 4.5, { align: 'right' });
      y += 10;
      for (const point of project.points) {
        bullet(point);
      }
      y += 2;
    }

    // ── EXPERIENCE ─────────────────────────────────────────────────────────
    sectionTitle('Experience & Hackathons');

    const experiences = [
      {
        role: 'Volunteer — SGU Hackathon',
        org: 'SDGI Global University',
        points: [
          'Assisted in event coordination and participant management for the university hackathon.',
          'Supported smooth execution of hackathon activities and developed teamwork skills.',
        ],
      },
      {
        role: 'Participant — ResuCon 2025 Hackathon',
        org: 'ResuCon',
        points: [
          'Worked on an AI/ML-based Resume Analysis and Optimization Solution.',
          'Collaborated in a team environment and applied machine learning to real-world problems.',
        ],
      },
      {
        role: 'Participant — Smart India Hackathon (SIH)',
        org: 'Government of India',
        points: [
          'Developed an AI-powered Resume Screening Tool using Python, Machine Learning, and NLP.',
          'Enhanced problem-solving, teamwork, and technical skills under competitive conditions.',
        ],
      },
    ];

    for (const exp of experiences) {
      newPageIfNeeded(22);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      setTextColor('#1a1a2e');
      text(exp.role, margin, y);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      setTextColor('#6b7280');
      text(exp.org, margin, y + 5);
      y += 10;
      for (const point of exp.points) {
        bullet(point);
      }
      y += 2;
    }

    // ── CERTIFICATIONS ────────────────────────────────────────────────────
    sectionTitle('Certifications');

    const certs = [
      { name: 'Creating a Budget with Microsoft Excel', issuer: 'Coursera' },
      { name: 'Data Analytics', issuer: 'Deloitte via Forage' },
      { name: 'HTML & CSS Bootcamp', issuer: 'LetsUpgrade' },
      { name: 'Canva Design Bootcamp', issuer: 'LetsUpgrade' },
      { name: 'Prompt Engineering Bootcamp', issuer: 'LetsUpgrade' },
      { name: 'AI Agents Workshop', issuer: 'Microsoft Learn × K.A.M.A.L.A' },
      { name: 'Python Programming', issuer: 'SCITS LAB' },
    ];

    // Two-column layout
    const half = Math.ceil(certs.length / 2);
    const leftCerts = certs.slice(0, half);
    const rightCerts = certs.slice(half);
    const colW = contentW / 2 - 3;

    for (let i = 0; i < Math.max(leftCerts.length, rightCerts.length); i++) {
      newPageIfNeeded(7);
      if (leftCerts[i]) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        setTextColor('#1a1a2e');
        text(leftCerts[i].name, margin + 2, y);
        doc.setFont('helvetica', 'normal');
        setTextColor('#6b7280');
        doc.setFontSize(8.5);
        text(leftCerts[i].issuer, margin + 2, y + 4);
      }
      if (rightCerts[i]) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        setTextColor('#1a1a2e');
        text(rightCerts[i].name, margin + colW + 8, y);
        doc.setFont('helvetica', 'normal');
        setTextColor('#6b7280');
        doc.setFontSize(8.5);
        text(rightCerts[i].issuer, margin + colW + 8, y + 4);
      }
      y += 9;
    }

    // ── FOOTER ─────────────────────────────────────────────────────────────
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      setFill('#050a1a');
      doc.rect(0, 287, W, 10, 'F');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      setTextColor('#a0aec0');
      text('Himanshu Kumar  •  himanshukumar160077@gmail.com  •  github.com/himanshukumar-web', W / 2, 293, {
        align: 'center',
      });
      text(`Page ${i} of ${totalPages}`, W - margin, 293, { align: 'right' });
    }

    doc.save('Himanshu_Kumar_Resume.pdf');
  };

  return { downloadResume };
}
