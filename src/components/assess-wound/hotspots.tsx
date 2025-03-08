import { cn } from "@/lib/utils";
import { useMemo } from "react";

export default function WoundHotSpots({ imageUrl }: { imageUrl?: string }) {
  const getRandomBlur = () => Math.floor(Math.random() * 20) + 12;

  const circles = useMemo(() => {
    if (!imageUrl) return [];
    const arr = [];
    for (let i = 0; i < Math.random() * 3; i++) {
      arr.push({
        id: 1,
        top: `${Math.random() * 40 + 20}%`,
        left: `${Math.random() * 40 + 20}%`,
        blur: getRandomBlur(),
      });
    }

    return arr;
  }, [imageUrl]);

  return circles.map(({ blur, top, left }, id) => (
    <div
      key={id}
      className="absolute flex h-12 w-12 items-center justify-center transition animate-in"
      style={{
        top,
        left,
      }}
    >
      <div
        className={cn(`h-12 w-12 rounded-full bg-red-500`)}
        style={{ filter: `blur(${blur}px)` }}
      />
    </div>
  ));
}
