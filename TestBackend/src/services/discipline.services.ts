// DB Instance
import { prisma } from "../config/db.server";

// TYPES
import { Discipline } from "../utils/types/discipline.types";

// READ Disciplines
export const readDisciplines = async () => {
  return await prisma.discipline.findMany({
    orderBy: [
      {
        name: "asc",
      },
    ],
  });
};

// CREATE Disciplines
export const createDisciplines = async (disciplines: Discipline[]) => {
  return await prisma.discipline.createMany({
    data: disciplines,
  });
};

// UPDATE Disciplines
export const updateDisciplines = async (disciplines: Discipline[]) => {
  for (const discipline of disciplines) {
    const { name, coeff, coefficientMen, coefficientWomen } = discipline;
    const existingEntry = await prisma.discipline.findUnique({
      where: {
        name,
      },
    });
    if (existingEntry) {
      return await prisma.discipline.update({
        where: {
          id: existingEntry.id,
        },
        data: {
          coeff: coeff,
          coefficientMen: coefficientMen,
          coefficientWomen: coefficientWomen,
        },
      });
    }
  }
};

// DELETE Discipline by name
export const deleteOneDiscipline = async (name: string) => {
  return await prisma.discipline.delete({
    where: {
      name,
    },
  });
};
