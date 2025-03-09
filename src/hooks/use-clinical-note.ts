import { IClinicalNote } from "@/components/note/clinical-note";
import { useState } from "react";

export const useClinicalNote = ({
  note,
  setNote,
  cancelReport,
}: IClinicalNote) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempNote, setTempNote] = useState(note);

  const saveNote = () => {
    setNote(tempNote);
    setIsEditing(false);
  };

  return {
    isEditing,
    setIsEditing,
    cancelReport,
    tempNote,
    setTempNote,
    saveNote,
  };
};
