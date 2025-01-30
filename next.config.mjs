import { withContentlayer } from "next-contentlayer2";

// https://stackoverflow.com/questions/78516645/warning-deprecationwarning-the-punycode-module-is-deprecated-please-use-a-u
// https://github.com/mathiasbynens/punycode.js/issues/137
import moduleAlias from "module-alias";
moduleAlias.addAlias("punycode", "punycode/");

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  experimental: {
    mdxRs: true,
  },
  output: "standalone",
};

export default withContentlayer(nextConfig);
