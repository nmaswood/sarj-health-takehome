import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { generateRandomWound } from "@/types/WoundAssessment";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const file = formData.get("image") as File;
  if (!file) {
    return NextResponse.json(
      { error: "File blob is required." },
      { status: 400 },
    );
  }

  try {
    const woundAssessment = generateRandomWound();

    return NextResponse.json(woundAssessment);
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
