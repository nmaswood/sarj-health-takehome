import { WoundAssessment } from "@/types/WoundAssessment";
import { useCallback, useEffect, useState } from "react";
import { ICareInstructions } from "./care-instructions";

export const useCareInstruction = ({ careInstructions }: ICareInstructions) => {
  return { careInstructions };
};
