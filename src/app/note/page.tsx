import TranscribeNote from "@/components/note/transcribe-note";

export default function Note() {
  return (
    <div className="relative h-full w-full bg-white">
      <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      <div className="flex min-h-screen flex-col items-center justify-between gap-6 p-6 md:p-10">
        <TranscribeNote />
      </div>
    </div>
  );
}
