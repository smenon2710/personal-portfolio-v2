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
      <div className="flex h-40 flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="text-[12px] text-mid">
          Load an interactive preview, or use{" "}
          <span className="text-ink">Live Demo</span> to open in a new tab.
        </p>
        <button
          onClick={startLoad}
          className="text-[11px] uppercase tracking-[0.18em] text-accent transition-opacity hover:opacity-70"
        >
          Load Preview →
        </button>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="flex h-40 flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="text-[12px] text-mid">
          Preview unavailable — the app may be sleeping or unreachable.
        </p>
        <Link
          href={project.liveUrl}
          target="_blank"
          className="text-[11px] uppercase tracking-[0.18em] text-accent transition-opacity hover:opacity-70"
        >
          Open in New Tab →
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
    <div className="grid gap-5 md:grid-cols-2">
      {projects.map((project, i) => (
        <article
          key={project.name}
          data-reveal
          style={{ transitionDelay: `${i * 0.08}s` }}
          className="flex flex-col border border-rule transition-colors duration-200 hover:border-mid"
        >
          <div className="flex-1 p-5">
            {project.isAgent && (
              <p className="mb-1.5 text-[9px] uppercase tracking-[0.2em] text-accent">
                AI Agent
              </p>
            )}
            <h3 className="font-display text-[1.1rem] font-normal text-ink">
              {project.name}
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-mid">
              {project.description}
            </p>
            <p className="mt-3 text-[12px] text-mid opacity-70">
              {project.tech.join(" · ")}
            </p>
          </div>

          {project.embedUrl && (
            <div className="overflow-hidden border-t border-rule bg-paper">
              <ProjectEmbed project={project} />
            </div>
          )}

          <div className="flex gap-6 border-t border-rule px-5 py-3">
            <Link
              href={project.liveUrl}
              target="_blank"
              className="text-[11px] uppercase tracking-[0.15em] text-accent transition-opacity hover:opacity-70"
            >
              {project.isAgent ? "Open Agent" : "Live Demo"} →
            </Link>
            <Link
              href={project.githubUrl}
              target="_blank"
              className="text-[11px] uppercase tracking-[0.15em] text-mid transition-colors hover:text-ink"
            >
              GitHub →
            </Link>
          </div>

          {project.isAgent && (
            <p className="border-t border-rule px-5 py-2 text-[11px] text-mid">
              Tip: Use the chat bubble in the bottom-right to talk with this agent while browsing.
            </p>
          )}
        </article>
      ))}
    </div>
  );
}
