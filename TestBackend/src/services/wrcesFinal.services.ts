// DB Instance
import { prisma } from "../config/db.server";

// TYPES
import { WRCESFinal } from "../utils/types/rankings/rankings.types";

// READ WRCES Final Ranking
export const readWRCESFinal = async (
  year?: number,
  continentCode?: string,
  limit?: number
) => {
  return await prisma.wRCESFinal.findMany({
    select: {
      rank: true,
      country: {
        select: {
          name: true,
          iso_2: true,
        },
      },
      countryCode: true,
      points: true,
      year: true,
      change: true,
    },
    where: {
      year: year ? year : undefined,
      country: {
        continentCode,
      },
    },
    orderBy: [
      {
        year: "desc",
      },
      {
        rank: "asc",
      },
    ],
    take: limit ? limit : undefined,
  });
};

// IMPORT WRCES Final Ranking with Transaction
export const importWRCESFinal = async (wrcesFinal: WRCESFinal[]) => {
    return await prisma.$transaction(async (prisma) => {
        console.log('Starting transaction to import WRCES Final Rankings.');

        // Step 1: Delete all existing records from the table
        console.log('Deleting all existing records from the wRCESFinal table.');
        await prisma.wRCESFinal.deleteMany({});
        console.log('All existing records deleted.'); 

        // Step 2: Insert new records using createMany
        console.log('Inserting new records into the wRCESFinal table.');
        const result = await prisma.wRCESFinal.createMany({
            data: wrcesFinal,
        });
        console.log('New records inserted successfully.');

        console.log('Transaction completed.');
        return result;
    });
};

// UPDATE WRCES Final Ranking
export const updateWRCESFinal = async (wrcesFinalList: WRCESFinal[]) => {
  for (const wrcesFinal of wrcesFinalList) {
    const { year, rank, countryCode, points, change } = wrcesFinal;
    const existingEntry = await prisma.wRCESFinal.findFirst({
      where: {
        year,
        countryCode,
      },
    });
    if (existingEntry) {
      return await prisma.wRCESFinal.update({
        where: {
          id: existingEntry.id,
        },
        data: {
          rank: rank,
          points: points,
          change: change,
        },
      });
    }
  }
};

// DELETE WRCES Final Ranking
export const deleteWRCESFinal = async (countryCode: string, year: number) => {
  return await prisma.wRCESFinal.delete({
    where: {
      year_countryCode: {
        year,
        countryCode,
      },
    },
  });
};
