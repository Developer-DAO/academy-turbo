const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer");
// ({
//   enabled: !!process.env.ANALYZE,
// });

const withPWA = require("next-pwa");
// ({
//   dest: "public",
//   disable: process.env.NODE_ENV === "development",
// });

module.exports = ({ basePath }) => {
  /** @type {import('next').NextConfig} */
  const config = {
    basePath,
    pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
    reactStrictMode: true,
    transpilePackages: ["ui", "utils"],
  };

  return withPlugins(
    [
      [withBundleAnalyzer({ enabled: process.env.ANALYZE })],
      withPWA({
        dest: "public",
        disable: process.env.NODE_ENV === "development",
      }),
    ],
    config,
  );
  // return withPWA(config);
};
