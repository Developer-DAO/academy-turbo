// import { PrismaClient } from "./client";

import { PrismaClient } from "@prisma/client";

export * from "@prisma/client";
export type PrismaClientType = PrismaClient;
// export * from "./client"; // testing because how prisma works in a monorepo changed many things

const globalForPrisma = globalThis as { prisma?: PrismaClient };
// const globalForPrisma = globalThis as unknown as {
// prisma: PrismaClient | undefined;
// };

// export const db =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log:
//       process.env.NODE_ENV === "development"
//         ? ["query", "error", "warn"]
//         : ["error"],
//   });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env["NODE_ENV"] === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env["NODE_ENV"] !== "production") globalForPrisma.prisma = prisma;
