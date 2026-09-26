import { useState } from "react";
import {
  ArrowUpRight,
  Github,
  Mail,
  MapPin,
  Menu,
  X,
  ExternalLink,
  Terminal,
  Layers3,
  Workflow,
  ShieldCheck,
  Database,
  Download,
  ChevronRight,
} from "lucide-react";

const projects = [
  {
    title: "Elite Nursing Medics",
    type: "Full-stack platform",
    description:
      "A nursing education platform with a Next.js frontend and Laravel API, built around exam preparation, quizzes, student workflows, and a production database.",
    stack: ["Next.js", "TypeScript", "Laravel", "PHP", "MySQL"],
    href: "https://elitenursingmedics.com",
    label: "Live product",
  },
  {
    title: "Exquisite Hour",
    type: "Luxury commerce experience",
    description:
      "A premium catalogue experience with a deliberately minimal visual system, TypeScript frontend, and Prisma-backed product data.",
    stack: ["Next.js", "TypeScript", "Prisma", "Tailwind"],
    href: "https://v0-modern-catalogue-design.vercel.app/",
    label: "View project",
  },
  {
    title: "Automation Systems",
    type: "Workflow engineering",
    description:
      "Automated data-to-HTML workflows and utility scripts that remove repetitive manual work and turn structured source data into usable outputs.",
    stack: ["n8n", "Python", "JSON", "CLI"],
    href: "https://github.com/hummzer/n8n-workflows",
    label: "GitHub",
  },
  {
    title: "Security & Systems Lab",
    type: "Infrastructure / security",
    description:
      "Hands-on work spanning Linux, networking, home infrastructure, Python tooling, containerized services, and security-oriented experimentation.",
    stack: ["Linux", "Python", "Docker", "Networking"],
    href: "https://github.com/hummzer/Python-for-Security",
    label: "GitHub",
  },
];

const skills = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Laravel",
  "PHP",
  "Python",
  "Go",
  "MySQL",
  "PostgreSQL",
  "Docker",
  "Linux",
  "Git",
  "n8n",
  "REST APIs",
  "Automation",
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className="nav-wrap">
        <nav className="nav container">
          <a className="brand" href="#top" onClick={closeMenu}>
            SH<span>.</span>
          </a>

          <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
            <a href="#work" onClick={closeMenu}>Work</a>
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#skills" onClick={closeMenu}>Skills</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </div>

          <div className="nav-actions">
            <a
              className="nav-github"
              href="https://github.com/hummzer"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
            >
              <Github size={17} />
            </a>
            <a className="nav-cta" href="#contact">Let's talk <ArrowUpRight size={15} /></a>
            <button
              className="menu-button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="hero container">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> Available for engineering opportunities</p>
            <h1>
              I build software
              <span>that solves real problems.</span>
            </h1>
            <p className="hero-lede">
              I'm Salim Hamza — a full-stack developer and open-source explorer focused on
              web products, automation, APIs, and systems that are practical to operate.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">View selected work <ArrowUpRight size={17} /></a>
              <a className="button button-secondary" href="mailto:zaeh888@gmail.com">Email me <Mail size={17} /></a>
            </div>
            <div className="hero-meta">
              <span><MapPin size={15} /> Nairobi, Kenya · Remote</span>
              <span><Terminal size={15} /> Full-stack · Automation · Systems</span>
            </div>
          </div>

          <div className="hero-panel">
            <div className="panel-topline">
              <span>ENGINEER / BUILDER</span>
              <span>2026</span>
            </div>
            <div className="terminal-window">
              <div className="terminal-head">
                <span className="terminal-dot" /><span className="terminal-dot" /><span className="terminal-dot" />
                <span className="terminal-file">salim@workstation:~</span>
              </div>
              <div className="terminal-body">
                <p><span className="muted">$</span> whoami</p>
                <p className="accent">salim-hamza</p>
                <p><span className="muted">$</span> focus --current</p>
                <p>ship useful software<span className="cursor">_</span></p>
                <div className="terminal-grid">
                  <div><small>STACK</small><strong>TS / PHP / Python</strong></div>
                  <div><small>BUILD</small><strong>Web / API / Automation</strong></div>
                  <div><small>STYLE</small><strong>Practical / Direct</strong></div>
                  <div><small>ENV</small><strong>Linux / Git / Docker</strong></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="signal-strip">
          <div className="container signal-grid">
            <div><strong>01</strong><span>Full-stack delivery</span></div>
            <div><strong>02</strong><span>Automation & tooling</span></div>
            <div><strong>03</strong><span>API & data systems</span></div>
            <div><strong>04</strong><span>Open-source mindset</span></div>
          </div>
        </section>

        <section id="work" className="section container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2>Projects with a reason to exist.</h2>
            </div>
            <a className="text-link" href="https://github.com/hummzer" target="_blank" rel="noreferrer">
              More on GitHub <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="project-grid">
            {projects.map((project, index) => (
              <article className={`project-card project-${index + 1}`} key={project.title}>
                <div className="project-number">0{index + 1}</div>
                <div className="project-type">{project.type}</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tag-row">
                  {project.stack.map((item) => <span key={item}>{item}</span>)}
                </div>
                <a className="card-link" href={project.href} target="_blank" rel="noreferrer">
                  {project.label} <ExternalLink size={15} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="section section-dark">
          <div className="container about-grid">
            <div>
              <p className="eyebrow light">About</p>
              <h2>Engineer first. Curious by default.</h2>
            </div>
            <div className="about-copy">
              <p>
                I graduated with a BSc in Information Technology from JKUAT and work as an
                independent developer, building software from the interface down to the API and
                infrastructure.
              </p>
              <p>
                My strongest work sits where product requirements meet implementation: turning
                an idea into a working system, automating the repetitive parts, and keeping the
                architecture understandable enough to maintain.
              </p>
              <div className="about-points">
                <div><Layers3 size={20} /><span>Product-minded full-stack development</span></div>
                <div><Workflow size={20} /><span>Automation and workflow design</span></div>
                <div><ShieldCheck size={20} /><span>Security-conscious systems work</span></div>
                <div><Database size={20} /><span>APIs, databases and integrations</span></div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section container">
          <div className="skills-layout">
            <div>
              <p className="eyebrow">Technical toolkit</p>
              <h2>Tools I use to turn ideas into systems.</h2>
              <p className="section-copy">
                I care more about choosing the right tool for the job than collecting frameworks.
                These are the technologies I regularly build with or around.
              </p>
            </div>
            <div className="skills-list">
              {skills.map((skill) => <span key={skill}>{skill}</span>)}
            </div>
          </div>
        </section>

        <section className="section proof-section">
          <div className="container proof-grid">
            <div className="proof-card">
              <span className="proof-icon"><Github size={21} /></span>
              <div><strong>Open-source explorer</strong><p>Projects, experiments and tooling live publicly where they can.</p></div>
              <a href="https://github.com/hummzer" target="_blank" rel="noreferrer"><ChevronRight size={18} /></a>
            </div>
            <div className="proof-card">
              <span className="proof-icon"><Terminal size={21} /></span>
              <div><strong>Terminal-native workflow</strong><p>Comfortable working close to the system, from Linux to deployment.</p></div>
              <a href="https://wakatime.com/@za34" target="_blank" rel="noreferrer"><ChevronRight size={18} /></a>
            </div>
            <div className="proof-card">
              <span className="proof-icon"><Download size={21} /></span>
              <div><strong>Credentials</strong><p>CV and professional credentials are available for a closer look.</p></div>
              <a href="/assets/Salim_Hamza_CV.docx" download><ChevronRight size={18} /></a>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="container contact-inner">
            <p className="eyebrow light">Contact</p>
            <h2>Have a problem worth building?</h2>
            <p>
              For engineering roles, freelance work, collaborations, or a technical conversation,
              send me a message.
            </p>
            <div className="contact-actions">
              <a className="button button-light" href="mailto:zaeh888@gmail.com">zaeh888@gmail.com <Mail size={17} /></a>
              <a className="button button-outline-light" href="https://github.com/hummzer" target="_blank" rel="noreferrer">GitHub <Github size={17} /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} Salim Hamza</span>
          <span>Built with React · Vite · TypeScript</span>
          <div>
            <a href="https://github.com/hummzer" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://leetcode.com/u/IfADl0sOFQ/" target="_blank" rel="noreferrer">LeetCode</a>
            <a href="https://www.credly.com/users/salim-hamza.bea036d1" target="_blank" rel="noreferrer">Credly</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
