import { Navigation } from "@/app/components/nav";
import type { Metadata } from "next";

import Calcom from "../components/calcom";

export const metadata: Metadata = {
  title: "Meet",
};

export default function Example() {
  return (
    <div className="bg-linear-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation />
      <div className="pt-20 pb-5">
        <Calcom />
      </div>
    </div>
  );
}
