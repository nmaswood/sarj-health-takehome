"use client";
import React from "react";

import { ImagePlus, Loader2, View } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { useImageUploader } from "@/hooks/use-image-uploader";
import { WoundAssessment } from "@/types/WoundAssessment";
import WoundHotSpots from "./hotspots";

export interface IImageUploader {
  processWoundAssessment: (assessment: WoundAssessment) => Promise<void>;
}

export default function ImageUploader({
  processWoundAssessment,
}: IImageUploader) {
  const {
    form,
    onSubmit,
    fileRejections,
    preview,
    getRootProps,
    getInputProps,
    isDragActive,
    showAssessButton,
  } = useImageUploader({ processWoundAssessment });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem className="mx-auto">
              {showAssessButton && (
                <FormLabel
                  className={`transition-all ${
                    fileRejections.length !== 0 && "text-destructive"
                  }`}
                >
                  <h3 className="text-center text-xl font-semibold tracking-tight">
                    {!preview &&
                      `Upload an image of your wound, and our AI will analyze it to
                    provide an initial assessment. The system evaluates wound
                    size, tissue health, and infection risk to offer
                    personalized care recommendations`}
                    <span
                      className={
                        form.formState.errors.image ||
                        fileRejections.length !== 0
                          ? "text-destructive"
                          : "text-muted-foreground"
                      }
                    ></span>
                  </h3>
                </FormLabel>
              )}
              <FormControl>
                <div
                  {...getRootProps()}
                  className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg px-8"
                >
                  {preview && (
                    <div className="relative">
                      <img
                        src={preview as string}
                        alt="Uploaded image"
                        className={`h-full max-h-[400px] rounded-lg object-cover transition-opacity duration-500 ${
                          form.formState.isSubmitting
                            ? "opacity-50"
                            : "opacity-100"
                        }`}
                      />
                      <WoundHotSpots
                        imageUrl={
                          form.formState.isSubmitting
                            ? undefined
                            : (preview as string)
                        }
                      />
                      {/* Loading Animation Overlay */}
                      {form.formState.isSubmitting && (
                        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-20">
                          <div className="animate-scan-line absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent via-green-400 to-transparent opacity-50"></div>
                        </div>
                      )}
                    </div>
                  )}

                  {!preview && (
                    <img
                      src={
                        process.env.NEXT_PUBLIC_URL + "/assess-wound-image.gif"
                      }
                      alt="Uploaded image"
                      className={`-my-10 rounded-lg transition-opacity duration-500 ${
                        form.formState.isSubmitting
                          ? "opacity-50"
                          : "opacity-100"
                      }`}
                      width={350}
                    />
                  )}

                  <Input {...getInputProps()} type="file" />

                  {isDragActive ? (
                    <p>Drop the image!</p>
                  ) : (
                    !preview &&
                    showAssessButton && (
                      <p>Click here or drag an image to upload it</p>
                    )
                  )}
                </div>
              </FormControl>
              <FormMessage>
                {fileRejections.length !== 0 && (
                  <p>
                    Image must be less than 1MB and of type png, jpg, or jpeg
                  </p>
                )}
              </FormMessage>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
