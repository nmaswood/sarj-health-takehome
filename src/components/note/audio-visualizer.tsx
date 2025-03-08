"use client";
import { memo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { CircleX, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAudioVisualizer } from "@/hooks/use-audio-visualizer";

export interface IAudioRecorderWithVisualizer {
  resetTranscript: () => void;
  startTranscribing: () => Promise<void>;
  stopTranscribing: () => Promise<void>;
}
export const AudioRecorderWithVisualizer = (
  props: IAudioRecorderWithVisualizer,
) => {
  const {
    isRecording,
    hourLeft,
    hourRight,
    minuteLeft,
    minuteRight,
    secondLeft,
    secondRight,
    canvasRef,
    resetRecording,
    startRecording,
    stopRecording,
  } = useAudioVisualizer(props);

  return (
    <div
      className={cn(
        "relative flex h-16 w-full max-w-5xl items-center justify-center gap-2 rounded-md",
        {
          "border p-1": isRecording,
          "border-none p-0": !isRecording,
        },
      )}
    >
      {isRecording ? (
        <Timer
          hourLeft={hourLeft as string}
          hourRight={hourRight as string}
          minuteLeft={minuteLeft as string}
          minuteRight={minuteRight as string}
          secondLeft={secondLeft as string}
          secondRight={secondRight as string}
        />
      ) : null}
      <canvas
        ref={canvasRef}
        className={`h-full w-full bg-background ${
          !isRecording ? "hidden" : "flex"
        }`}
      />
      <div className="flex gap-2">
        {/* ========== Reset recording button ========== */}
        {isRecording ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={resetRecording}
                size={"icon"}
                variant={"secondary"}
              >
                <RotateCcw size={15} />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="m-2">
              <span> Reset recording</span>
            </TooltipContent>
          </Tooltip>
        ) : null}

        {/* ========== Start and send recording button ========== */}
        <Tooltip>
          <TooltipTrigger asChild>
            {!isRecording ? (
              <Button
                onClick={() => startRecording()}
                size={"lg"}
                className="mt-10"
              >
                Start Recording
              </Button>
            ) : (
              <Button
                onClick={stopRecording}
                size={"icon"}
                variant={"secondary"}
              >
                <CircleX size={15} />
              </Button>
            )}
          </TooltipTrigger>
          <TooltipContent className="m-2">
            <span>
              {" "}
              {!isRecording ? "Start recording" : "Cancel recording"}{" "}
            </span>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

const Timer = memo(
  ({
    hourLeft,
    hourRight,
    minuteLeft,
    minuteRight,
    secondLeft,
    secondRight,
    timerClassName,
  }: {
    hourLeft: string;
    hourRight: string;
    minuteLeft: string;
    minuteRight: string;
    secondLeft: string;
    secondRight: string;
    timerClassName?: string;
  }) => {
    return (
      <div
        className={cn(
          "absolute -top-12 left-0 flex items-center justify-center gap-0.5 rounded-md border p-1.5 font-mono font-medium text-foreground",
          timerClassName,
        )}
      >
        <span className="rounded-md bg-background p-0.5 text-foreground">
          {hourLeft}
        </span>
        <span className="rounded-md bg-background p-0.5 text-foreground">
          {hourRight}
        </span>
        <span>:</span>
        <span className="rounded-md bg-background p-0.5 text-foreground">
          {minuteLeft}
        </span>
        <span className="rounded-md bg-background p-0.5 text-foreground">
          {minuteRight}
        </span>
        <span>:</span>
        <span className="rounded-md bg-background p-0.5 text-foreground">
          {secondLeft}
        </span>
        <span className="rounded-md bg-background p-0.5 text-foreground">
          {secondRight}
        </span>
      </div>
    );
  },
);
Timer.displayName = "Timer";
