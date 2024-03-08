import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  experimental: {
    mdxRs: true,
  },
  output: "standalone", // https://github.com/vercel/next.js/tree/canary/examples/with-docker
};

export default withContentlayer(nextConfig);
