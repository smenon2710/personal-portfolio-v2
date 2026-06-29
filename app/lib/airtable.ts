const BASE = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}`;

async function fetchTable<T>(table: string): Promise<T[]> {
  const key = process.env.AIRTABLE_API_KEY;
  if (!key || !process.env.AIRTABLE_BASE_ID) return [];
  try {
    const params = new URLSearchParams({
      "sort[0][field]": "Sort",
      "sort[0][direction]": "asc",
    });
    const res = await fetch(`${BASE}/${encodeURIComponent(table)}?${params}`, {
      headers: { Authorization: `Bearer ${key}` },
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.records.map((r: { fields: T }) => r.fields);
  } catch {
    return [];
  }
}

export async function getHighlights() {
  type Row = { Label: string; Num: number; Suffix: string; Prefix: string };
  const rows = await fetchTable<Row>("Highlights");
  if (!rows.length) return null;
  return rows.map((r) => ({
    label: r.Label ?? "",
    num: r.Num ?? 0,
    suffix: r.Suffix ?? "",
    prefix: r.Prefix ?? "",
  }));
}

export async function getExperience() {
  type Row = { Company: string; Role: string; Location: string; Period: string; Bullets: string };
  const rows = await fetchTable<Row>("Experience");
  if (!rows.length) return null;
  return rows.map((r) => ({
    company: r.Company ?? "",
    role: r.Role ?? "",
    location: r.Location ?? "",
    period: r.Period ?? "",
    bullets: (r.Bullets ?? "").split("\n").map((b) => b.trim()).filter(Boolean),
  }));
}

export async function getProjects() {
  type Row = {
    Name: string; Description: string; Tech: string;
    LiveUrl: string; EmbedUrl: string; EmbedScale: number; EmbedHeight: number;
    GithubUrl: string; IsAgent: boolean;
  };
  const rows = await fetchTable<Row>("Projects");
  if (!rows.length) return null;
  return rows.map((r) => ({
    name: r.Name ?? "",
    description: r.Description ?? "",
    tech: (r.Tech ?? "").split(",").map((t) => t.trim()).filter(Boolean),
    liveUrl: r.LiveUrl ?? "",
    embedUrl: r.EmbedUrl ?? "",
    embedScale: r.EmbedScale ?? 1,
    embedHeight: r.EmbedHeight ?? 320,
    githubUrl: r.GithubUrl ?? "",
    isAgent: r.IsAgent ? (true as const) : undefined,
  }));
}

export async function getSkillCategories() {
  type Row = { Title: string; Accent: string; Items: string };
  const rows = await fetchTable<Row>("Skills");
  if (!rows.length) return null;
  return rows.map((r) => ({
    title: r.Title ?? "",
    accent: r.Accent ?? "#3b82f6",
    items: (r.Items ?? "").split("\n").map((s) => s.trim()).filter(Boolean),
  }));
}

export async function getEducation() {
  type Row = { Title: string; Org: string; Date: string; Detail: string; CertImage: string; CertLink: string };
  const rows = await fetchTable<Row>("Education");
  if (!rows.length) return null;
  return rows.map((r) => ({
    title: r.Title ?? "",
    org: r.Org ?? "",
    date: r.Date ?? "",
    detail: r.Detail ?? "",
    certImage: r.CertImage ?? "",
    certLink: r.CertLink ?? "",
  }));
}

export async function getCertifications() {
  type Row = {
    Title: string; Org: string; Date: string;
    ColorFrom: string; ColorTo: string; Initials: string;
    Link: string; LinkLabel: string; Verified: boolean;
  };
  const rows = await fetchTable<Row>("Certifications");
  if (!rows.length) return null;
  return rows.map((r) => ({
    title: r.Title ?? "",
    org: r.Org ?? "",
    date: r.Date ?? "",
    colorFrom: r.ColorFrom ?? "#1e3a5f",
    colorTo: r.ColorTo ?? "#2563eb",
    initials: r.Initials ?? "",
    link: r.Link ?? "",
    linkLabel: r.LinkLabel ?? "",
    verified: r.Verified ?? false,
  }));
}

export async function getContact() {
  type Row = { Location: string; Email: string; LinkedIn: string; GitHub: string };
  const rows = await fetchTable<Row>("Contact");
  if (!rows.length) return null;
  const r = rows[0];
  return {
    location: r.Location ?? "",
    email: r.Email ?? "",
    linkedin: r.LinkedIn ?? "",
    github: r.GitHub ?? "",
  };
}
