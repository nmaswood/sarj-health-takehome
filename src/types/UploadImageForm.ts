import { z } from "zod";

export const UploadImageFormSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file.size !== 0, "Please upload an image"),
});

export type UploadImageForm = z.infer<typeof UploadImageFormSchema>;
