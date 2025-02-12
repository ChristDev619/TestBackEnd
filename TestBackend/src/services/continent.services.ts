// DB INSTANCE
import { prisma } from "../config/db.server";

// TYPES
import { Continent } from "../utils/types/continent.types";

// READ Continents
export const readContinents = async () => {
  return await prisma.continent.findMany({
    orderBy: [
      {
        code: "asc",
      },
    ],
  });
};

// CREATE Continent
export const createContinent = async (continents: Continent[]) => {
  return await prisma.continent.createMany({
    data: continents,
  });
};

// UPDATE Continent
export const updateContinents = async (continents: Continent[]) => {
  for (const continent of continents) {
    const { code, name } = continent;
    const existingEntry = await prisma.continent.findUnique({
      where: {
        code,
      },
    });
    if (existingEntry) {
      return await prisma.continent.update({
        where: {
          code,
        },
        data: {
          code: code,
          name: name,
        },
      });
    }
  }
};

// DELETE Continent by code
export const deleteOneContinent = async (code: string) => {
  return await prisma.continent.delete({
    where: {
      code,
    },
  });
};
