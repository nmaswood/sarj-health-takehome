import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useClinicalNote } from "@/hooks/use-clinical-note";
import { ClinicalNote } from "@/types/ClinicalNote";
export interface IClinicalNote {
  note: ClinicalNote;
  setNote: (note: ClinicalNote) => void;
  cancelReport: () => void;
}

export default function ClinicalNoteCard(props: IClinicalNote) {
  const {
    tempNote: note,
    isEditing,
    setIsEditing,
    setTempNote: setNote,
    cancelReport,
    saveNote,
  } = useClinicalNote(props);
  return (
    <Card className="min-w-lg w-full p-4 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Summarized Clinical Note</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Chief Complaint */}
        <div>
          <h3 className="text-sm font-semibold">Chief Complaint</h3>
          {isEditing ? (
            <Textarea
              value={note.chief_complaint}
              onChange={(e) =>
                setNote({ ...note, chief_complaint: e.target.value })
              }
            />
          ) : (
            <p className="text-gray-700">{note.chief_complaint}</p>
          )}
        </div>

        {/* History of Present Illness */}
        <div>
          <h3 className="text-sm font-semibold">History of Present Illness</h3>
          {isEditing ? (
            <Textarea
              value={note.history}
              onChange={(e) => setNote({ ...note, history: e.target.value })}
            />
          ) : (
            <p className="text-gray-700">{note.history}</p>
          )}
        </div>

        {/* Examination Findings */}
        <div>
          <h3 className="text-sm font-semibold">Examination Findings</h3>
          {isEditing ? (
            <Textarea
              value={note.examination}
              onChange={(e) =>
                setNote({ ...note, examination: e.target.value })
              }
            />
          ) : (
            <p className="text-gray-700">{note.examination}</p>
          )}
        </div>

        {/* Diagnosis */}
        <div>
          <h3 className="text-sm font-semibold">Diagnosis</h3>
          {isEditing ? (
            <Textarea
              value={note.diagnosis}
              onChange={(e) => setNote({ ...note, diagnosis: e.target.value })}
            />
          ) : (
            <p className="text-gray-700">{note.diagnosis}</p>
          )}
        </div>

        {/* Treatment Plan */}
        <div>
          <h3 className="text-sm font-semibold">Treatment Plan</h3>
          {isEditing ? (
            <Textarea
              value={note.treatment_plan}
              onChange={(e) =>
                setNote({ ...note, treatment_plan: e.target.value })
              }
            />
          ) : (
            <p className="text-gray-700">{note.treatment_plan}</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-start gap-8">
        <Button variant={"destructive"} onClick={cancelReport}>
          Cancel Report
        </Button>
        <Button onClick={() => (!isEditing ? setIsEditing(true) : saveNote())}>
          {isEditing ? "Save Note" : "Edit Note"}
        </Button>
      </CardFooter>
    </Card>
  );
}
