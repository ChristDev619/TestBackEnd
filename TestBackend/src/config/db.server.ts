import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client Instance
// If the instance already exists, return the existing instance
// Else create a new one and return it
let prisma: PrismaClient;

declare global {
  var __prisma: PrismaClient | undefined;
}

if (!global.__prisma) {
  global.__prisma = new PrismaClient();
}

prisma = global.__prisma;

export { prisma };
