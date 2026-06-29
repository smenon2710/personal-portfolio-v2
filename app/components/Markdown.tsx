import type { ReactNode } from "react";

function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*"))
      return <em key={i}>{part.slice(1, -1)}</em>;
    return part;
  });
}

export function renderMarkdown(text: string): ReactNode {
  const lines = text.split("\n");
  const out: ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (/^[-*] /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*] /.test(lines[i]))
        items.push(lines[i++].slice(2));
      out.push(
        <ul key={i} className="my-1 list-disc space-y-0.5 pl-4">
          {items.map((it, j) => <li key={j}>{renderInline(it)}</li>)}
        </ul>
      );
      continue;
    }
    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i]))
        items.push(lines[i++].replace(/^\d+\. /, ""));
      out.push(
        <ol key={i} className="my-1 list-decimal space-y-0.5 pl-4">
          {items.map((it, j) => <li key={j}>{renderInline(it)}</li>)}
        </ol>
      );
      continue;
    }
    if (/^#{1,3} /.test(line)) {
      out.push(
        <p key={i} className="font-semibold">
          {renderInline(line.replace(/^#{1,3} /, ""))}
        </p>
      );
      i++;
      continue;
    }
    if (line.trim() === "") { i++; continue; }
    out.push(<p key={i}>{renderInline(line)}</p>);
    i++;
  }
  return <div className="space-y-1">{out}</div>;
}

export default function Markdown({ text }: { text: string }) {
  return <>{renderMarkdown(text)}</>;
}
