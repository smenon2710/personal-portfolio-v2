// app/page.tsx
import Link from "next/link";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

const highlights = [
  {
    label: "Years of Experience",
    value: "14+",
  },
  {
    label: "Efficiency Gains",
    value: "up to 60%",
  },
  {
    label: "User Adoption Increase",
    value: "35%",
  },
  {
    label: "On-time Delivery",
    value: "100%",
  },
];

const experience = [
  {
    company: "Self Employed & Personal Projects",
    role: "Product Manager & AI Developer",
    location: "Remote",
    period: "Jul 2024 – Present",
    bullets: [
      "Lead the full product lifecycle for multiple AI-driven products from vision and roadmap to GTM execution.",
      "Conduct market research, user testing, and competitive analysis to validate demand and refine features.",
      "Built a GenAI SQL Assistant enabling non-technical users to query data via natural language.",
      "Developed a GPT-powered restaurant chat assistant deployed on Vercel for unified restaurant discovery and recommendations.",
    ],
  },
  {
    company: "Discover Financial Services (via BitWise)",
    role: "Product Manager | Lead BI Engineer",
    location: "Remote / USA",
    period: "Jan 2023 – Jun 2024",
    bullets: [
      "Defined and executed BI ecosystem product vision and roadmap aligned with enterprise analytics strategy.",
      "Directed four cross-functional teams, delivering 100% of product iterations on time and aligned to KPIs.",
      "Architected and optimized executive Tableau dashboards and SQL, improving performance and adoption.",
      "Automated reporting workflows with Python, SQL, and ETL, reducing manual effort by 60% and speeding decisions.",
    ],
  },
  {
    company: "Global Payments Inc. (via BitWise)",
    role: "Product Owner | Lead Data Analyst | Scrum Master",
    location: "USA",
    period: "Mar 2022 – Dec 2022",
    bullets: [
      "Owned product strategy for multiple data analytics products, aligning metrics with business objectives.",
      "Implemented Agile delivery models and structured backlog management, reducing ad-hoc BI requests by 40%.",
      "Delivered Tableau and Power BI dashboards that improved executive visibility and decision-making.",
      "Introduced standardized incident management workflows, increasing operational efficiency by 25%.",
    ],
  },
  {
    company: "Amazon Ring (via BitWise)",
    role: "BI Engineer | Project Lead",
    location: "India",
    period: "Jun 2019 – Feb 2022",
    bullets: [
      "Led end-to-end delivery of BI and analytics products as liaison between business, product, and engineering.",
      "Consolidated 100+ Looker dashboards into 25+ Tableau products, boosting adoption by 35% and reducing duplication.",
      "Replaced manual reporting with automated ETL and standardized mappings, improving accuracy and speed.",
      "Applied advanced analytics and visualization to improve retention by 17% and strengthen data storytelling.",
    ],
  },
  {
    company: "BitWise",
    role: "Product Owner | Senior Tableau Developer",
    location: "India",
    period: "Jun 2016 – May 2019",
    bullets: [
      "Defined product vision and roadmap for clinical trial analytics across 10+ global stakeholder groups.",
      "Delivered two executive portals (GMALT & MSSLT) centralizing performance data into a single source of truth.",
      "Launched interactive Tableau dashboards that improved global visibility by 30% and reduced fragmentation.",
    ],
  },
  {
    company: "BitWise",
    role: "Senior Data Analyst",
    location: "India",
    period: "Jun 2011 – May 2016",
    bullets: [
      "Designed and deployed Power BI POCs that supported enterprise contract wins (~$50K in new revenue).",
      "Migrated 40+ WebFocus dashboards to Tableau, reducing reporting effort by 60% via automation.",
      "Implemented a Hadoop-based data warehouse integrated with Tableau to improve refresh performance by 40%.",
    ],
  },
];

const projects = [
  {
    name: "Restobot – AI Restaurant Assistant",
    description:
      "End-to-end AI product for restaurant discovery and decision support. Consolidates restaurant search, comparison, and recommendations into a single conversational interface.",
    tech: ["GPT-3.5", "Next.js", "SerpAPI", "Vercel", "Product Management"],
    liveUrl: "https://restobot.vercel.app",
    githubUrl: "https://github.com/smenon2710",
  },
  {
    name: "GenAI SQL Assistant",
    description:
      "Self-service GenAI analytics assistant that translates natural language into SQL, empowering non-technical users to query structured data and visualize insights in real time.",
    tech: ["Python", "Streamlit", "SQLite", "OpenAI", "NLP"],
    liveUrl:
      "https://agspurdue-e4xbcubsa45ww4cv5qmrnz.streamlit.app",
    githubUrl: "https://github.com/smenon2710",
  },
  {
    name: "InsightMate – AI-Powered Data Exploration",
    description:
      "GenAI assistant that lets users upload datasets and ask questions in plain English. Uses GPT-4 to convert queries to DuckDB SQL and surfaces insights via interactive charts.",
    tech: ["GPT-4", "Streamlit", "DuckDB", "Plotly", "Pandas"],
    liveUrl: "https://ags-purdue-insightmate.streamlit.app",
    githubUrl: "https://github.com/smenon2710",
  },
  {
    name: "AI Stock Analyzer",
    description:
      "AI-driven financial insights tool that combines sector-based stock discovery, GPT recommendations, and trend visualizations using real-time and sentiment data.",
    tech: ["GPT-4", "Streamlit", "yFinance", "Plotly", "Sentiment Analysis"],
    liveUrl:
      "https://ai-financial-analyst-smenon2710.streamlit.app",
    githubUrl: "https://github.com/smenon2710",
  },
];

const skillCategories = [
  {
    title: "Product Management",
    items: [
      "Product Strategy",
      "Go-To-Market",
      "Roadmapping",
      "KPI Development",
      "Stakeholder Management",
      "Agile Delivery",
      "Cross-Functional Leadership",
      "Client Relationship Management",
    ],
  },
  {
    title: "Business Intelligence & Analytics",
    items: [
      "Tableau",
      "Power BI",
      "SQL",
      "Dashboard Development",
      "Data Storytelling",
      "Self-Service Analytics",
      "Performance Tracking",
    ],
  },
  {
    title: "Generative AI & Advanced Analytics",
    items: [
      "GenAI Integration",
      "LLM Integration",
      "LangChain",
      "RAG",
      "NLP",
      "OpenAI API",
      "Anthropic API",
      "Streamlit",
      "Hugging Face",
    ],
  },
  {
    title: "Data Platforms & Engineering",
    items: [
      "Python",
      "Snowflake",
      "Redshift",
      "SQLite",
      "AWS (S3, Lambda)",
      "Azure",
      "GCP",
      "Hadoop",
      "ETL & Data Pipelines",
      "Data Governance",
    ],
  },
];

const education = [
  {
    title: "B.E., Information Technology",
    org: "Pimpri Chinchwad College of Engineering",
    detail:
      "Foundation in software engineering, data structures, databases, and system design.",
  },
];

const certifications = [
  {
    title: "Product Manager Certified",
    org: "Product School",
  },
  {
    title: "Tableau Certified Data Analyst",
    org: "Tableau",
  },
  {
    title: "Collibra Data Governance",
    org: "Collibra",
  },
  {
    title: "Applied Generative AI Bootcamp",
    org: "Purdue University",
  },
];

const CONTACT = {
  location: "Franklin Park, NJ, USA",
  email: "sujithkumar.v.menon@gmail.com",
  phone: "609-297-6459",
  linkedin: "https://www.linkedin.com/in/sujithkumar-menon/",
  github: "https://github.com/smenon2710",
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Top navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
            <span className="text-sm font-semibold tracking-tight">
              Sujithkumar Menon
            </span>
            <span className="hidden text-xs text-slate-400 sm:inline">
              Analytics & AI Product Manager
            </span>
          </div>
          <nav className="hidden gap-4 text-xs font-medium text-slate-300 sm:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-1 hover:bg-slate-800 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-10">
        {/* Hero */}
        <section
          id="home"
          className="grid gap-10 pb-16 pt-4 md:grid-cols-[1.6fr,1fr] md:items-center"
        >
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
              Analytics Product Management · BI · GenAI
            </p>
            <h1 className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Turning data platforms and GenAI into{" "}
              <span className="text-emerald-400">
                measurable business outcomes.
              </span>
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              I&apos;m an Analytics and Business Intelligence leader with 14+
              years of experience building enterprise-scale data products,
              self-service BI ecosystems, and AI-powered insights for Fortune
              500 companies in financial services, payments, and consumer
              technology.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="#contact"
                className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-400"
              >
                Let&apos;s work together
              </Link>
              <Link
                href={CONTACT.linkedin}
                target="_blank"
                className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:border-emerald-400 hover:text-emerald-300"
              >
                View LinkedIn
              </Link>
              <Link
                href={CONTACT.github}
                target="_blank"
                className="text-xs text-slate-400 hover:text-slate-200"
              >
                GitHub
              </Link>
            </div>
          </div>

          {/* Quick stats card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
              Impact Snapshot
            </p>
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((h) => (
                <div
                  key={h.label}
                  className="rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-3"
                >
                  <div className="text-lg font-semibold text-emerald-400">
                    {h.value}
                  </div>
                  <div className="mt-1 text-xs text-slate-400">{h.label}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-400">
              Cap-exempt H1B visa holder · Open to roles in Data & AI Product
              Management, BI Strategy, and Analytics Platforms.
            </p>
          </div>
        </section>

        {/* About */}
        <section id="about" className="border-t border-slate-800 py-10">
          <h2 className="text-xl font-semibold tracking-tight">About Me</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300">
            I specialize in building analytics products that make complex data
            usable for decision-makers. From BI strategy and self-service
            enablement to GenAI-powered experiences, I focus on delivering
            measurable value: increased adoption, faster decision cycles, and
            operational efficiency. I enjoy translating ambiguous business
            problems into clear product roadmaps, collaborating with
            cross-functional teams, and shipping solutions that people actually
            use.
          </p>
        </section>

        {/* Experience */}
        <section id="experience" className="border-t border-slate-800 py-10">
          <h2 className="text-xl font-semibold tracking-tight">
            Experience & Impact
          </h2>
          <div className="mt-6 space-y-6">
            {experience.map((job) => (
              <div
                key={`${job.company}-${job.period}`}
                className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-50">
                      {job.role}
                    </h3>
                    <p className="text-xs text-slate-400">{job.company}</p>
                  </div>
                  <div className="text-right text-xs text-slate-500">
                    <div>{job.period}</div>
                    <div>{job.location}</div>
                  </div>
                </div>
                <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                  {job.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="border-t border-slate-800 py-10">
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="text-xl font-semibold tracking-tight">
              Featured Projects
            </h2>
            <span className="text-xs text-slate-400">
              Selected AI & analytics products
            </span>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.name}
                className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-5"
              >
                <h3 className="text-sm font-semibold text-slate-50">
                  {project.name}
                </h3>
                <p className="mt-2 text-xs text-slate-300">
                  {project.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tech.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-700 px-2 py-0.5 text-[10px] text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex gap-3 text-xs">
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    className="rounded-full bg-emerald-500 px-3 py-1 font-medium text-slate-950 hover:bg-emerald-400"
                  >
                    Live Demo
                  </Link>
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    className="rounded-full border border-slate-700 px-3 py-1 text-slate-200 hover:border-emerald-400 hover:text-emerald-300"
                  >
                    GitHub
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="border-t border-slate-800 py-10">
          <h2 className="text-xl font-semibold tracking-tight">
            Skills & Tooling
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {skillCategories.map((cat) => (
              <div
                key={cat.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/30 p-4"
              >
                <h3 className="text-sm font-semibold text-slate-50">
                  {cat.title}
                </h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-slate-950/60 px-2 py-0.5 text-[11px] text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Certifications */}
        <section
          id="education"
          className="border-t border-slate-800 py-10 md:flex md:gap-10"
        >
          <div className="md:w-1/2">
            <h2 className="text-xl font-semibold tracking-tight">Education</h2>
            <div className="mt-4 space-y-4">
              {education.map((e) => (
                <div
                  key={e.title}
                  className="rounded-2xl border border-slate-800 bg-slate-900/30 p-4"
                >
                  <h3 className="text-sm font-semibold text-slate-50">
                    {e.title}
                  </h3>
                  <p className="text-xs text-slate-400">{e.org}</p>
                  <p className="mt-2 text-xs text-slate-300">{e.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 md:mt-0 md:w-1/2">
            <h2 className="text-xl font-semibold tracking-tight">
              Certifications & Training
            </h2>
            <div className="mt-4 space-y-3">
              {certifications.map((c) => (
                <div
                  key={c.title}
                  className="rounded-xl border border-slate-800 bg-slate-900/30 p-3"
                >
                  <p className="text-xs font-semibold text-slate-50">
                    {c.title}
                  </p>
                  <p className="text-[11px] text-slate-400">{c.org}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="border-t border-slate-800 py-10">
          <h2 className="text-xl font-semibold tracking-tight">
            Let&apos;s Connect
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-slate-300">
            Ready to discuss how I can help drive your analytics and AI
            initiatives? Whether you&apos;re scaling a BI platform, exploring
            GenAI capabilities, or building data products from 0→1, I&apos;d
            love to talk.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-4">
              <p className="text-xs font-semibold text-slate-400">Location</p>
              <p className="mt-1 text-sm text-slate-100">{CONTACT.location}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-4">
              <p className="text-xs font-semibold text-slate-400">Email</p>
              <Link
                href={`mailto:${CONTACT.email}`}
                className="mt-1 block text-sm text-emerald-400 hover:text-emerald-300"
              >
                {CONTACT.email}
              </Link>
              <p className="mt-3 text-xs font-semibold text-slate-400">
                Phone
              </p>
              <p className="mt-1 text-sm text-slate-100">{CONTACT.phone}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-4">
              <p className="text-xs font-semibold text-slate-400">
                Profiles & Links
              </p>
              <div className="mt-2 flex flex-col gap-1.5 text-sm">
                <Link
                  href={CONTACT.linkedin}
                  target="_blank"
                  className="text-emerald-400 hover:text-emerald-300"
                >
                  LinkedIn
                </Link>
                <Link
                  href={CONTACT.github}
                  target="_blank"
                  className="text-emerald-400 hover:text-emerald-300"
                >
                  GitHub
                </Link>
              </div>
            </div>
          </div>

          <p className="mt-8 text-xs text-slate-500">
            © {new Date().getFullYear()} Sujithkumar Menon — Transforming data
            into actionable insights &amp; AI-powered products.
          </p>
        </section>
      </main>
    </div>
  );
}