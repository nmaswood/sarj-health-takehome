"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { IImageUploader } from "@/components/assess-wound/image-uploader";
import {
  UploadImageForm,
  UploadImageFormSchema,
} from "@/types/UploadImageForm";
import { WoundAssessmentSchema } from "@/types/WoundAssessment";

export const useImageUploader = ({
  processWoundAssessment,
}: IImageUploader) => {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>("");
  const [showAssessButton, setShowShowAssessButton] = useState(true);
  const form = useForm<UploadImageForm>({
    resolver: zodResolver(UploadImageFormSchema),
    mode: "onBlur",
    defaultValues: {
      image: new File([""], "filename"),
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setShowShowAssessButton(true);
      const reader = new FileReader();
      if (acceptedFiles[0] === undefined) throw new Error("files undefined");
      try {
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(acceptedFiles[0]);
        form.setValue("image", acceptedFiles[0]);
        form.clearErrors("image");
        form.handleSubmit(onSubmit)();
      } catch (error) {
        setPreview(null);
        form.resetField("image");
      }
    },
    [form],
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize: 1000000,
      accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
    });

  const onSubmit = async (values: UploadImageForm) => {
    const formData = new FormData();
    formData.append("image", values.image);

    try {
      const response = await fetch("/api/assess-wound", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      WoundAssessmentSchema.parse(data);
      setShowShowAssessButton(false);
      await processWoundAssessment(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return {
    getRootProps,
    fileRejections,
    showAssessButton,
    form,
    getInputProps,
    onSubmit,
    preview,
    isDragActive,
    setPreview,
  };
};
