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
    <div className="min-h-screen bg-paper text-ink">
      <ScrollRevealInit />
      <Header />

      <main className="mx-auto max-w-5xl px-6 pb-20 pt-12">

        {/* ── Hero ── */}
        <section id="home" className="mb-28">
          <div className="flex items-start justify-between gap-8">
            <div className="flex-1" data-reveal>
              <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.22em] text-mid">
                Analytics · BI · Generative AI
              </p>
              <h1 className="font-display text-[clamp(3rem,7vw,5rem)] font-light leading-[1.05] tracking-tight text-ink">
                Sujithkumar
                <br />
                Menon
              </h1>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-mid">
                14 years turning complex data into decisions and AI into products.
                Analytics PM for Fortune 500 companies in fintech, payments, and
                consumer tech.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href="#contact"
                  className="bg-accent px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] text-paper transition-opacity hover:opacity-80"
                >
                  Connect
                </a>
                <a
                  href="/Sujithkumar_Menon_Resume_DA_AI.pdf"
                  download
                  className="border-b border-ink pb-px text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-mid hover:text-mid"
                >
                  Resume ↓
                </a>
                <Link
                  href={CONTACT.linkedin}
                  target="_blank"
                  className="text-[11px] uppercase tracking-[0.18em] text-mid transition-colors hover:text-ink"
                >
                  LinkedIn
                </Link>
                <Link
                  href={CONTACT.github}
                  target="_blank"
                  className="text-[11px] uppercase tracking-[0.18em] text-mid transition-colors hover:text-ink"
                >
                  GitHub
                </Link>
                <Link
                  href="https://calendar.app.google/7fvRq224455C7kNS8"
                  target="_blank"
                  className="text-[11px] uppercase tracking-[0.18em] text-mid transition-colors hover:text-ink"
                >
                  Book a Call
                </Link>
              </div>
            </div>

            {/* Photo */}
            <div
              className="mt-1 hidden shrink-0 md:block"
              data-reveal
              style={{ transitionDelay: "0.1s" }}
            >
              <div className="h-[88px] w-[88px] overflow-hidden rounded-full border border-rule">
                <Image
                  src="/sujith-profile.png"
                  alt="Sujithkumar Menon"
                  width={176}
                  height={176}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              <p className="mt-2 text-center text-[9px] uppercase tracking-[0.12em] text-mid">
                NYC Metro
              </p>
            </div>
          </div>

          {/* Signature element: editorial stat strip */}
          <div
            className="mt-16 grid grid-cols-2 gap-px bg-rule sm:grid-cols-4"
            data-reveal
            style={{ transitionDelay: "0.15s" }}
          >
            {highlights.map((h) => (
              <div key={h.label} className="bg-paper px-6 py-8">
                <div className="font-display text-[clamp(2.25rem,5vw,3.5rem)] font-light leading-none text-ink">
                  <CountUp target={h.num} suffix={h.suffix} prefix={h.prefix} />
                </div>
                <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-mid">
                  {h.label}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-[11px] text-mid">
            Cap-exempt H1B visa holder · Open to Data &amp; AI Product Management,
            BI Strategy, and Analytics Platform roles.
          </p>
        </section>

        {/* ── About ── */}
        <section id="about" className="mb-24 border-t border-rule pt-12" data-reveal>
          <p className="mb-1.5 text-[10px] uppercase tracking-[0.22em] text-mid">
            About
          </p>
          <h2 className="font-display mb-6 text-[1.75rem] font-light text-ink">
            Analytics by craft. Product by choice.
          </h2>
          <p className="max-w-2xl text-[15px] leading-relaxed text-mid">
            I specialize in building analytics products that make complex data usable
            for decision-makers. From BI strategy and self-service enablement to
            GenAI-powered experiences, I focus on delivering measurable value:
            increased adoption, faster decision cycles, and operational efficiency. I
            enjoy translating ambiguous business problems into clear product roadmaps,
            collaborating with cross-functional teams, and shipping solutions that
            people actually use.
          </p>
        </section>

        {/* ── Experience ── */}
        <section id="experience" className="mb-24 border-t border-rule pt-12">
          <p
            className="mb-1.5 text-[10px] uppercase tracking-[0.22em] text-mid"
            data-reveal
          >
            Experience
          </p>
          <h2
            className="font-display mb-10 text-[1.75rem] font-light text-ink"
            data-reveal
          >
            14 years of impact
          </h2>

          <div className="divide-y divide-rule">
            {experience.map((job, i) => (
              <div
                key={`${job.company}-${job.period}`}
                data-reveal
                style={{ transitionDelay: `${i * 0.06}s` }}
                className="grid gap-4 py-8 md:grid-cols-[1fr,auto]"
              >
                <div>
                  <h3 className="font-display text-[1.2rem] font-normal text-ink">
                    {job.role}
                  </h3>
                  <p className="mt-0.5 text-sm text-mid">
                    {job.company} · {job.location}
                  </p>
                  <ul className="mt-4 space-y-1.5 border-l border-rule pl-4">
                    {job.bullets.map((b) => (
                      <li key={b} className="text-[13px] leading-relaxed text-mid">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="shrink-0 text-sm text-mid md:text-right">
                  {job.period}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="projects" className="mb-24 border-t border-rule pt-12">
          <div data-reveal>
            <p className="mb-1.5 text-[10px] uppercase tracking-[0.22em] text-mid">
              Projects
            </p>
            <h2 className="font-display mb-10 text-[1.75rem] font-light text-ink">
              Selected AI &amp; analytics products
            </h2>
          </div>
          <ProjectGrid projects={projects} />
        </section>

        {/* ── Skills ── */}
        <section id="skills" className="mb-24 border-t border-rule pt-12">
          <p
            className="mb-1.5 text-[10px] uppercase tracking-[0.22em] text-mid"
            data-reveal
          >
            Skills
          </p>
          <h2
            className="font-display mb-10 text-[1.75rem] font-light text-ink"
            data-reveal
          >
            Tooling &amp; expertise
          </h2>
          <div className="divide-y divide-rule">
            {skillCategories.map((cat, i) => (
              <div
                key={cat.title}
                data-reveal
                style={{ transitionDelay: `${i * 0.07}s` }}
                className="grid items-baseline gap-4 py-6 md:grid-cols-[220px,1fr]"
              >
                <h3 className="font-display text-base font-normal text-ink">
                  {cat.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-mid">
                  {cat.items.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Education ── */}
        <section id="education" className="mb-24 border-t border-rule pt-12">
          <p
            className="mb-1.5 text-[10px] uppercase tracking-[0.22em] text-mid"
            data-reveal
          >
            Education
          </p>
          <h2
            className="font-display mb-10 text-[1.75rem] font-light text-ink"
            data-reveal
          >
            Academic background
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            {education.map((e, i) => (
              <div
                key={e.title}
                data-reveal
                style={{ transitionDelay: `${i * 0.1}s` }}
                className="overflow-hidden border border-rule"
              >
                <a
                  href={e.certLink}
                  target="_blank"
                  rel="noreferrer"
                  className="block bg-paper"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={e.certImage}
                      alt={`${e.title} certificate`}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                </a>
                <div className="border-t border-rule p-5">
                  <h3 className="font-display text-base font-normal text-ink">
                    {e.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-mid">{e.org}</p>
                  {e.date && (
                    <p className="mt-0.5 text-[11px] text-mid">{e.date}</p>
                  )}
                  <p className="mt-2 text-[13px] leading-relaxed text-mid">
                    {e.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <p
            className="mb-1.5 mt-14 text-[10px] uppercase tracking-[0.22em] text-mid"
            data-reveal
          >
            Certifications
          </p>
          <h2
            className="font-display mb-8 text-[1.75rem] font-light text-ink"
            data-reveal
          >
            Professional credentials
          </h2>

          <div className="grid gap-5 sm:grid-cols-3">
            {certifications.map((cert, i) => (
              <div
                key={cert.title}
                data-reveal
                style={{ transitionDelay: `${i * 0.09}s` }}
                className="border border-rule p-5"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center bg-accent font-sans text-[11px] font-medium text-paper">
                  {cert.initials}
                </div>
                <h3 className="font-display text-base font-normal leading-snug text-ink">
                  {cert.title}
                </h3>
                <p className="mt-1 text-sm text-mid">{cert.org}</p>
                <p className="mt-0.5 text-[11px] text-mid">{cert.date}</p>
                {cert.verified && (
                  <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-accent">
                    ✓ Verified
                  </p>
                )}
                <Link
                  href={cert.link}
                  target="_blank"
                  className="mt-4 block text-[11px] uppercase tracking-[0.15em] text-accent transition-opacity hover:opacity-70"
                >
                  {cert.linkLabel} →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── Contact ── */}
        <section
          id="contact"
          className="border-t border-rule pb-16 pt-12"
          data-reveal
        >
          <p className="mb-1.5 text-[10px] uppercase tracking-[0.22em] text-mid">
            Contact
          </p>
          <h2 className="font-display mb-6 text-[1.75rem] font-light text-ink">
            Let&apos;s work together.
          </h2>
          <p className="mb-10 max-w-md text-[15px] leading-relaxed text-mid">
            Open to analytics PM, BI strategy, and AI product roles. Ready to
            discuss how data can drive your next initiative.
          </p>

          <div className="grid gap-8 text-sm sm:grid-cols-3">
            <div>
              <p className="mb-2 text-[9px] uppercase tracking-[0.22em] text-mid">
                Location
              </p>
              <p className="text-ink">{CONTACT.location}</p>
            </div>
            <div>
              <p className="mb-2 text-[9px] uppercase tracking-[0.22em] text-mid">
                Email
              </p>
              <Link
                href={`mailto:${CONTACT.email}`}
                className="text-accent transition-opacity hover:opacity-70"
              >
                {CONTACT.email}
              </Link>
            </div>
            <div>
              <p className="mb-2 text-[9px] uppercase tracking-[0.22em] text-mid">
                Links
              </p>
              <div className="flex flex-col gap-1.5">
                <Link
                  href={CONTACT.linkedin}
                  target="_blank"
                  className="text-accent transition-opacity hover:opacity-70"
                >
                  LinkedIn
                </Link>
                <Link
                  href={CONTACT.github}
                  target="_blank"
                  className="text-accent transition-opacity hover:opacity-70"
                >
                  GitHub
                </Link>
                <Link
                  href="https://calendar.app.google/7fvRq224455C7kNS8"
                  target="_blank"
                  className="text-accent transition-opacity hover:opacity-70"
                >
                  Book Intro Call
                </Link>
              </div>
            </div>
          </div>

          <p className="mt-12 text-[11px] text-mid">
            © {new Date().getFullYear()} Sujithkumar Menon — Transforming data into
            actionable insights &amp; AI-powered products.
          </p>
        </section>
      </main>

      <ChatWidget />
    </div>
  );
}
