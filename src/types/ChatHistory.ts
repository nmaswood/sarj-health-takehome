import { z } from "zod";

export const ChatHistoryMessageSchema = z.object({
  role: z.union([z.literal("user"), z.literal("model")]),
  message: z.string(),
});

export const ChatHistorySchema = z.array(ChatHistoryMessageSchema);

export type ChatHistoryMessage = z.infer<typeof ChatHistoryMessageSchema>;
export type ChatHistory = z.infer<typeof ChatHistorySchema>;
