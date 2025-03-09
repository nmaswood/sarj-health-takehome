import { useEffect, useRef, useState } from "react";

export const useStreamedText = ({
  text,
  duration,
}: {
  text: string;
  duration?: number;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const textEndRef = useRef<null | HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const scrollToBottom = () => {
    textEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    if (text.length === 0) {
      setDisplayedText("");
      setIndex(0);
      return;
    }

    if (index < text.length) {
      setDone(false);
      const timeout = setTimeout(
        () => {
          setDisplayedText((prev) => prev + text[index]);
          setIndex(index + 1);
        },
        duration || text[index] === " " ? 8 : 5,
      );

      return () => clearTimeout(timeout);
    } else setDone(true);
  }, [index, text]);

  useEffect(() => {
    text.length > 0 && scrollToBottom();
  }, [text]);

  return { displayedText, textEndRef, done };
};
