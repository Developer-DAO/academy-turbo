import withPlugins from "next-compose-plugins";
import withBundleAnalyzer from "@next/bundle-analyzer";
import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";

import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const config = {
  // basePath,
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  reactStrictMode: true,
  transpilePackages: ["ui", "utils", "database"],
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }
    return config;
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

export default withPlugins(
  [
    [withBundleAnalyzer({ enabled: !!process.env.ANALYZE })],
    withPWA({
      dest: "public",
      disable: process.env.NODE_ENV === "development",
    }),
  ],
  config,
);
