import Link from "next/link";
import Image from "next/image";
import Header from "./components/Header";
import CountUp from "./components/CountUp";
import ProjectGrid from "./components/ProjectGrid";
import ChatWidget from "./components/ChatWidget";
import ScrollRevealInit from "./components/ScrollRevealInit";
import type { Project } from "./components/ProjectGrid";
import {
  getHighlights,
  getExperience,
  getProjects,
  getSkillCategories,
  getEducation,
  getCertifications,
  getContact,
} from "./lib/airtable";

export const revalidate = 60;

// ── Static fallbacks (used when Airtable tables are not yet populated) ──────────
const FALLBACK_HIGHLIGHTS = [
  { label: "Years of Experience", num: 14, suffix: "+", prefix: "" },
  { label: "Efficiency Gains", num: 60, suffix: "%", prefix: "up to " },
  { label: "User Adoption Increase", num: 35, suffix: "%", prefix: "" },
  { label: "On-time Delivery", num: 100, suffix: "%", prefix: "" },
];

const FALLBACK_EXPERIENCE = [
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

const FALLBACK_PROJECTS: Project[] = [
  {
    name: "Restobot – AI Restaurant Assistant",
    description:
      "End-to-end AI product for restaurant discovery and decision support. Consolidates restaurant search, comparison, and recommendations into a single conversational interface.",
    tech: ["GPT-3.5", "Next.js", "SerpAPI", "Vercel", "Product Management"],
    liveUrl: "https://restobot.vercel.app",
    embedUrl: "https://restobot.vercel.app",
    embedScale: 1,
    embedHeight: 320,
    githubUrl: "https://github.com/smenon2710/restobot",
  },
  {
    name: "GenAI SQL Assistant",
    description:
      "Self-service GenAI analytics assistant that translates natural language into SQL, empowering non-technical users to query structured data and visualize insights in real time.",
    tech: ["Python", "Streamlit", "SQLite", "OpenAI", "NLP"],
    liveUrl: "https://agspurdue-e4xbcubsa45ww4cv5qmrnz.streamlit.app",
    embedUrl:
      "https://agspurdue-e4xbcubsa45ww4cv5qmrnz.streamlit.app/?embedded=true",
    embedScale: 0.8,
    embedHeight: 320,
    githubUrl: "https://github.com/smenon2710/AGS_Purdue/tree/main/nl2insights",
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
    githubUrl: "https://github.com/smenon2710/AGS_Purdue/tree/main/auto_bi_plus",
  },
  {
    name: "AI Stock Analyzer",
    description:
      "AI-driven financial insights tool that combines sector-based stock discovery, GPT recommendations, and trend visualizations using real-time and sentiment data.",
    tech: ["GPT-4", "Streamlit", "yFinance", "Plotly", "Sentiment Analysis"],
    liveUrl: "https://ai-financial-analyst-smenon2710.streamlit.app",
    embedUrl:
      "https://ai-financial-analyst-smenon2710.streamlit.app/?embedded=true",
    embedScale: 0.7,
    embedHeight: 320,
    githubUrl: "https://github.com/smenon2710/ai-financial-analyst",
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
    githubUrl: "https://github.com/smenon2710/twin",
    isAgent: true,
  },
];

const FALLBACK_SKILL_CATEGORIES = [
  {
    title: "Product Management",
    accent: "#3b82f6",
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
    accent: "#6366f1",
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
    accent: "#8b5cf6",
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
    accent: "#06b6d4",
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

const FALLBACK_EDUCATION = [
  {
    title: "B.E., Information Technology",
    org: "Pimpri Chinchwad College of Engineering",
    date: "",
    detail:
      "Foundation in software engineering, data structures, databases, and system design.",
    certImage: "/be-cert.jpg",
    certLink: "/be-cert.jpg",
  },
  {
    title: "Applied Generative AI Bootcamp",
    org: "Purdue University",
    date: "May 2025",
    detail:
      "Intensive program covering LLMs, RAG pipelines, prompt engineering, and building AI-powered applications.",
    certImage: "/purdue-genai-cert.jpg",
    certLink: "/purdue-genai-cert.jpg",
  },
];

const FALLBACK_CERTIFICATIONS = [
  {
    title: "Tableau Certified Data Analyst",
    org: "Tableau",
    date: "Jun 2024",
    colorFrom: "#1e3a5f",
    colorTo: "#2563eb",
    initials: "TDA",
    link: "https://www.credly.com/badges/988edc4b-5fd1-46d1-8b66-f25f6e2356a0",
    linkLabel: "Verify on Credly",
    verified: true,
  },
  {
    title: "Product Manager Certified",
    org: "Product School",
    date: "Dec 2024",
    colorFrom: "#7c2d12",
    colorTo: "#ea580c",
    initials: "PMC",
    link: "/pm-cert.pdf",
    linkLabel: "View Certificate",
    verified: false,
  },
];

const FALLBACK_CONTACT = {
  location: "New York City Metropolitan Area",
  email: "sujithkumar.v.menon@gmail.com",
  linkedin: "https://www.linkedin.com/in/sujithkumar-menon/",
  github: "https://github.com/smenon2710",
};

// ── Page ───────────────────────────────────────────────────────────────────────
export default async function Home() {
  const [
    hlData,
    expData,
    projData,
    skillData,
    eduData,
    certData,
    contactData,
  ] = await Promise.all([
    getHighlights(),
    getExperience(),
    getProjects(),
    getSkillCategories(),
    getEducation(),
    getCertifications(),
    getContact(),
  ]);

  const highlights = hlData ?? FALLBACK_HIGHLIGHTS;
  const experience = expData ?? FALLBACK_EXPERIENCE;
  const projects: Project[] = (projData ?? FALLBACK_PROJECTS) as Project[];
  const skillCategories = skillData ?? FALLBACK_SKILL_CATEGORIES;
  const education = eduData ?? FALLBACK_EDUCATION;
  const certifications = certData ?? FALLBACK_CERTIFICATIONS;
  const CONTACT = contactData ?? FALLBACK_CONTACT;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <ScrollRevealInit />
      <Header />

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-10">
        {/* ── Hero ── */}
        <section
          id="home"
          className="mb-16 grid gap-10 md:grid-cols-[1.8fr,1.2fr] md:items-center"
        >
          {/* Left: intro card */}
          <div
            data-reveal
            style={{ transitionDelay: "0.05s" }}
            className="rounded-3xl bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
          >
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Analytics · BI · Generative AI
            </p>
            <h1 className="font-display mb-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
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
                className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-blue-500/30 hover:bg-blue-700"
              >
                Connect With Me
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
              <a
                href="/Sujithkumar_Menon_Resume_DA_AI.pdf"
                download
                className="rounded-full border border-slate-200 px-4 py-2 text-xs font-medium text-slate-700 hover:border-blue-400 hover:text-blue-600"
              >
                ↓ Resume
              </a>
            </div>

            {/* Animated stat counters */}
            <div className="mt-7 grid gap-px rounded-2xl border border-slate-100 bg-slate-100 sm:grid-cols-4">
              {highlights.map((h) => (
                <div
                  key={h.label}
                  className="flex flex-col items-start rounded-[inherit] bg-white px-4 py-3 first:rounded-l-2xl last:rounded-r-2xl max-sm:first:rounded-t-2xl max-sm:first:rounded-bl-none max-sm:last:rounded-b-2xl max-sm:last:rounded-tr-none"
                >
                  <div className="font-display text-2xl font-bold tracking-tight text-slate-900">
                    <CountUp target={h.num} suffix={h.suffix} prefix={h.prefix} />
                  </div>
                  <div className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-400">
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
          <div
            data-reveal
            style={{ transitionDelay: "0.18s" }}
            className="relative flex justify-center"
          >
            <div
              className="pointer-events-none absolute inset-0 -z-10 blur-3xl"
              style={{
                background:
                  "radial-gradient(ellipse 85% 85% at 50% 45%, rgba(147,197,253,0.5) 0%, rgba(196,181,253,0.2) 50%, transparent 70%)",
              }}
            />
            <div className="relative flex w-full max-w-sm flex-col items-center rounded-3xl bg-gradient-to-b from-blue-50 via-white to-slate-50 p-6 shadow-[0_18px_45px_rgba(37,99,235,0.28)]">
              <div className="relative h-40 w-40">
                <div className="absolute inset-0 rounded-full bg-blue-300/60 blur-2xl" />
                <div className="relative h-full w-full overflow-hidden rounded-full border-[5px] border-blue-600 bg-white">
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
                <p className="font-display text-sm font-semibold text-slate-900">
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

        {/* ── About ── */}
        <section id="about" className="mb-16" data-reveal>
          <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold tracking-tight text-slate-900">
            <span className="inline-block h-5 w-[3px] shrink-0 rounded-full bg-blue-600" aria-hidden="true" />
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

        {/* ── Experience ── */}
        <section id="experience" className="mb-16">
          <h2
            className="flex items-center gap-2.5 font-display text-xl font-semibold tracking-tight text-slate-900"
            data-reveal
          >
            <span className="inline-block h-5 w-[3px] shrink-0 rounded-full bg-blue-600" aria-hidden="true" />
            Experience &amp; Impact
          </h2>
          <div className="relative mt-6">
            <div className="absolute bottom-3 left-[7px] top-3 w-px bg-blue-200" />
            <div className="space-y-6">
              {experience.map((job, i) => (
                <div
                  key={`${job.company}-${job.period}`}
                  data-reveal
                  style={{ transitionDelay: `${i * 0.07}s` }}
                  className="relative pl-8"
                >
                  <div className="absolute left-0 top-5 h-3.5 w-3.5 rounded-full border-2 border-blue-500 bg-white" />
                  <div className="rounded-3xl bg-white p-5 shadow-sm shadow-slate-200 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <h3 className="font-display text-sm font-semibold text-slate-900">
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
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="projects" className="mb-16">
          <div className="flex items-baseline justify-between gap-2" data-reveal>
            <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold tracking-tight text-slate-900">
              <span className="inline-block h-5 w-[3px] shrink-0 rounded-full bg-blue-600" aria-hidden="true" />
              Featured Projects
            </h2>
            <span className="text-xs text-slate-500">
              Selected AI &amp; analytics products
            </span>
          </div>
          <ProjectGrid projects={projects} />
        </section>

        {/* ── Skills ── */}
        <section id="skills" className="mb-16">
          <h2
            className="flex items-center gap-2.5 font-display text-xl font-semibold tracking-tight text-slate-900"
            data-reveal
          >
            <span className="inline-block h-5 w-[3px] shrink-0 rounded-full bg-blue-600" aria-hidden="true" />
            Skills &amp; Tooling
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {skillCategories.map((cat, i) => (
              <div
                key={cat.title}
                data-reveal
                style={{ transitionDelay: `${i * 0.07}s` }}
                className="overflow-hidden rounded-3xl bg-white shadow-sm shadow-slate-200 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="h-1" style={{ backgroundColor: cat.accent }} />
                <div className="p-4">
                  <h3 className="font-display text-sm font-semibold text-slate-900">
                    {cat.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Education & Certifications ── */}
        <section id="education" className="mb-16 space-y-12">
          <div data-reveal>
            <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold tracking-tight text-slate-900">
              <span className="inline-block h-5 w-[3px] shrink-0 rounded-full bg-blue-600" aria-hidden="true" />
              Education
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {education.map((e, i) => (
                <div
                  key={e.title}
                  data-reveal
                  style={{ transitionDelay: `${i * 0.1}s` }}
                  className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm shadow-slate-200 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <a
                    href={e.certLink}
                    target="_blank"
                    rel="noreferrer"
                    className="group block overflow-hidden bg-slate-50"
                  >
                    <div className="relative h-52 w-full">
                      <Image
                        src={e.certImage}
                        alt={`${e.title} certificate`}
                        fill
                        className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                  </a>
                  <div className="p-4">
                    <h3 className="font-display text-sm font-semibold text-slate-900">
                      {e.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-slate-500">{e.org}</p>
                    {e.date && (
                      <p className="mt-0.5 text-[11px] text-slate-400">{e.date}</p>
                    )}
                    <p className="mt-2 text-xs text-slate-600">{e.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2
              className="flex items-center gap-2.5 font-display text-xl font-semibold tracking-tight text-slate-900"
              data-reveal
            >
              <span className="inline-block h-5 w-[3px] shrink-0 rounded-full bg-blue-600" aria-hidden="true" />
              Certifications &amp; Training
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {certifications.map((cert, i) => (
                <div
                  key={cert.title}
                  data-reveal
                  style={{ transitionDelay: `${i * 0.09}s` }}
                  className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm shadow-slate-200 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    style={{
                      background: `linear-gradient(135deg, ${cert.colorFrom}, ${cert.colorTo})`,
                    }}
                    className="relative flex h-32 items-center justify-center overflow-hidden"
                  >
                    <span className="absolute select-none text-[68px] font-black leading-none text-white/10">
                      {cert.initials}
                    </span>
                    <span className="font-display relative text-2xl font-bold tracking-tight text-white/90">
                      {cert.initials}
                    </span>
                    {cert.verified && (
                      <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <div>
                      <h3 className="font-display text-sm font-semibold leading-snug text-slate-900">
                        {cert.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">{cert.org}</p>
                      <p className="mt-0.5 text-[11px] text-slate-400">{cert.date}</p>
                    </div>
                    <div className="mt-auto pt-4">
                      <Link
                        href={cert.link}
                        target="_blank"
                        className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                      >
                        {cert.linkLabel} →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" data-reveal>
          <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold tracking-tight text-slate-900">
            <span className="inline-block h-5 w-[3px] shrink-0 rounded-full bg-blue-600" aria-hidden="true" />
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

      <ChatWidget />
    </div>
  );
}
