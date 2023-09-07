import { PrismaClient } from "./client";

export * from "@prisma/client";

// const globalForPrisma = globalThis as { prisma?: PrismaClient };
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

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
