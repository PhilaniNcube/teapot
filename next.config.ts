import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig = {
  images:{
    remotePatterns: [
      new URL("https://ikmbrpotgniwicz3.public.blob.vercel-storage.com/***"),
    ],
  },
  turbopack: {
    resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  // Your Next.js config here
  // experimental: {
  //   reactCompiler: false,
  // },
};

// Make sure you wrap your `nextConfig`
// with the `withPayload` plugin
export default withPayload(nextConfig);
