import { NextResponse } from "next/server";
import { getDemoRecommendation } from "@/lib/demoRecommendations";
import type { BookRecommendation } from "@/lib/types";

const GEMINI_MODELS = ["gemini-1.5-flash", "gemini-2.0-flash"] as const;

function isValidApiKey(key: string | undefined): key is string {
  if (!key) return false;
  const trimmed = key.trim();
  return trimmed.length > 0 && trimmed !== "your_api_key_here";
}

function parseRecommendation(text: string): BookRecommendation | null {
  try {
    const parsed = JSON.parse(text) as BookRecommendation;
    if (
      typeof parsed.title === "string" &&
      typeof parsed.author === "string" &&
      typeof parsed.reason === "string"
    ) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

function buildPrompt(mood: string): string {
  return `你是一位专业的图书侍酒师。根据用户当前的情绪或心境，推荐一本最合适的书。
用户描述：${mood}
请用中文回复，推荐理由要温暖、有洞察力，像一位懂书的朋友在对话。`;
}

async function callGemini(
  apiKey: string,
  model: string,
  mood: string
): Promise<BookRecommendation> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: buildPrompt(mood) }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              title: { type: "string", description: "书名" },
              author: { type: "string", description: "作者" },
              reason: { type: "string", description: "推荐理由，结合用户情绪" },
            },
            required: ["title", "author", "reason"],
          },
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Gemini API error (${model}):`, errorText);
    throw new Error(`GEMINI_HTTP_${response.status}`);
  }

  const data = (await response.json()) as {
    candidates?: Array<{
      content?: { parts?: Array<{ text?: string }> };
    }>;
  };

  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) {
    throw new Error("GEMINI_EMPTY_RESPONSE");
  }

  const recommendation = parseRecommendation(rawText);
  if (!recommendation) {
    throw new Error("GEMINI_INVALID_JSON");
  }

  return recommendation;
}

export async function POST(request: Request) {
  let mood: string;

  try {
    const body = (await request.json()) as { mood?: string };
    mood = body.mood?.trim() ?? "";
  } catch {
    return NextResponse.json({ error: "请求格式无效。" }, { status: 400 });
  }

  if (!mood) {
    return NextResponse.json({ error: "请先描述你的心情或阅读需求。" }, { status: 400 });
  }

  if (!isValidApiKey(process.env.GEMINI_API_KEY)) {
    return NextResponse.json({ ...getDemoRecommendation(mood), demo: true });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  let lastError: unknown;

  for (const model of GEMINI_MODELS) {
    try {
      const recommendation = await callGemini(apiKey, model, mood);
      return NextResponse.json(recommendation);
    } catch (error) {
      lastError = error;
      console.error(`Recommend API failed with ${model}:`, error);
    }
  }

  console.warn("Gemini unavailable, falling back to demo recommendation:", lastError);
  return NextResponse.json({ ...getDemoRecommendation(mood), demo: true });
}
