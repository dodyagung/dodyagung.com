import { Navigation } from "@/app/components/nav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet",
};

export default function Example() {
  return (
    <div className=" bg-linear-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation />
      <iframe
        loading="lazy"
        className="w-screen h-screen mt-14"
        src="https://cal.com/dodyagung"
      ></iframe>
    </div>
  );
}
