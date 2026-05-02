import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, context } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "API key not configured. Add GEMINI_API_KEY to .env.local" });
  }

  if (!message?.trim()) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    // gemini-2.0-flash — confirmed reachable on this API version
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are "VoteBuddy", a helpful AI assistant for the Election Guide AI portal.
Your goal is to provide accurate, unbiased, and easy-to-understand information about Indian elections.

User Question: ${message}
Context: ${context || "General voting information"}

Guidelines:
- Be strictly neutral and non-partisan.
- Use simple language suitable for first-time voters.
- If unsure, suggest checking the official Election Commission of India website (eci.gov.in).
- Keep responses concise and friendly (2-4 sentences max).
- Do not make up data or statistics.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ 
      error: "Failed to fetch response from AI",
      detail: error?.message || "Unknown error"
    });
  }
}
