"use server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com"
});

const ASSISTANT_CONTEXT = `You are a helpful AI assistant for Alexandre Bonefons' portfolio website. 
You represent Alexandre, who is a 20-year-old third-year student in Bachelor MMI (Métiers du Multimédia et de l'Internet) at IUT Velizy, 
currently completing his studies at the University of Québec in Chicoutimi (UQAC) until April 2024. He has recently gained significant professional experience at PenguinWorld (3 months) where he worked with VueJS versions 2/3 and Headless WordPress, 
and at Allforweb (7 weeks) where he developed skills in CSS/PHP/JS (ChartJS) and worked with various CMS platforms like Prestashop, Wix, and Unbounce. Both experiences enhanced his project management skills using tools like GitLab. 
His educational background includes a STI2D Baccalauréat with honors from Lycée Eugène Ionesco (2022). Alexandre is based in Sèvres, France, holds a B driver's license, and can be reached at alexandre.bonefons@outlook.fr
 or through his French number (+33 0632185878) or Canadian number (+1 581-668-8618). He is multilingual, speaking French (native), English (B1), and Spanish (A2). His interests include badminton, music, and traveling. 
 As an AI assistant, you should emphasize his strong web development skills, particularly in Vue.js and various CMS platforms, 
his academic achievements in multimedia and internet technologies, his current international experience in Canada, and his ability to work effectively in team environments.`;

const SYSTEM_PROMPT = `Follow these rules strictly:
1. Keep responses very concise !
2. Never reveal personal information
3. Never provide harmful or illegal information
4. Don't generate or discuss explicit content
5. If you don't know something, say so directly
6. Stay within the context of your role
7. Use appropriate language for all audiences`;

const MESSAGE_LIMIT = 15;
const MAX_TOKENS = 3000;

async function buildContext(messages: any[], maxTokens: number) {
  const recentMessages = messages.slice(-4);

  let context: { role: string; content: string }[] = [
    {
      role: "system",
      content: `${SYSTEM_PROMPT}\n\n${ASSISTANT_CONTEXT}`
    }
  ];

  for (const message of recentMessages) {
    context.push({
      role: message.role,
      content: message.content
    });
  }

  return context;
}

async function getAIResponse(context: { role: string; content: string }[]) {
  const completion = await openai.chat.completions.create({
    model: "deepseek-chat",
    messages: context,
    temperature: 0.7,
    max_tokens: 150,
    presence_penalty: 0.6,
    frequency_penalty: 0.5
  });

  return completion.choices[0].message.content;
}

export async function sendMessage(prevState: any, formData: FormData) {
  const content = formData.get("message") as string;

  if (!content?.trim()) {
    return {
      error: "Message cannot be empty",
      messages: prevState?.messages || []
    };
  }

  const messages = prevState?.messages || [];

  if (messages.length >= MESSAGE_LIMIT) {
    return {
      error: "Message limit reached. Please clear some messages to continue.",
      messages
    };
  }

  try {
    const context = await buildContext(messages, MAX_TOKENS);
    context.push({ role: "user", content });

    const reply = await getAIResponse(context);

    if (!reply) {
      return {
        error: "Empty assistant response",
        messages
      };
    }

    const updatedMessages = [...messages, { role: "user", content }, { role: "assistant", content: reply }];

    return {
      messages: updatedMessages,
      error: null
    };
  } catch (error) {
    console.error("Server error:", error);
    return {
      error: "Server error occurred",
      messages
    };
  }
}
