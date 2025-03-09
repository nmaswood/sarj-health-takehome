"use client";

import { useTranscribeNote } from "@/hooks/use-transcribe-note";
import { AudioRecorderWithVisualizer } from "./audio-visualizer";
import DictationPreview from "./dictation-preview";
import ClinicalNoteCard from "./clinical-note";
import { ClinicalNotePdfDocument } from "../pdf/ClinicalNotePDF";
export default function TranscribeNote() {
  const {
    browserSupport,
    resetTranscript,
    transcript,
    startTranscribing,
    stopTranscribing,
    note,
    setNote,
    generateClinicalNote,
    isReportLoading,
    showReport,
    cancelReport,
  } = useTranscribeNote();

  if (!browserSupport) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="z-10 mt-10 flex h-1/2 w-full flex-col items-center justify-center md:mb-20">
      {!showReport && (
        <div className="mb-10 flex flex-row items-center gap-4 transition md:flex-row">
          <h3 className="max-w-lg text-center font-semibold tracking-tight md:text-xl">
            Speak naturally, and our AI will transcribe your words into
            structured clinical notes. This system captures key details like
            symptoms, medical history, diagnosis, and treatment plans, helping
            you document patient encounters quickly and accurately.
          </h3>
        </div>
      )}
      {!showReport ? (
        <>
          <div className="relative my-10 flex h-16 w-full max-w-5xl items-center justify-center gap-2 rounded-md md:mt-0">
            <AudioRecorderWithVisualizer
              startTranscribing={startTranscribing}
              stopTranscribing={stopTranscribing}
              resetTranscript={resetTranscript}
            />
          </div>
          <DictationPreview
            generateClinicalNote={generateClinicalNote}
            isReportLoading={isReportLoading}
            transcript={transcript}
          />
        </>
      ) : (
        <div className="flex max-h-fit w-full flex-col justify-between gap-10 md:flex-row">
          <ClinicalNoteCard
            note={note}
            setNote={setNote}
            cancelReport={cancelReport}
          />{" "}
          <ClinicalNotePdfDocument clinicalNote={note} />
        </div>
      )}
    </div>
  );
}
