import { genAI } from "@/lib/gemini";
import { ClinicalNoteSchema } from "@/types/ClinicalNote";
import { GeminiClinicalNoteSchema } from "@/types/GeminiClinicalNote";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { transcript } = await req.json();

    if (!transcript) {
      return NextResponse.json(
        { error: "Missing transcription text" },
        { status: 400 },
      );
    }

    const prompt = `
      You are a medical AI assistant. Convert the following raw dictation into a structured clinical note:
      ---
      ${transcript}
      ---
      Format it strictly in JSON:
      {
        "chief_complaint": "...",
        "history": "...",
        "examination": "...",
        "diagnosis": "...",
        "treatment_plan": "..."
      }

      If there is no relevant data simply state in the field that there is no relevant data available, do not return null
    `;
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const response = await model.generateContent(prompt);
    const textResponse = response.response.text();

    const jsonMatch = textResponse.match(/```json([\s\S]*?)```/);

    if (jsonMatch && jsonMatch[1]) {
      try {
        const extractedJson = JSON.parse(jsonMatch[1].trim());
        const clinicalNote = ClinicalNoteSchema.parse(extractedJson);
        return NextResponse.json(clinicalNote, { status: 200 });
      } catch (error) {
        console.error("Invalid JSON:", error);

        return NextResponse.json("Gemini Said NO", { status: 500 });
      }
    }
  } catch (error) {
    console.error("Error generating clinical note:", error);
    return NextResponse.json(
      { error: "Failed to generate clinical note" },
      { status: 500 },
    );
  }
}
