// DB Instance
import { prisma } from "../config/db.server";

// TYPES
import { Sport } from "../utils/types/sport.types";

// READ Sports
export const readSports = async () => {
  return await prisma.sport.findMany({
    orderBy: [
      {
        name: "asc",
      },
    ],
  });
};

// CREATE Sports
export const createSports = async (sport: Sport[]) => {
  return await prisma.sport.createMany({
    data: sport,
  });
};

// UPDATE Sports
export const updateSports = async (sports: Sport[]) => {
  for (const sport of sports) {
    const { name, coefficient } = sport;
    const existingEntry = await prisma.sport.findUnique({
      where: {
        name,
      },
    });
    if (existingEntry) {
      return await prisma.sport.update({
        where: {
          id: existingEntry.id,
        },
        data: {
          coefficient: coefficient,
        },
      });
    }
  }
};

// DELETE Sport
export const deleteOneSport = async (name: string) => {
  return await prisma.sport.delete({
    where: {
      name,
    },
  });
};
