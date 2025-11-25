"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

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
  { label: "Years of Experience", value: "14+" },
  { label: "Efficiency Gains", value: "up to 60%" },
  { label: "User Adoption Increase", value: "35%" },
  { label: "On-time Delivery", value: "100%" },
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
    embedUrl: "https://restobot.vercel.app",
    embedScale: 1,
    embedHeight: 320,
    githubUrl: "https://github.com/smenon2710",
  },
  {
    name: "GenAI SQL Assistant",
    description:
      "Self-service GenAI analytics assistant that translates natural language into SQL, empowering non-technical users to query structured data and visualize insights in real time.",
    tech: ["Python", "Streamlit", "SQLite", "OpenAI", "NLP"],
    liveUrl:
      "https://agspurdue-e4xbcubsa45ww4cv5qmrnz.streamlit.app",
    embedUrl:
      "https://agspurdue-e4xbcubsa45ww4cv5qmrnz.streamlit.app/?embedded=true",
    embedScale: 0.8,
    embedHeight: 320,
    githubUrl: "https://github.com/smenon2710",
  },
  {
    name: "InsightMate – AI-Powered Data Exploration",
    description:
      "GenAI assistant that lets users upload datasets and ask questions in plain English. Uses GPT-4 to convert queries to DuckDB SQL and surfaces insights via interactive charts.",
    tech: ["GPT-4", "Streamlit", "DuckDB", "Plotly", "Pandas"],
    liveUrl: "https://ags-purdue-insightmate.streamlit.app",
    embedUrl: "https://ags-purdue-insightmate.streamlit.app/?embedded=true",
    embedScale: 0.7,
    embedHeight: 320,
    githubUrl: "https://github.com/smenon2710",
  },
  {
    name: "AI Stock Analyzer",
    description:
      "AI-driven financial insights tool that combines sector-based stock discovery, GPT recommendations, and trend visualizations using real-time and sentiment data.",
    tech: ["GPT-4", "Streamlit", "yFinance", "Plotly", "Sentiment Analysis"],
    liveUrl:
      "https://ai-financial-analyst-smenon2710.streamlit.app",
    embedUrl:
      "https://ai-financial-analyst-smenon2710.streamlit.app/?embedded=true",
    embedScale: 0.7,
    embedHeight: 320,
    githubUrl: "https://github.com/smenon2710",
  },
  {
    name: "Sujith's Digital Twin – AI Portfolio Agent",
    description:
      "An AI agent embedded into this site that answers questions about my background, experience, and how I approach analytics and product management.",
    tech: ["Hugging Face", "Gradio", "LLMs", "Prompt Engineering"],
    liveUrl: "https://smenon2710-sujith-chatbot.hf.space",
    embedUrl: "https://smenon2710-sujith-chatbot.hf.space",
    embedScale: 0.8,
    embedHeight: 320,
    githubUrl: "https://github.com/smenon2710",
    isAgent: true as const,
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

function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {open && (
        <div className="mb-3 w-[360px] max-w-[95vw] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Chat with Sujith
              </p>
              <p className="text-xs text-slate-500">Sujith&apos;s Digital Twin</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>
          <div className="h-[655px] w-full">
            <iframe
              src="https://smenon2710-sujith-chatbot.hf.space"
              title="Chat with Sujith"
              className="h-full w-full border-0"
              allow="clipboard-read; clipboard-write; microphone"
            />
          </div>
          <div className="border-t border-slate-200 bg-slate-50 px-4 py-2 text-center text-[11px] text-slate-400">
            Powered by Hugging Face · AI agent tuned on my profile
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700"
      >
        💬 Chat with my AI Agent
      </button>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              SM
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight">
                Sujithkumar Menon
              </span>
              <span className="text-[11px] text-slate-500">
                Analytics Product Manager · BI · GenAI
              </span>
            </div>
          </div>

          {/* Nav + CTA (desktop) */}
          <div className="hidden items-center gap-4 md:flex">
            <nav className="flex gap-4 text-xs font-medium text-slate-600">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-3 py-1 hover:bg-blue-50 hover:text-blue-700"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <Link
              href="https://calendar.app.google/7fvRq224455C7kNS8"
              target="_blank"
              className="rounded-full bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm shadow-blue-500/40 hover:bg-blue-700"
            >
              📅 Book Intro Call
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-10">
        {/* Hero */}
        <section
          id="home"
          className="mb-16 grid gap-10 md:grid-cols-[1.8fr,1.2fr] md:items-center"
        >
          {/* Left: intro */}
          <div className="rounded-3xl bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-blue-600">
              <span>🏠</span> Home
            </div>
            <h1 className="mb-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Analytics Product Manager | BI, GenAI &amp; Data Platforms
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-[15px]">
              I&apos;m an Analytics and Business Intelligence leader with 14+
              years of experience building enterprise-scale data products,
              self-service BI ecosystems, and AI-powered insights for Fortune
              500 companies in financial services, payments, and consumer
              technology.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="#contact"
                className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-blue-500/40 hover:bg-blue-700"
              >
                📩 Connect With Me
              </Link>
              <Link
                href="https://calendar.app.google/7fvRq224455C7kNS8"
                target="_blank"
                className="rounded-full border border-slate-200 px-4 py-2 text-xs font-medium text-slate-700 hover:border-blue-400 hover:text-blue-600"
              >
                📅 Book Intro Call
              </Link>
              <Link
                href={CONTACT.linkedin}
                target="_blank"
                className="rounded-full border border-slate-200 px-4 py-2 text-xs font-medium text-slate-700 hover:border-blue-400 hover:text-blue-600"
              >
                View LinkedIn
              </Link>
              <Link
                href={CONTACT.github}
                target="_blank"
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                GitHub
              </Link>
            </div>

            <div className="mt-7 grid gap-3 rounded-2xl bg-slate-50 p-4 sm:grid-cols-4">
              {highlights.map((h) => (
                <div key={h.label} className="text-center sm:text-left">
                  <div className="text-lg font-semibold text-blue-600">
                    {h.value}
                  </div>
                  <div className="mt-1 text-[11px] font-medium text-slate-500">
                    {h.label}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Cap-exempt H1B visa holder · Open to roles in Data &amp; AI
              Product Management, BI Strategy, and Analytics Platforms.
            </p>
          </div>

          {/* Right: photo card */}
          <div className="flex justify-center">
            <div className="relative flex w-full max-w-sm flex-col items-center rounded-3xl bg-gradient-to-b from-blue-50 via-white to-slate-50 p-6 shadow-[0_18px_45px_rgba(37,99,235,0.28)]">
              <div className="relative h-40 w-40">
                <div className="absolute inset-0 rounded-full bg-blue-300/60 blur-2xl" />
                <div className="relative h-full w-full overflow-hidden rounded-full border-[5px] border-blue-600 bg-white">
                  {/* ensure /sujith-profile.png exists in public/ */}
                  <Image
                    src="/sujith-profile.png"
                    alt="Sujithkumar Menon"
                    width={260}
                    height={260}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm font-semibold text-slate-900">
                  Sujithkumar Menon
                </p>
                <p className="text-xs text-slate-500">
                  Analytics &amp; AI Product Manager
                </p>
                <p className="mt-3 text-xs text-slate-500">
                  Building data and GenAI products that turn complex data into
                  measurable business outcomes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="mb-16">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            About Me
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
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
        <section id="experience" className="mb-16">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            Experience &amp; Impact
          </h2>
          <div className="mt-6 space-y-6">
            {experience.map((job) => (
              <div
                key={`${job.company}-${job.period}`}
                className="rounded-3xl bg-white p-5 shadow-sm shadow-slate-200"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      {job.role}
                    </h3>
                    <p className="text-xs text-slate-500">{job.company}</p>
                  </div>
                  <div className="text-right text-xs text-slate-500">
                    <div>{job.period}</div>
                    <div>{job.location}</div>
                  </div>
                </div>
                <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                  {job.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="mb-16">
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              Featured Projects
            </h2>
            <span className="text-xs text-slate-500">
              Selected AI &amp; analytics products
            </span>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.name}
                className={`flex flex-col rounded-3xl bg-white p-5 shadow-sm shadow-slate-200 ${
                  (project as any).isAgent ? "border border-blue-100" : ""
                }`}
              >
                <h3 className="text-sm font-semibold text-slate-900">
                  {project.name}
                </h3>
                <p className="mt-2 text-xs text-slate-600">
                  {project.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tech.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Embedded live preview (scaled to fit card) */}
                {project.embedUrl && (
                  <div className="mt-4 overflow-hidden rounded-2xl bg-slate-50">
                    <div
                      style={{
                        transform: project.embedScale
                          ? `scale(${project.embedScale})`
                          : undefined,
                        transformOrigin: "top left",
                        width: project.embedScale
                          ? `${100 / project.embedScale}%`
                          : "100%",
                        height: project.embedHeight ?? 260,
                      }}
                    >
                      <iframe
                        src={project.embedUrl}
                        title={`${project.name} preview`}
                        style={{
                          width: "100%",
                          height: "100%",
                          border: "0",
                        }}
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}

                <div className="mt-4 flex gap-3 text-xs">
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    className={`rounded-full px-3 py-1 font-medium text-white hover:bg-blue-700 ${
                      (project as any).isAgent
                        ? "bg-blue-500"
                        : "bg-blue-600"
                    }`}
                  >
                    { (project as any).isAgent ? "Open Agent" : "Live Demo" }
                  </Link>
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    className="rounded-full border border-slate-200 px-3 py-1 font-medium text-slate-700 hover:border-blue-400 hover:text-blue-600"
                  >
                    GitHub
                  </Link>
                </div>

                { (project as any).isAgent && (
                  <p className="mt-2 text-[11px] text-slate-500">
                    Tip: You can also use the floating bubble in the bottom-right
                    corner to chat with this agent while browsing the site.
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="mb-16">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            Skills &amp; Tooling
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {skillCategories.map((cat) => (
              <div
                key={cat.title}
                className="rounded-3xl bg-white p-4 shadow-sm shadow-slate-200"
              >
                <h3 className="text-sm font-semibold text-slate-900">
                  {cat.title}
                </h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700"
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
          className="mb-16 grid gap-10 md:grid-cols-2 md:items-start"
        >
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              Education
            </h2>
            <div className="mt-4 space-y-4">
              {education.map((e) => (
                <div
                  key={e.title}
                  className="rounded-3xl bg-white p-4 shadow-sm shadow-slate-200"
                >
                  <h3 className="text-sm font-semibold text-slate-900">
                    {e.title}
                  </h3>
                  <p className="text-xs text-slate-500">{e.org}</p>
                  <p className="mt-2 text-xs text-slate-600">{e.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              Certifications &amp; Training
            </h2>
            <div className="mt-4 space-y-3">
              {certifications.map((c) => (
                <div
                  key={c.title}
                  className="rounded-2xl bg-white p-3 shadow-sm shadow-slate-200"
                >
                  <p className="text-xs font-semibold text-slate-900">
                    {c.title}
                  </p>
                  <p className="text-[11px] text-slate-500">{c.org}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            Let&apos;s Connect
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-slate-600">
            Ready to discuss how I can help drive your analytics and AI
            initiatives? Whether you&apos;re scaling a BI platform, exploring
            GenAI capabilities, or building data products from 0→1, I&apos;d
            love to talk.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-4 shadow-sm shadow-slate-200">
              <p className="text-xs font-semibold text-slate-500">Location</p>
              <p className="mt-1 text-sm text-slate-900">{CONTACT.location}</p>
            </div>
            <div className="rounded-3xl bg-white p-4 shadow-sm shadow-slate-200">
              <p className="text-xs font-semibold text-slate-500">Email</p>
              <Link
                href={`mailto:${CONTACT.email}`}
                className="mt-1 block text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                {CONTACT.email}
              </Link>
              <p className="mt-3 text-xs font-semibold text-slate-500">
                Phone
              </p>
              <p className="mt-1 text-sm text-slate-900">{CONTACT.phone}</p>
            </div>
            <div className="rounded-3xl bg-white p-4 shadow-sm shadow-slate-200">
              <p className="text-xs font-semibold text-slate-500">
                Profiles &amp; Links
              </p>
              <div className="mt-2 flex flex-col gap-1.5 text-sm">
                <Link
                  href={CONTACT.linkedin}
                  target="_blank"
                  className="text-blue-600 hover:text-blue-700"
                >
                  LinkedIn
                </Link>
                <Link
                  href={CONTACT.github}
                  target="_blank"
                  className="text-blue-600 hover:text-blue-700"
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

      {/* Floating chatbot widget */}
      <ChatWidget />
    </div>
  );
}