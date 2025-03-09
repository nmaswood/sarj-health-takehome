"use client";

import { useAssessWound } from "@/hooks/use-assess-wound";
import AssessmentResult from "./assessment-result";
import ImageUploader from "./image-uploader";
import CareInstructions from "@/components/assess-wound/care-instructions";

export default function AssessWound() {
  const {
    processWoundAssessment,
    currentWoundAssessment,
    careInstructions,
    submitWoundData,
  } = useAssessWound();

  return (
    <div className="flex w-full flex-col items-center justify-between pb-20">
      <div className="mb-20 flex w-full flex-col items-center justify-center gap-14 transition md:flex-row">
        <div className="w-full max-w-fit">
          <ImageUploader processWoundAssessment={processWoundAssessment} />
        </div>
        {currentWoundAssessment && (
          <AssessmentResult
            woundAssessment={currentWoundAssessment}
            submitWoundData={submitWoundData}
          />
        )}
      </div>
      <CareInstructions careInstructions={careInstructions} />
    </div>
  );
}
