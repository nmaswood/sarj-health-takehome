import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { motion } from "framer-motion";
import { useStreamedText } from "@/hooks/use-streamed-text";
import { Button } from "../ui/button";

export interface IDictationPreview {
  transcript: string;
  isReportLoading: boolean;
  generateClinicalNote: () => Promise<void>;
}
export default function DictationPreview({
  transcript,
  generateClinicalNote,
  isReportLoading,
}: IDictationPreview) {
  const { displayedText } = useStreamedText({ text: transcript });
  return (
    <Card className="w-full shadow-lg md:w-5/6 md:p-4">
      <CardHeader>
        <CardTitle>Live Dictation</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="border-l-4 border-blue-500 pl-2 font-mono text-sm md:text-lg"
        >
          {displayedText}
          <span className="animate-blink">|</span>{" "}
        </motion.p>
      </CardContent>
      {transcript.length > 0 && (
        <CardFooter className="flex justify-end">
          <Button onClick={generateClinicalNote} disabled={isReportLoading}>
            Generate Report
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
