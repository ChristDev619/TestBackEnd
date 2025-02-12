import { prisma } from "../config/db.server";

// READ discovery sources
export const readDiscoverySources = async () => {
  return await prisma.discoverySource.findMany({
    orderBy: [
      {
        id: "asc",
      },
    ],
  });
};
