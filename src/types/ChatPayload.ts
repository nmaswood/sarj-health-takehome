import { z } from "zod";
import { ChatHistorySchema } from "./ChatHistory";

export const ChatPayloadSchema = z.object({
  messages: ChatHistorySchema,
  careInstruction: z.string(),
  newMessage: z.string(),
});
