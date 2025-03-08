import { z } from "zod";

export const ClinicalNoteSchema = z.object({
  chief_complaint: z.string(),
  history: z.string(),
  examination: z.string(),
  diagnosis: z.string(),
  treatment_plan: z.string(),
});

export type ClinicalNote = z.infer<typeof ClinicalNoteSchema>;
