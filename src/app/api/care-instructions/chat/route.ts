import { genAI, safetySettings } from "@/lib/gemini";
import { ChatPayloadSchema } from "@/types/ChatPayload";
import { NextResponse } from "next/server";

const instruction = (careInstructions: string) => `
Provide answers to question only based on the following context care instructions:

Avoid:
- Answering anything outside the scope of the care instructions
${careInstructions}
`;
export async function POST(request: Request) {
  const data = await request.json();

  const { careInstruction, messages, newMessage } =
    ChatPayloadSchema.parse(data);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      responseMimeType: "text/plain",
      // ~ 120 words
      maxOutputTokens: 160,
      temperature: 0.7,
    },
    safetySettings,
    systemInstruction: instruction(careInstruction),
  });

  const chatSession = model.startChat({
    history: messages.slice(0, messages.length - 1).map((message) => ({
      parts: [
        {
          text: message.message,
        },
      ],
      role: message.role,
    })),
  });

  const { stream: upstreamResponse } =
    await chatSession.sendMessageStream(newMessage);

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of upstreamResponse) {
          // Convert the chunk to text and enqueue it to the ReadableStream
          const chunkText = chunk.text();
          controller.enqueue(new TextEncoder().encode(chunkText));
        }
      } catch (error) {
        console.error("Error streaming data:", error);
        controller.error(error);
      } finally {
        controller.close();
      }
    },
  });

  return new NextResponse(stream, {
    headers: { "Content-Type": "text/event-stream" },
  });
}
