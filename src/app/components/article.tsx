import Link from "next/link";
import { Project } from "@/app/libs/mdx";

export function Article({ metadata, slug }: Project) {
  return (
    <Link href={`/projects/${slug}`}>
      <article className="p-4 md:p-8">
        <div className="flex justify-between gap-2 items-center">
          <span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
            <time dateTime={new Date(metadata.publishedAt).toISOString()}>
              {Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
                new Date(metadata.publishedAt),
              )}
            </time>
          </span>
        </div>
        <h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display">
          {metadata.title}
        </h2>
        <p className="z-20 mt-4 text-sm  duration-1000 text-zinc-400 group-hover:text-zinc-200">
          {metadata.summary}
        </p>
      </article>
    </Link>
  );
}
