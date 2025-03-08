import { useCareInstruction } from "./use-care-instructions";
import Markdown from "react-markdown";
import { useStreamedText } from "@/hooks/use-streamed-text";
import ChatBox from "../chat/chat-box";

export interface ICareInstructions {
  careInstructions: string;
}
export default function CareInstructions(props: ICareInstructions) {
  const { careInstructions } = useCareInstruction(props);
  const { displayedText, textEndRef, done } = useStreamedText({
    text: careInstructions,
    duration: 1,
  });
  return (
    <div className="h-fit w-5/6 max-w-4xl">
      <div className="font text-bpb-20 min-w-full">
        <Markdown>{displayedText}</Markdown>
        <div ref={textEndRef} />
      </div>
      {done && <ChatBox careInstructions={careInstructions} />}
    </div>
  );
}
