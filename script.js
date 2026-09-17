/**
 * HIMANSHU KUMAR — AI & FULL-STACK DEVELOPER PORTFOLIO
 * Interactive Architecture:
 * 1. 60 FPS Neural Network Simulation (GPU-friendly, reactive physics)
 * 2. Header & Active Scrollspy across 7 sections
 * 3. Mobile Navigation Drawer with backdrop management
 * 4. Scroll Reveal Animations (IntersectionObserver)
 * 5. Interactive "AI Profile Analyzer" State Machine
 * 6. Interactive Contact Form with validation & user feedback
 * 7. Resume Preview Modal
 * 8. One-click Email Clipboard Copy with Toast Feedback
 */

document.addEventListener('DOMContentLoaded', () => {
  initNeuralCanvas();
  initHeaderAndNav();
  initScrollReveal();
  initAiAnalyzer();
  initContactForm();
  initResumeModal();
  initCopyEmail();
});

/* ==========================================================================
   01. NEURAL NETWORK CANVAS SIMULATION (Hero Visual)
   ========================================================================== */
function initNeuralCanvas() {
  const canvas = document.getElementById('neuralCanvas');
  const container = document.getElementById('neuralCanvasViewport');
  const nodeCountLabel = document.getElementById('nodeCountLabel');
  if (!canvas || !container) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId = null;
  let isCanvasVisible = true;

  let width = 0;
  let height = 0;
  let nodes = [];
  const maxDistance = 110;
  const mouse = { x: null, y: null, radius: 130 };

  function getNodeCount() {
    if (width < 400) return 24;
    if (width < 600) return 34;
    return 48;
  }

  function resizeCanvas() {
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    width = rect.width;
    height = rect.height;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    initNodes();
  }

  class Node {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 1.8 + 1.2;
      this.baseAlpha = Math.random() * 0.4 + 0.4;
      this.color = Math.random() > 0.4 ? '#818cf8' : '#22d3ee';
      this.pulsePhase = Math.random() * Math.PI * 2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x <= 0 || this.x >= width) this.vx *= -1;
      if (this.y <= 0 || this.y >= height) this.vy *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && dist > 5) {
          const force = (mouse.radius - dist) / mouse.radius;
          const fx = (dx / dist) * force * 0.6;
          const fy = (dy / dist) * force * 0.6;
          this.x += fx;
          this.y += fy;
        }
      }

      this.pulsePhase += 0.03;
    }

    draw() {
      const pulseAlpha = this.baseAlpha + Math.sin(this.pulsePhase) * 0.2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = Math.max(0.2, Math.min(1, pulseAlpha));
      ctx.fill();

      if (this.radius > 2.2) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 2.4, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.12;
        ctx.fill();
      }
    }
  }

  function initNodes() {
    const targetCount = getNodeCount();
    nodes = [];
    for (let i = 0; i < targetCount; i++) {
      nodes.push(new Node());
    }
    if (nodeCountLabel) {
      nodeCountLabel.textContent = `Active Nodes: ${targetCount}`;
    }
  }

  function drawConnections() {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.35;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = '#6366f1';
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      }

      if (mouse.x !== null && mouse.y !== null) {
        const dx = nodes[i].x - mouse.x;
        const dy = nodes[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const alpha = (1 - dist / mouse.radius) * 0.6;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = '#22d3ee';
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    if (!isCanvasVisible) return;

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < nodes.length; i++) {
      nodes[i].update();
      nodes[i].draw();
    }

    drawConnections();
    ctx.globalAlpha = 1.0;
    animationFrameId = requestAnimationFrame(animate);
  }

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  container.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  container.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const rect = container.getBoundingClientRect();
      mouse.x = e.touches[0].clientX - rect.left;
      mouse.y = e.touches[0].clientY - rect.top;
    }
  }, { passive: true });

  container.addEventListener('touchend', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Battery & CPU optimization via IntersectionObserver
  const visibilityObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      isCanvasVisible = entry.isIntersecting;
      if (isCanvasVisible) {
        if (!animationFrameId) {
          animate();
        }
      } else {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    });
  }, { threshold: 0.1 });

  visibilityObserver.observe(container);

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeCanvas, 120);
  });

  resizeCanvas();
  animate();
}

/* ==========================================================================
   02. HEADER, MOBILE DRAWER & ACTIVE SCROLLSPY
   ========================================================================== */
function initHeaderAndNav() {
  const header = document.querySelector('.site-header');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const sections = document.querySelectorAll('section[id]');

  function updateHeaderScrolled() {
    if (window.scrollY > 25) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateHeaderScrolled, { passive: true });
  updateHeaderScrolled();

  function toggleMobileMenu(forceClose = false) {
    if (!mobileBtn || !mobileNav) return;
    const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
    const nextState = forceClose ? false : !isExpanded;

    mobileBtn.setAttribute('aria-expanded', String(nextState));
    mobileNav.setAttribute('aria-hidden', String(!nextState));

    if (nextState) {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener('click', () => toggleMobileMenu());

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => toggleMobileMenu(true));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        toggleMobileMenu(true);
      }
    });
  }

  function handleScrollspy() {
    const scrollPosition = window.scrollY + 160;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        mobileLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleScrollspy, { passive: true });
  handleScrollspy();
}

/* ==========================================================================
   03. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  });

  revealElements.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   04. INTERACTIVE "AI PROFILE ANALYZER" (Client-Side Simulation)
   ========================================================================== */
function initAiAnalyzer() {
  const tabs = document.querySelectorAll('.analyzer-tab');
  const roleTitle = document.getElementById('analyzerRoleTitle');
  const score = document.getElementById('analyzerScore');
  const competencies = document.getElementById('analyzerCompetencies');
  const projects = document.getElementById('analyzerProjects');
  const summary = document.getElementById('analyzerSummary');
  const outputCard = document.getElementById('analyzerOutput');

  if (!tabs.length || !roleTitle || !score || !competencies || !projects || !summary) return;

  const roleData = {
    frontend: {
      title: "Frontend Engineering",
      score: "95%",
      competencies: [
        "React (Component Architecture, Hooks, Context)",
        "Next.js (App Router, Server Components)",
        "TypeScript & Modern JavaScript (ES6+)",
        "Tailwind CSS & Responsive Design Systems",
        "Performance Tuning & Core Web Vitals"
      ],
      projects: [
        { name: "Page Pulse", desc: "Live web analytics platform with interactive metric visualizations and responsive dashboards." },
        { name: "Mental Health CBT Companion", desc: "Mindful conversational UI with reactive journaling workflows." }
      ],
      summary: "Himanshu demonstrates strong frontend capabilities in React and Next.js, building accessible, responsive interfaces that perform smoothly across devices. Ideal for creating intuitive client applications and product frontends."
    },
    backend: {
      title: "Backend Engineering",
      score: "92%",
      competencies: [
        "Node.js & Express API Microservices",
        "FastAPI (Asynchronous Python Services)",
        "RESTful API Design & Contract Standards",
        "Supabase & PostgreSQL Schema Architecture",
        "Authentication, Middleware & Cloud Deployment"
      ],
      projects: [
        { name: "CBT Companion Backend", desc: "Asynchronous FastAPI microservices managing conversation state and vector queries." },
        { name: "AI Agent Orchestration API", desc: "Event-driven system execution for autonomous desktop actions." }
      ],
      summary: "Proficient in structuring clean asynchronous endpoints, managing relational database schemas in PostgreSQL, and deploying cloud services with minimal latency."
    },
    ai: {
      title: "AI & Autonomous Agents",
      score: "96%",
      competencies: [
        "Generative AI & Large Language Models (LLMs)",
        "LangChain & LangGraph Multi-Agent Workflows",
        "Autonomous Tool Calling & Decision Loops",
        "Prompt Engineering & Context Management",
        "Audio ML / Deepfake Detection (Signal Processing)"
      ],
      projects: [
        { name: "AI Agent / Jarvis", desc: "Autonomous desktop companion with speech recognition, LLM reasoning, and OS automation." },
        { name: "AI Voice Detection System", desc: "Audio spectrogram analysis pipeline distinguishing synthetic cloned voices from human speech." },
        { name: "Mental Health CBT Companion", desc: "Empathetic conversational AI integrating cognitive behavioral therapeutic graphs." }
      ],
      summary: "Specialized in applied Generative AI and autonomous agent systems using LangChain and LangGraph. Capable of designing resilient multi-agent reasoning chains and real-world ML audio classification pipelines."
    },
    fullstack: {
      title: "Full-Stack Development",
      score: "97%",
      competencies: [
        "End-to-End System Architecture (Client + Server)",
        "React/Next.js Frontends + FastAPI/Node.js Backends",
        "Relational Databases (PostgreSQL / Supabase)",
        "Edge Deployment & Production Delivery (Vercel)",
        "Git Collaboration & Modern Developer Tooling"
      ],
      projects: [
        { name: "Mental Health CBT Companion", desc: "Complete full-stack system: Next.js frontend, FastAPI logic, Supabase database, and LangChain orchestration." },
        { name: "Page Pulse", desc: "Full-stack SEO inspector parsing DOM nodes and computing live performance metrics." },
        { name: "AI Agent & Voice Detection", desc: "Integrated frontend controls with Python backend inference engines." }
      ],
      summary: "Himanshu offers a unified skill profile spanning responsive frontend design, scalable backend APIs, and cutting-edge GenAI agent workflows. He bridges the entire product lifecycle from idea to deployed software."
    }
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const selectedRole = tab.getAttribute('data-role');
      if (!roleData[selectedRole]) return;

      tabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      if (outputCard) {
        outputCard.style.opacity = '0.4';
        outputCard.style.transform = 'translateY(4px)';
        outputCard.style.transition = 'all 0.2s ease';
      }

      setTimeout(() => {
        const data = roleData[selectedRole];
        roleTitle.textContent = data.title;
        score.textContent = data.score;

        competencies.innerHTML = data.competencies
          .map((c) => `<span class="a-tag">${c}</span>`)
          .join('');

        projects.innerHTML = data.projects
          .map((p) => `<div class="a-proj-item"><strong>${p.name}:</strong> ${p.desc}</div>`)
          .join('');

        summary.textContent = data.summary;

        if (outputCard) {
          outputCard.style.opacity = '1';
          outputCard.style.transform = 'translateY(0)';
        }
      }, 160);
    });
  });
}

/* ==========================================================================
   05. INTERACTIVE CONTACT FORM WITH VALIDATION & FEEDBACK
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('senderName');
  const emailInput = document.getElementById('senderEmail');
  const messageInput = document.getElementById('senderMessage');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const submitBtn = document.getElementById('submitFormBtn');
  const submitText = document.getElementById('btnSubmitText');
  const successBanner = document.getElementById('formSuccessBanner');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function clearErrors() {
    if (nameError) nameError.textContent = '';
    if (emailError) emailError.textContent = '';
    if (messageError) messageError.textContent = '';
    if (nameInput) nameInput.style.borderColor = '';
    if (emailInput) emailInput.style.borderColor = '';
    if (messageInput) messageInput.style.borderColor = '';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      if (nameError) nameError.textContent = 'Please enter your name (at least 2 characters).';
      nameInput.style.borderColor = '#ef4444';
      isValid = false;
    }

    // Validate Email
    if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
      if (emailError) emailError.textContent = 'Please provide a valid email address.';
      emailInput.style.borderColor = '#ef4444';
      isValid = false;
    }

    // Validate Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      if (messageError) messageError.textContent = 'Please write a message with at least 10 characters.';
      messageInput.style.borderColor = '#ef4444';
      isValid = false;
    }

    if (!isValid) return;

    // Simulate sending state
    if (submitBtn) submitBtn.disabled = true;
    if (submitText) submitText.textContent = 'Sending Message...';

    setTimeout(() => {
      if (submitBtn) submitBtn.disabled = false;
      if (submitText) submitText.textContent = 'Message Sent ✓';

      if (successBanner) {
        successBanner.style.display = 'flex';
      }

      form.reset();

      setTimeout(() => {
        if (submitText) submitText.textContent = 'Send Message';
      }, 3500);
    }, 800);
  });
}

/* ==========================================================================
   06. RESUME PREVIEW MODAL
   ========================================================================== */
function initResumeModal() {
  const modal = document.getElementById('resumeModal');
  const openNavBtn = document.getElementById('resumeNavBtn');
  const openMobileBtn = document.getElementById('mobileResumeBtn');
  const closeBtn = document.getElementById('closeResumeBtn');
  const closeBottomBtn = document.getElementById('closeModalBottomBtn');

  if (!modal) return;

  function openModal() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (openNavBtn) openNavBtn.addEventListener('click', openModal);
  if (openMobileBtn) openMobileBtn.addEventListener('click', () => {
    // Close mobile nav drawer if open
    const mobileNav = document.getElementById('mobileNav');
    const mobileBtn = document.getElementById('mobileMenuBtn');
    if (mobileNav && mobileBtn) {
      mobileNav.classList.remove('open');
      mobileBtn.setAttribute('aria-expanded', 'false');
    }
    openModal();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (closeBottomBtn) closeBottomBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   07. COPY EMAIL TO CLIPBOARD WITH TOAST FEEDBACK
   ========================================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const copyBtnText = document.getElementById('copyBtnText');
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  const emailToCopy = 'Himanshukumar160077@gmail.com';

  if (!copyBtn) return;

  let toastTimeout;

  copyBtn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(emailToCopy);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = emailToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      if (copyBtnText) copyBtnText.textContent = 'Copied!';
      copyBtn.style.borderColor = '#10b981';
      copyBtn.style.color = '#34d399';

      if (toast) {
        if (toastMessage) toastMessage.textContent = 'Email copied to clipboard!';
        toast.classList.add('show');

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
          toast.classList.remove('show');
          if (copyBtnText) copyBtnText.textContent = 'Copy Email';
          copyBtn.style.borderColor = '';
          copyBtn.style.color = '';
        }, 2800);
      }
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  });
}
