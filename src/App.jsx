import { useState, useEffect, useRef } from 'react'
import './App.css'

// Import main images from Assets folder
import profilePic from './assets/profile.jpg'
import portalImg from './assets/osd-portal.png'
import camAppImg from './assets/osd-cam-app.png'
import pcSimImg from './assets/pc-simulator.png'

// Import extra images for each project (add your own files)
import portalImg2 from './assets/portal-dashboard.png'
import portalImg3 from './assets/portal-charts.png'
import camImg2 from './assets/cam-scan.png'
import camImg3 from './assets/cam-evidence.png'
import pcImg2 from './assets/pc-build.png'
import pcImg3 from './assets/pc-troubleshoot.png'

const projects = [
  {
    id: 1,
    title: 'OSD Violation Portal',
    tech: 'React · Node.js · MongoDB · Chart.js',
    shortDesc: 'Admin dashboard to manage student violations & sanctions.',
    fullDesc: 'A comprehensive admin portal for OSD (Office of Student Discipline) to manage student violations and sanctions. Features include: full CRUD operations for violations and students, interactive analytics dashboard with charts (bar, line, pie charts) showing violation trends over time, role-based access control (Admin, OSD Staff, Viewer), export reports to CSV/PDF, audit logs of all actions, and responsive design for all devices.',
    color: '#f4d0c6',
    emoji: '⚠️',
    image: portalImg,
    extraImages: [portalImg2, portalImg3],
    tags: ['Admin', 'CRUD', 'Analytics', 'Export Reports', 'Dashboard'],
  },
  {
    id: 2,
    title: 'OSD Violation Cam App',
    tech: 'React Native · Expo Camera · Node.js · JWT',
    shortDesc: 'Mobile app scanning student IDs via camera, retrieving student profile.',
    fullDesc: 'A cross-platform mobile application (iOS & Android) that allows OSD personnel to quickly log violations on the go. The app uses the device camera to scan student ID cards (QR code or OCR), automatically fetches the student record from the database, and presents a dropdown of common violations. The user can capture an evidence photo, add notes, and submit. Works offline with local storage and syncs when internet is available.',
    color: '#c6d9f4',
    emoji: '📱',
    image: camAppImg,
    extraImages: [camImg2, camImg3],
    tags: ['Mobile', 'ID Scanner', 'OCR', 'Image Upload', 'Offline'],
  },
  {
    id: 3,
    title: 'PC Simulator: Build & Troubleshoot',
    tech: 'React · Game State · CSS Animations',
    shortDesc: 'Interactive game where players assemble a custom PC and diagnose issues.',
    fullDesc: 'An engaging web-based game that simulates building a personal computer from scratch. Players select compatible components (CPU, GPU, RAM, storage, etc.) within a budget, then test their build through various troubleshooting scenarios (e.g., no POST, overheating, driver conflicts). The game has 5 progressive stages, each teaching real-world hardware knowledge and problem-solving skills. Includes hints and a scoring system.',
    color: '#d4c6f4',
    emoji: '🖥️',
    image: pcSimImg,
    extraImages: [pcImg2, pcImg3],
    tags: ['Game', 'Simulation', 'Problem Solving', 'Hardware', 'Stages'],
  },
]

const skills = [
  { name: 'HTML & CSS', level: 90, color: '#f9c6d0' },
  { name: 'JavaScript', level: 78, color: '#fde9b8' },
  { name: 'React', level: 70, color: '#c6e2f9' },
  { name: 'PHP / Laravel', level: 75, color: '#d0f4c6' },
  { name: 'MySQL / SQLite', level: 80, color: '#e2c6f9' },
  { name: 'Git & GitHub', level: 72, color: '#fac6e8' },
  { name: 'Network Basics', level: 65, color: '#c6f4f0' },
  { name: 'Tech Support', level: 88, color: '#f9dbc6' },
]

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

function SkillBar({ skill, delay }) {
  const [ref, visible] = useInView()
  return (
    <div ref={ref} className="skill-item" style={{ animationDelay: `${delay}ms` }}>
      <div className="skill-header">
        <span className="skill-name">{skill.name}</span>
        <span className="skill-pct">{skill.level}%</span>
      </div>
      <div className="skill-track">
        <div
          className="skill-fill"
          style={{
            width: visible ? `${skill.level}%` : '0%',
            background: skill.color,
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  )
}

function ProjectCard({ project, index, onCardClick }) {
  const [ref, visible] = useInView()
  return (
    <div
      ref={ref}
      className={`project-card ${visible ? 'in-view' : ''}`}
      style={{ animationDelay: `${index * 120}ms` }}
      onClick={() => onCardClick(project)}
    >
      <div className="project-cover">
        <img src={project.image} alt={project.title} className="project-img" />
      </div>
      <div className="project-body">
        <p className="project-tech">{project.tech}</p>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.shortDesc}</p>
        <div className="project-tags">
          {project.tags.map(t => (
            <span key={t} className="tag" style={{ background: project.color + '66' }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectModal({ project, onClose }) {
  const [activeImage, setActiveImage] = useState(project.image)
  const allImages = [project.image, ...(project.extraImages || [])]

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = 'unset' }
  }, [])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="modal-img-container">
          <img src={activeImage} alt={project.title} className="modal-img" />
        </div>
        {allImages.length > 1 && (
          <div className="modal-gallery">
            {allImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${project.title} screenshot ${idx + 1}`}
                className={`gallery-thumb ${activeImage === img ? 'active-thumb' : ''}`}
                onClick={() => setActiveImage(img)}
              />
            ))}
          </div>
        )}
        <div className="modal-body">
          <h2 className="modal-title">{project.title}</h2>
          <p className="modal-tech">{project.tech}</p>
          <p className="modal-full-desc">{project.fullDesc}</p>
          <div className="modal-tags">
            {project.tags.map(t => (
              <span key={t} className="tag" style={{ background: project.color + '66' }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [heroReady, setHeroReady] = useState(false)
  const [skillsRef, skillsVisible] = useInView()
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="portfolio">
      <section className={`hero ${heroReady ? 'hero-ready' : ''}`}>
        <div className="hero-blobs" aria-hidden="true">
          <span className="hblob hb1" />
          <span className="hblob hb2" />
          <span className="hblob hb3" />
        </div>
        <div className="hero-inner">
          <div className="avatar-wrap">
            <img src={profilePic} alt="Maryrose Bola" className="avatar-img" />
            <span className="avatar-ring" />
          </div>
          <div className="hero-text">
            <p className="hero-eyebrow">Hello, I'm</p>
            <h1 className="hero-name">Maryrose Bola</h1>
            <p className="hero-sub">
              4th Year IT Student&nbsp;·&nbsp;
              <span className="accent">New Era University</span>
            </p>
            <p className="hero-bio">
              Passionate about building clean, functional software and solving real-world problems through technology. Currently seeking opportunities to grow as a developer.
            </p>
            <div className="hero-cta">
              <a href="#projects" className="btn btn-primary">View Projects</a>
              <a href="#contact" className="btn btn-ghost">Get in Touch</a>
            </div>
          </div>
        </div>
        <div className="scroll-hint" aria-hidden="true">
          <span className="scroll-dot" />
        </div>
      </section>

      <section id="projects" className="section">
        <div className="section-label">Portfolio</div>
        <h2 className="section-title">Projects</h2>
        <p className="section-sub">Click any card to see full details</p>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onCardClick={setSelectedProject} />
          ))}
        </div>
      </section>

      <section id="skills" className="section section-alt">
        <div className="section-label">Expertise</div>
        <h2 className="section-title">Skills</h2>
        <p className="section-sub">Technologies I've worked with throughout my degree</p>
        <div ref={skillsRef} className="skills-grid">
          {skills.map((s, i) => (
            <SkillBar key={s.name} skill={s} delay={i * 80} />
          ))}
        </div>
        <div className="badges">
          {['Responsive Design','REST APIs','Agile/Scrum','Problem Solving','Team Collaboration','Documentation'].map(b => (
            <span key={b} className="badge">{b}</span>
          ))}
        </div>
      </section>

      <section id="experience" className="section">
        <div className="section-label">Experience</div>
        <h2 className="section-title">On-the-Job Training</h2>
        <p className="section-sub">Hands-on professional experience</p>
        <div className="ojt-card">
          <div className="ojt-accent" />
          <div className="ojt-content">
            <div className="ojt-header">
              <div className="ojt-logo">🌿</div>
              <div>
                <h3 className="ojt-company">Department of Environment and Natural Resources</h3>
                <p className="ojt-role">IT / Technical Support Intern</p>
                <p className="ojt-period">📅 2024 · 300 Hours OJT</p>
              </div>
            </div>
            <ul className="ojt-list">
              <li><span className="ojt-dot" />Provided day-to-day <strong>technical support</strong> to DENR staff — troubleshooting hardware, software, and connectivity issues.</li>
              <li><span className="ojt-dot" />Assisted in <strong>setting up and configuring</strong> desktops, printers, and network peripherals across departments.</li>
              <li><span className="ojt-dot" />Maintained an <strong>IT asset inventory</strong>, documenting equipment status and repair logs.</li>
              <li><span className="ojt-dot" />Supported the team in <strong>network troubleshooting</strong> and LAN/WAN connectivity checks.</li>
              <li><span className="ojt-dot" />Helped encode and digitize <strong>official records and reports</strong> using MS Office tools.</li>
              <li><span className="ojt-dot" />Observed and participated in <strong>IT procurement and inventory auditing</strong> processes.</li>
            </ul>
            <div className="ojt-tags">
              {['Tech Support','Hardware Setup','Networking','MS Office','Asset Management','Documentation'].map(t => (
                <span key={t} className="ojt-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section section-alt">
        <div className="section-label">Let's Connect</div>
        <h2 className="section-title">Get in Touch</h2>
        <p className="section-sub">Open to internships, collaborations, and new opportunities</p>
        <div className="contact-row">
          <a href="mailto:bolamaryrose093@gmail.com" className="contact-pill">
            <span>📧</span> bolamaryrose093@gmail.com
          </a>
          <a href="https://www.linkedin.com/in/maryrose-bola/" className="contact-pill">
            <span>💼</span> LinkedIn
          </a>
          <a href="https://github.com/MariaRosa03" className="contact-pill">
            <span>🐙</span> GitHub
          </a>
        </div>
      </section>

      <footer className="footer">
        <p>© 2024 Maryrose Bola · New Era University · BS Information Technology</p>
      </footer>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  )
}