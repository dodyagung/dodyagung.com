import { Header } from "@/app/components/header";
import { allSlugs, getProject } from "@/app/libs/mdx";
import type { Metadata } from "next";

let title: string;

export async function generateMetadata(): Promise<Metadata> {
  return { title };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const Project = await getProject(slug);
  title = Project.metadata.title;

  return (
    <div className=" bg-zinc-50 min-h-screen">
      <Header metadata={Project.metadata} />

      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
        {Project.content && <Project.content />}
      </article>
    </div>
  );
}

// generateStaticParams can be used to prerender the provided routes.
export async function generateStaticParams() {
  const slugs = await allSlugs();

  return slugs.map((slug) => ({ slug }));
}

// By marking dynamicParams as false, accessing a route not defined in generateStaticParams will 404.
export const dynamicParams = false;
