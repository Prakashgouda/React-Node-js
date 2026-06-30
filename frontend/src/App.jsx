import "./App.css";
import avatarUrl from "./assets/prakash-avatar.png";
import resumeUrl from "./assets/Prakash_Gouda_Resume.pdf";

const expertise = [
  "React JS",
  "JavaScript",
  "TypeScript",
  "Redux Saga",
  "HTML5",
  "CSS",
  "Styled Components",
  "Node JS",
  "RESTful APIs",
  "Hooks",
  "Context API",
  "Jest",
  "Git",
  "Postman",
  "Jira",
  "CI/CD",
];

const highlights = [
  "4+ years building scalable React applications",
  "Enterprise platforms across US, EMEA, Japan and ANZ",
  "Reusable UI architecture, API integration and performance optimization",
  "Agile delivery with production-ready components and Jest tests",
];

const experience = [
  {
    role: "Technology Analyst",
    company: "Infosys Ltd, Mysore",
    period: "Dec 2021 - Present",
    project: "Medtronic",
    points: [
      "Developed reusable and scalable UI components for a global enterprise web application.",
      "Built inventory, scheduling, order creation, user/role-based screens and configurable UI flows.",
      "Integrated REST APIs and handled asynchronous flows using Redux-Saga at scale.",
      "Converted Figma designs into responsive and accessible UI with Styled Components.",
      "Improved performance through memoization, optimized API interactions and reduced unnecessary renders.",
    ],
  },
  {
    role: "React JS Performance Optimization",
    company: "Infosys Internal Project",
    period: "Knowledge sharing POC",
    project: "Performance Optimization",
    points: [
      "Analyzed React performance issues and optimized component re-rendering.",
      "Implemented memoization and lazy loading to improve application efficiency.",
      "Presented best practices later adopted by internal teams.",
    ],
  },
];

const education = [
  {
    title: "Bachelor of Engineering, Computer Science",
    place: "K.L.S. Gogte Institute of Technology, Belagavi",
    period: "2017 - 2020",
  },
  {
    title: "Diploma in Computer Science",
    place: "Government Polytechnic Siddapur, Uttara Kannada",
    period: "2014 - 2017",
  },
];

const certificates = [
  "ReactJS Developer Program and Responsive Web Designing by Infosys",
  "Microsoft Azure Fundamentals (AZ-900) by Microsoft",
  "First prize in state level project exhibition for diploma academic project",
  "Captain of the winning team in VTU Zonal Volleyball Tournament",
];

function App() {
  return (
    <main className="profile-page">
      <nav className="topbar" aria-label="Profile navigation">
        <a className="brand" href="#home">
          PG
        </a>
        <div className="nav-links">
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow">Frontend Developer (React JS)</p>
          <h1>Prakash Gouda</h1>
          <p className="hero-text">
            Frontend Developer with 4+ years of experience building scalable,
            high-performance web applications using React.js, Redux-Saga,
            TypeScript and JavaScript.
          </p>

          <div className="hero-actions">
            <a className="primary-action" href={resumeUrl} download>
              Download Resume
            </a>
            <a className="secondary-action" href="mailto:prakashgouda20@gmail.com">
              Contact Me
            </a>
          </div>
        </div>

        <aside className="hero-panel" aria-label="Profile summary">
          <img src={avatarUrl} alt="Prakash Gouda initials avatar" />
          <div>
            <h2>React UI Engineer</h2>
            <p>Sirsi, Karnataka</p>
          </div>
          <dl>
            <div>
              <dt>Experience</dt>
              <dd>4+ Years</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Enterprise UI</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="highlight-grid" aria-label="Career highlights">
        {highlights.map((item) => (
          <article className="highlight-card" key={item}>
            <span />
            <p>{item}</p>
          </article>
        ))}
      </section>

      <section className="section two-column">
        <div>
          <p className="section-kicker">Profile</p>
          <h2>Building reliable interfaces for complex workflows.</h2>
        </div>
        <p className="section-copy">
          Skilled in responsive UI development, state management, reusable
          architecture, API integration, debugging and Agile delivery. Experienced
          with multi-region feature rollouts, localization support, feature flags
          and production defect resolution.
        </p>
      </section>

      <section className="section" id="experience">
        <div className="section-heading">
          <p className="section-kicker">Work Experience</p>
          <h2>Enterprise React development at scale</h2>
        </div>

        <div className="timeline">
          {experience.map((item) => (
            <article className="timeline-item" key={item.project}>
              <div className="timeline-meta">
                <p>{item.period}</p>
                <strong>{item.project}</strong>
              </div>
              <div className="timeline-content">
                <h3>{item.role}</h3>
                <p>{item.company}</p>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="skills">
        <div className="section-heading">
          <p className="section-kicker">Expertise</p>
          <h2>Frontend stack and delivery tools</h2>
        </div>
        <div className="skill-cloud">
          {expertise.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>

      <section className="section split-section">
        <div>
          <div className="section-heading">
            <p className="section-kicker">Education</p>
            <h2>Academic background</h2>
          </div>
          <div className="stack-list">
            {education.map((item) => (
              <article key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.place}</p>
                <span>{item.period}</span>
              </article>
            ))}
          </div>
        </div>

        <div>
          <div className="section-heading">
            <p className="section-kicker">Certificates</p>
            <h2>Achievements</h2>
          </div>
          <ul className="achievement-list">
            {certificates.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div>
          <p className="section-kicker">Contact</p>
          <h2>Let us build something polished and useful.</h2>
        </div>
        <div className="contact-links">
          <a href="tel:+917483049552">+91 7483049552</a>
          <a href="mailto:prakashgouda20@gmail.com">prakashgouda20@gmail.com</a>
          <a href="https://linkedin.com/in/prakashgouda25" target="_blank" rel="noreferrer">
            linkedin.com/in/prakashgouda25
          </a>
        </div>
      </section>
    </main>
  );
}

export default App;
