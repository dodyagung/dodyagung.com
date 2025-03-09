import { opendirSync } from "fs";
import { MDXContent } from "mdx/types";

const directoryPath = "./src/projects/content";
const exludedFiles = [".DS_Store"];

export interface Metadata {
  title: string;
  publishedAt: string;
  summary: string;
  repository: string;
  website: string;
}

export interface Project {
  slug: string;
  metadata: Metadata;
  content?: MDXContent;
}

async function allFiles() {
  const result: string[] = [];
  const dir = opendirSync(directoryPath);
  for await (const entry of dir) {
    if (!exludedFiles.includes(entry.name)) {
      result.push(entry.name);
    }
  }

  return result;
}

export async function allSlugs() {
  const files = await allFiles();
  return files.map((file) => file.toLowerCase().replace(".mdx", ""));
}

export async function getProjects() {
  const slugs = await allSlugs();
  const result: Project[] = [];

  for await (const slug of slugs) {
    const project = await getProject(slug);
    result.push(project);
  }

  return result;
}

export async function getProject(slug: string): Promise<Project> {
  const { default: Project, frontmatter } = await import(
    `@/projects/content/${slug}.mdx`
  );

  return {
    slug,
    metadata: frontmatter,
    content: Project,
  };
}
