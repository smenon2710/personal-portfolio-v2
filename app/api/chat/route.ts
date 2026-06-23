import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

type UserInfo = { name?: string; email?: string; purpose?: string };
type Message = { role: "user" | "assistant"; content: string };

let _context: string | null = null;

function getContext(): string {
  if (_context) return _context;
  const dir = path.join(process.cwd(), "data", "chatbot");
  const files = fs.readdirSync(dir).sort().filter((f) => f.endsWith(".md"));
  _context = files
    .map((f) => {
      const content = fs.readFileSync(path.join(dir, f), "utf-8");
      return `### ${f} ###\n${content.trim()}`;
    })
    .join("\n\n");
  return _context;
}

function extractEmail(text: string): string | null {
  return text.match(/[\w.-]+@[\w.-]+\.\w+/)?.[0] ?? null;
}

function extractName(text: string): string | null {
  const m = text.match(
    /(?:my name is|i am|i'm|call me)\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)/i
  );
  return m ? m[1].trim() : null;
}

const PURPOSE_KEYWORDS = [
  "job", "hiring", "career", "opportunity", "work", "inquiry",
  "testing", "demo", "feedback", "project", "collaboration",
  "consulting", "advice", "help", "looking", "interested",
  "want to", "exploring", "checking",
];

function extractPurpose(text: string, alreadyAsked: boolean): string | null {
  if (text.trim().length <= 3) return null;
  if (alreadyAsked) return text.trim();
  const lower = text.toLowerCase();
  return PURPOSE_KEYWORDS.some((k) => lower.includes(k)) ? text.trim() : null;
}

async function recordToAirtable(
  name: string,
  email: string,
  purpose: string
): Promise<void> {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_TABLE_NAME ?? "Leads";
  if (!apiKey || !baseId) return;
  try {
    await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: { Name: name, Email: email, Purpose: purpose },
        }),
      }
    );
  } catch (e) {
    console.error("Airtable error:", e);
  }
}

function buildSystemPrompt(context: string, userInfo: UserInfo): string {
  const name = userInfo.name || "Visitor";
  return `You are Sujithkumar Menon, an Analytics & AI Product Manager and Business Intelligence leader.
You are chatting with visitors to your personal portfolio website.

Use ONLY the provided context to answer questions about your background, skills, experience, and projects.
If something is not covered in the context, say so honestly rather than making it up.
Be concise, friendly, and professional. Address the user by name when natural.
The user's name is ${name}.

Context:
${context}`;
}

/** Stream a fixed string instantly (for gated/error responses). */
function streamText(text: string, userInfo: UserInfo): Response {
  const enc = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(enc.encode(text));
      controller.close();
    },
  });
  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-UserInfo": JSON.stringify(userInfo),
    },
  });
}

export async function POST(req: NextRequest) {
  let userInfo: UserInfo = {};

  try {
    const {
      message,
      history,
      userInfo: incoming,
    } = (await req.json()) as {
      message: string;
      history: Message[];
      userInfo: UserInfo;
    };

    userInfo = { ...incoming };

    // Extract email + name from message if not yet collected
    if (!userInfo.email) {
      const email = extractEmail(message);
      if (email) {
        userInfo.email = email;
        const name = extractName(message);
        if (name) {
          userInfo.name = name;
        } else {
          const before = message
            .slice(0, message.indexOf(email))
            .trim()
            .split(/\s+/)
            .pop()
            ?.replace(/[.,;:!?]$/, "");
          const skip = new Set([
            "hi", "hello", "hey", "my", "is", "and", "the", "i", "am",
          ]);
          if (before && !skip.has(before.toLowerCase())) {
            userInfo.name = before;
          }
        }
      }
    }

    // Gate 1 — need email
    if (!userInfo.email) {
      return streamText(
        "Hi! I'm Sujith's Digital Twin. I'd love to help you learn about his background and experience. Could you please share your name and email address first?",
        userInfo
      );
    }

    // Extract purpose if not yet collected
    if (!userInfo.purpose) {
      const alreadyAsked = history.some(
        (m) =>
          m.role === "assistant" && m.content.includes("brings you here")
      );
      const purpose = extractPurpose(message, alreadyAsked);
      if (purpose) userInfo.purpose = purpose;
    }

    // Gate 2 — need purpose
    if (!userInfo.purpose) {
      return streamText(
        "Thanks! What brings you here today? (e.g., job opportunity, project collaboration, general inquiry, just exploring, etc.)",
        userInfo
      );
    }

    // Record to Airtable the first time purpose is captured
    if (!incoming.purpose && userInfo.purpose) {
      await recordToAirtable(
        userInfo.name ?? "Visitor",
        userInfo.email,
        userInfo.purpose
      );
    }

    // Stream the LLM response
    const context = getContext();
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0,
      max_tokens: 1024,
      stream: true,
      messages: [
        { role: "system", content: buildSystemPrompt(context, userInfo) },
        ...history.map((m) => ({ role: m.role, content: m.content })),
        { role: "user", content: message },
      ],
    });

    const enc = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const text = chunk.choices[0]?.delta?.content ?? "";
            if (text) controller.enqueue(enc.encode(text));
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-UserInfo": JSON.stringify(userInfo),
      },
    });
  } catch (e) {
    console.error("Chat error:", e);
    return streamText(
      "Something went wrong. Please try again in a moment.",
      userInfo
    );
  }
}
