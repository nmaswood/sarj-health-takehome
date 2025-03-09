import { Schema, SchemaType } from "@google/generative-ai";

export const GeminiClinicalNoteSchema: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    error: {
      type: SchemaType.OBJECT,
      properties: {
        message: {
          type: SchemaType.STRING,
          description: "A user-facing error message if something goes wrong",
        },
      },
      description: "Error if any",
      nullable: true,
    },
    chief_complaint: {
      type: SchemaType.STRING,
      description: "The patient's primary complaint or reason for the visit",
      nullable: false,
    },
    history: {
      type: SchemaType.STRING,
      description:
        "Relevant patient history, including past conditions and symptoms",
      nullable: false,
    },
    examination: {
      type: SchemaType.STRING,
      description: "Findings from the physical examination",
      nullable: false,
    },
    diagnosis: {
      type: SchemaType.STRING,
      description:
        "The diagnosis or provisional diagnosis based on the assessment",
      nullable: false,
    },
    treatment_plan: {
      type: SchemaType.STRING,
      description:
        "The recommended treatment, including medications, procedures, and follow-up",
      nullable: false,
    },
  },
  required: [
    "chief_complaint",
    "history",
    "examination",
    "diagnosis",
    "treatment_plan",
  ],
};
