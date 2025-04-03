"use server";
import { Mistral } from "@mistralai/mistralai";
import { ChatCompletionStreamRequestMessages } from "@mistralai/mistralai/models/components";
import { headers } from "next/headers";

const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY
});

const MESSAGE_LIMIT = 20;
const MAX_TOKENS = 3000;
const REQUEST_LIMIT = 20; // Increased request limit to 15
const TIME_WINDOW = 300000; // 5 minutes in milliseconds
const BLOCK_DURATION = 3600000; // 1 hour in milliseconds

// In-memory store for rate limiting
const requestCounts: {
  [ip: string]: { count: number; firstRequestTime: number; blockedUntil: number | null; hasBeenBanned?: boolean };
} = {};

export async function sendMessage(
  messages: ChatCompletionStreamRequestMessages[],
  userInput: string,
  overrideIp?: string
) {
  // Use overrideIp if provided, otherwise get IP from headers
  const ipHeaders = overrideIp ? { get: () => overrideIp } : await headers();
  const ip = ipHeaders.get("x-forwarded-for") || "127.0.0.1";

  if (!ip) {
    return {
      error: { message: "Could not determine IP address" },
      messages
    };
  }

  const now = Date.now();

  // Check if IP is blocked
  if (requestCounts[ip] && requestCounts[ip].blockedUntil && now < requestCounts[ip].blockedUntil) {
    const timeLeft = Math.ceil((requestCounts[ip].blockedUntil - now) / 60000);
    return {
      error: {
        message: `Too many requests. Your IP is temporarily blocked. Please try again in ${timeLeft} minutes.`,
        isRateLimited: true
      },
      messages
    };
  }

  // Rate limiting logic
  if (requestCounts[ip] && now - requestCounts[ip].firstRequestTime < TIME_WINDOW) {
    if (requestCounts[ip].count >= REQUEST_LIMIT) {
      if (requestCounts[ip].hasBeenBanned) {
        requestCounts[ip].blockedUntil = Infinity;
        return {
          error: { message: "Too many requests. Your IP has been permanently banned.", isRateLimited: true },
          messages
        };
      } else {
        requestCounts[ip].blockedUntil = now + BLOCK_DURATION;
        requestCounts[ip].hasBeenBanned = true;
        const timeLeft = Math.ceil(BLOCK_DURATION / 60000);
        return {
          error: {
            message: `Too many requests. Your IP is temporarily blocked. Please try again in ${timeLeft} minutes.`,
            isRateLimited: true
          },
          messages
        };
      }
    } else {
      requestCounts[ip].count++;
    }
  } else {
    // Reset count and update firstRequestTime
    requestCounts[ip] = { count: 1, firstRequestTime: now, blockedUntil: null, hasBeenBanned: false };
  }

  if (typeof userInput !== "string" || !userInput.trim()) {
    return {
      error: { message: "Message cannot be empty" },
      messages
    };
  }

  if (messages.length >= MESSAGE_LIMIT) {
    return {
      error: { message: "Message limit reached. Please clear some messages to continue." },
      messages
    };
  }

  try {
    const context: ChatCompletionStreamRequestMessages[] = [...messages, { role: "user", content: userInput }];
    const response = await client.agents.complete({
      agentId: "ag:f926671b:20250401:untitled-agent:ae3cd6ae", // Utilisation de l'ID agent spécifié
      messages: context,
      maxTokens: MAX_TOKENS
    });

    const reply = response.choices?.[0]?.message?.content || "No response available";

    return {
      messages: [...context, { role: "assistant", content: reply }],
      error: null
    };
  } catch (error) {
    console.error("Error in sendMessage:", error);
    const errMsg = error instanceof Error ? error.message : "An unknown error occurred";
    return {
      error: { message: `An error occurred: ${errMsg}` },
      messages
    };
  }
}

// Updated cleanup function to preserve blocked records until BLOCK_DURATION expires
setInterval(() => {
  const now = Date.now();
  for (const ip in requestCounts) {
    if (requestCounts[ip].blockedUntil !== null) {
      if (now > requestCounts[ip].blockedUntil) {
        delete requestCounts[ip];
      }
      // Do not delete if still within BLOCK_DURATION
    } else if (now - requestCounts[ip].firstRequestTime > TIME_WINDOW) {
      delete requestCounts[ip];
    }
  }
}, 60000); // Run every minute
