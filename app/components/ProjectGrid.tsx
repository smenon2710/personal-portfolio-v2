"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export type Project = {
  name: string;
  description: string;
  tech: string[];
  liveUrl: string;
  embedUrl: string;
  embedScale: number;
  embedHeight: number;
  githubUrl: string;
  isAgent?: true;
};

const EMBED_TIMEOUT_MS = 10_000;

function ProjectEmbed({ project }: { project: Project }) {
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function startLoad() {
    setState("loading");
    timerRef.current = setTimeout(() => setState("error"), EMBED_TIMEOUT_MS);
  }

  function handleLoad() {
    if (timerRef.current) clearTimeout(timerRef.current);
  }

  function handleError() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setState("error");
  }

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  if (state === "idle") {
    return (
      <div className="flex h-40 flex-col items-center justify-center gap-2 px-4 text-center text-xs text-slate-500">
        <p>
          Load an interactive preview of this app inside the card, or use{" "}
          <span className="font-semibold text-slate-700">Live Demo</span> to open
          it in a new tab.
        </p>
        <button
          onClick={startLoad}
          className="rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"
        >
          Load Preview
        </button>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="flex h-40 flex-col items-center justify-center gap-2 px-4 text-center text-xs text-slate-500">
        <p>Preview unavailable — the app may be sleeping or unreachable.</p>
        <Link
          href={project.liveUrl}
          target="_blank"
          className="rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"
        >
          Open in New Tab
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        transform: project.embedScale ? `scale(${project.embedScale})` : undefined,
        transformOrigin: "top left",
        width: project.embedScale ? `${100 / project.embedScale}%` : "100%",
        height: project.embedHeight ?? 260,
      }}
    >
      <iframe
        src={project.embedUrl}
        title={`${project.name} preview`}
        onLoad={handleLoad}
        onError={handleError}
        style={{ width: "100%", height: "100%", border: "0" }}
      />
    </div>
  );
}

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="mt-6 grid gap-6 md:grid-cols-2">
      {projects.map((project, i) => (
        <article
          key={project.name}
          data-reveal
          style={{ transitionDelay: `${i * 0.08}s` }}
          className={`flex flex-col rounded-3xl bg-white p-5 shadow-sm shadow-slate-200 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md ${
            project.isAgent ? "border border-blue-100" : ""
          }`}
        >
          <h3 className="font-display text-sm font-semibold text-slate-900">
            {project.name}
          </h3>
          <p className="mt-2 text-xs text-slate-600">{project.description}</p>
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

          {project.embedUrl && (
            <div className="mt-4 overflow-hidden rounded-2xl bg-slate-50">
              <ProjectEmbed project={project} />
            </div>
          )}

          <div className="mt-4 flex gap-3 text-xs">
            <Link
              href={project.liveUrl}
              target="_blank"
              className={`rounded-full px-3 py-1 font-medium text-white hover:bg-blue-700 ${
                project.isAgent ? "bg-blue-500" : "bg-blue-600"
              }`}
            >
              {project.isAgent ? "Open Agent" : "Live Demo"}
            </Link>
            <Link
              href={project.githubUrl}
              target="_blank"
              className="rounded-full border border-slate-200 px-3 py-1 font-medium text-slate-700 hover:border-blue-400 hover:text-blue-600"
            >
              GitHub
            </Link>
          </div>

          {project.isAgent && (
            <p className="mt-2 text-[11px] text-slate-500">
              Tip: You can also use the floating bubble in the bottom-right corner
              to chat with this agent while browsing the site.
            </p>
          )}
        </article>
      ))}
    </div>
  );
}
