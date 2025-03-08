"use client";
import { WoundAssessment } from "@/types/WoundAssessment";
import { useEffect, useState } from "react";

export const useAssessWound = () => {
  const [currentWoundAssessment, setCurrentWoundAssessment] = useState<
    WoundAssessment | undefined
  >();

  const [careInstructions, setCareInstructions] = useState("");

  const processWoundAssessment = async (assessment: WoundAssessment) => {
    setCurrentWoundAssessment(assessment);
    return submitWoundData(assessment);
  };

  useEffect(() => {
    setCareInstructions("");
  }, [currentWoundAssessment]);

  const submitWoundData = async (woundData: WoundAssessment) => {
    try {
      const response = await fetch("/api/care-instructions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(woundData),
      });

      if (!response.body) throw new Error("ReadableStream not supported");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let streamText = "";

      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          break;
        }

        const chunkText = decoder.decode(value, { stream: true });
        streamText += chunkText;
        setCareInstructions(streamText);
      }
    } catch (error) {
      console.error("Error fetching stream:", error);
    }
  };

  return {
    careInstructions,
    processWoundAssessment,
    currentWoundAssessment,
    submitWoundData,
  };
};
