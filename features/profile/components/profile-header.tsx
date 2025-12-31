import { USER } from "../data/user";
import { cn } from "@/lib/utils";
import { FlipSentences } from "@/src/registry/flip-sentences";
import Image from "next/image";

export function ProfileHeader() {
  return (
    <div className="screen-line-after screen-line-before flex">
      <div className="shrink-0 border-r border-edge">
        <div className="mx-[2px] my-[3px]">
          <Image
            className="size-32 rounded-full ring-1 ring-border ring-offset-2 ring-offset-background select-none sm:size-44 object-contain bg-white"
            alt={`${USER.displayName}'s avatar`}
            src={USER.avatar}
            width={400}
            height={400}
            sizes="(max-width: 640px) 128px, 160px"
            fetchPriority="high"
            priority
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className={cn("flex grow items-end")}></div>

        <div className="border-t border-edge">
          <h1 className="flex items-center pl-4 text-4xl md:text-5xl font-medium">
            {USER.displayName}
          </h1>

          <div className="h-14 border-t border-edge py-1 pl-4 sm:h-auto">
            <FlipSentences sentences={USER.flipSentences} />
          </div>
        </div>
      </div>
    </div>
  );
}
