import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  experimental: {
    mdxRs: true,
  },
};

export default withContentlayer(nextConfig);

// https://github.com/vercel/next.js/tree/canary/examples/with-docker
module.exports = {
  output: "standalone",
};
