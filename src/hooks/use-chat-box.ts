import { IChatBox } from "@/components/chat/chat-box";
import { ChatHistory, ChatHistoryMessage } from "@/types/ChatHistory";
import { useEffect, useRef, useState } from "react";

export const useChatBox = ({ careInstructions }: IChatBox) => {
  const [messageContent, setMessageContent] = useState("");
  const [currentResponse, setCurrentResponse] = useState("");
  const [streamingResponse, setStreamingResponse] = useState(false);

  const [chatHistory, setChatHistory] = useState<ChatHistory>([]);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [streamingResponse]);

  const handleMessageContentUpdate = (messageContent: string) => {
    setMessageContent(messageContent);
  };

  const updateChatHistory = (newHistory: ChatHistoryMessage) => {
    setChatHistory((prev) => [...prev, newHistory]);
  };

  const handleSendMessage = async () => {
    if (messageContent.trim() === "") return;

    const newMessage = messageContent;

    if (!chatHistory) {
      setChatHistory([
        {
          role: "user",
          message: newMessage,
        },
      ]);
    } else
      updateChatHistory({
        message: newMessage,
        role: "user",
      });

    handleMessageContentUpdate("");

    try {
      setStreamingResponse(true);

      const response = await fetch("/api/care-instructions/chat", {
        method: "POST",
        body: JSON.stringify({
          messages: chatHistory,
          careInstruction: careInstructions,
          newMessage,
        }),
      });

      if (!response.body) throw new Error("ReadableStream not supported");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let streamText = "";

      // Read the stream chunk by chunk
      while (true) {
        const { value, done } = await reader.read();

        if (done) break;

        // Decode the chunk and process it
        const chunkText = decoder.decode(value, { stream: true });
        streamText += chunkText;
        setCurrentResponse(streamText);
      }

      updateChatHistory({
        role: "model",
        message: streamText,
      });

      setCurrentResponse("");
    } catch (error) {
      console.error("Error fetching stream:", error);
    } finally {
      setStreamingResponse(false);
    }
  };

  return {
    chatHistory,
    currentResponse,
    handleMessageContentUpdate,
    handleSendMessage,
    messageContent,
    messagesEndRef,
    streamingResponse,
  };
};
