// DB Instance
import { prisma } from "../config/db.server";

// TYPES
import { WRCESMerit } from "../utils/types/rankings/rankings.types";

// READ WRCES Merit Ranking
export const readWRCESMerit = async (year?: number, continentCode?: string) => {
  return await prisma.wRCESMerit.findMany({
    orderBy: [
      {
        year: "desc",
      },
      {
        rank: "asc",
      },
    ],
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
  });
};

// IMPORT WRCES Merit Ranking
export const importWRCESMerit = async (wrcesMerit: WRCESMerit[]) => {
  return await prisma.wRCESMerit.createMany({
    data: wrcesMerit,
  });
};

// UPDATE WRCES Merit Ranking
export const updateWRCESMerit = async (wrcesMeritList: WRCESMerit[]) => {
  for (const wrcesMerit of wrcesMeritList) {
    const {
      year,
      rank,
      countryCode,
      gdpRank,
      wrcesRank,
      difference,
      points,
      finalPoints,
      change,
    } = wrcesMerit;
    const existingEntry = await prisma.wRCESMerit.findFirst({
      where: {
        year,
        countryCode,
      },
    });
    if (existingEntry) {
      return await prisma.wRCESMerit.update({
        where: {
          id: existingEntry.id,
        },
        data: {
          rank: rank,
          gdpRank: gdpRank,
          wrcesRank: wrcesRank,
          difference: difference,
          points: points,
          finalPoints: finalPoints,
          change: change,
        },
      });
    }
  }
};

// DELETE WRCES Merit Ranking
export const deleteWRCESMerit = async (countryCode: string, year: number) => {
  return await prisma.wRCESMerit.delete({
    where: {
      year_countryCode: {
        year,
        countryCode,
      },
    },
  });
};
