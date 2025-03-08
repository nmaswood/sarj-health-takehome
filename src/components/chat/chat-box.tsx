import { useChatBox } from "@/hooks/use-chat-box";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

export interface IChatBox {
  careInstructions: string;
}
export default function ChatBox({ careInstructions }: IChatBox) {
  const {
    chatHistory,
    currentResponse,
    handleMessageContentUpdate,
    handleSendMessage,
    messageContent,
    messagesEndRef,
    streamingResponse,
  } = useChatBox({ careInstructions });

  return (
    <div className="sm:max-w-1/2 mt-4 flex w-full flex-col justify-center overflow-auto sm:p-4 md:max-h-fit">
      <div className="flex flex-col justify-center space-y-4 overflow-y-auto">
        {chatHistory.length === 0 ? (
          <div className="flex items-center justify-center font-bold">
            <span>Ask a follow up question</span>
          </div>
        ) : (
          [
            ...chatHistory.map((chatMessage, i) => (
              <div key={i}>
                {chatMessage.role === "model" ? (
                  <ModelMessage message={chatMessage.message} />
                ) : (
                  <UserMessage message={chatMessage.message} />
                )}
              </div>
            )),
            streamingResponse ? (
              <div key={chatHistory.length}>
                <ModelMessage message={currentResponse} />
              </div>
            ) : (
              <div key={chatHistory.length} />
            ),
          ]
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Textbox and send button */}
      <div className="mb-2 justify-self-end overflow-auto border-t-2 border-gray-200 px-4 pb-5 pt-4 sm:mb-0">
        <form
          className="relative flex"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <Input
            autoFocus={true}
            value={messageContent}
            onChange={(e) => handleMessageContentUpdate(e.target.value)}
            type="text"
            placeholder="Write your question!"
            className="focus:none w-full rounded-md py-3 pl-4 focus:outline-none"
          />
          <div className="absolute inset-y-0 right-0 hidden items-center sm:flex">
            <Button
              type="submit"
              className="inline-flex items-center justify-center px-4 py-3 transition duration-500 ease-in-out hover:bg-blue-400 focus:outline-none"
            >
              <Send className="text-white" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

const UserMessage = ({ message }: { message: string }) => (
  <div className="flex items-end justify-end">
    <div className="order-1 mx-2 flex max-w-xs flex-col items-end space-y-2 text-base">
      <div>
        <span className="inline-block rounded-lg rounded-br-none bg-slate-300 px-4 py-2">
          {message}
        </span>
      </div>
    </div>
  </div>
);
const ModelMessage = ({ message }: { message: string }) => (
  <div className="flex items-end">
    <div className="order-2 mx-2 flex max-w-xs flex-col items-start space-y-2 text-base">
      <div>
        <span className="inline-block rounded-lg rounded-bl-none bg-gray-50 px-4 py-2 text-gray-600">
          {message}
        </span>
      </div>
    </div>
  </div>
);
