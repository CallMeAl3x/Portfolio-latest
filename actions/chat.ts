"use server";
import { Mistral } from "@mistralai/mistralai";
import { ChatCompletionStreamRequestMessages } from "@mistralai/mistralai/models/components";

const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY
});

const MESSAGE_LIMIT = 15;
const MAX_TOKENS = 3000;

export async function sendMessage(messages: ChatCompletionStreamRequestMessages[], userInput: string) {
  if (typeof userInput !== "string" || !userInput.trim()) {
    return {
      error: "Message cannot be empty",
      messages
    };
  }

  if (messages.length >= MESSAGE_LIMIT) {
    return {
      error: "Message limit reached. Please clear some messages to continue.",
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
    console.error("Error:", error);
    return {
      error: "An error occurred while processing your request.",
      messages
    };
  }
}
