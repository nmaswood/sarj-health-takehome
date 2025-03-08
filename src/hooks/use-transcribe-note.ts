"use client";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { ClinicalNote, ClinicalNoteSchema } from "@/types/ClinicalNote";
import { useEffect, useState } from "react";

export const useTranscribeNote = () => {
  const [note, setNote] = useState<ClinicalNote>({
    chief_complaint: "",
    diagnosis: "",
    examination: "",
    history: "",
    treatment_plan: "",
  });
  const [showReport, setShowReport] = useState<boolean>();
  const [isListening, setIsListening] = useState<boolean>(false);
  const [browserSupport, setBrowserSupport] = useState<boolean>(true);
  const [isReportLoading, setIsReportLoading] = useState<boolean>(false);
  const {
    transcript,
    resetTranscript: reset,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      setBrowserSupport(false);
    } else {
      setBrowserSupport(true);
    }
  }, [browserSupportsSpeechRecognition]);

  const startTranscribing = async () => {
    await SpeechRecognition.startListening({
      continuous: true,
    });
    setIsListening(true);
  };

  const stopTranscribing = async () => {
    await SpeechRecognition.stopListening();
    setIsListening(false);
  };

  const generateClinicalNote = async () => {
    try {
      setIsReportLoading(true);
      const response = await fetch("/api/clinical-note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate clinical note");
      }

      const data = await response.json();

      const note = ClinicalNoteSchema.parse(data);
      setNote(note);
      setShowReport(true);
      setIsReportLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const resetTranscript = () => {
    reset();
  };

  const cancelReport = () => {
    resetTranscript();
    setNote({
      chief_complaint: "",
      diagnosis: "",
      examination: "",
      history: "",
      treatment_plan: "",
    });
    setShowReport(false);
  };

  return {
    browserSupport,
    browserSupportsSpeechRecognition,
    isListening,
    transcript,
    startTranscribing,
    stopTranscribing,
    resetTranscript,
    note,
    setNote,
    generateClinicalNote,
    showReport,
    cancelReport,
    isReportLoading,
  };
};
