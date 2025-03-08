import { AudioLines } from "lucide-react";
import Link from "next/link";
export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start gap-8 bg-gradient-to-r p-8 md:p-12">
      <h1 className="mb-6 text-4xl font-semibold text-white">
        Healthcare AI Dashboard
      </h1>
      <div className="flex flex-col gap-8">
        <Link
          href={"/assess-wound"}
          className="flex transform flex-row rounded-lg px-8 py-4 text-4xl font-semibold transition duration-300 ease-in-out hover:scale-105"
        >
          <div>AI Wound Analysis</div>
          <img
            src={process.env.NEXT_PUBLIC_URL + "/assess-wound-image.gif"}
            alt="Assess wound"
            className="-my-10 w-32 rounded-lg transition-opacity duration-500"
            width={100}
          />
        </Link>
        <div className="relative flex items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <Link
          href={"/note"}
          className="flex transform flex-row items-center justify-between gap-3 rounded-lg px-8 py-4 text-4xl font-semibold transition duration-300 ease-in-out hover:scale-105"
        >
          <div>Dictate Clinical Note</div>
          <AudioLines className="text-slate-600" size={60} />
        </Link>
      </div>
    </div>
  );
}
