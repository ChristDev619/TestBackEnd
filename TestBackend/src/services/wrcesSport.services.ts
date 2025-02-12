// DB Instance
import { prisma } from "../config/db.server";

// TYPES
import { WRCESSport } from "../utils/types/rankings/rankings.types";

export const readWRCESSport = async (year?: number, sportName?: string) => {
  return await prisma.wRCESSport.findMany({
    orderBy: [
      {
        year: "desc",
      },

      {
        sportName: "asc",
      },
      {
        rank: "asc",
      },
    ],
    select: {
      sportName: true,
      rank: true,
      year: true,
      countryCode: true,
      points: true,
      change: true,
    },
    where: {
      year,
      sportName,
    },
  });
};

// IMPORT WRCES Sport Ranking
export const importWRCESSport = async (wrcesSport: WRCESSport[]) => {
  return await prisma.wRCESSport.createMany({
    data: wrcesSport,
  });
};

// UPDATE WRCES Sport Ranking
export const updateWRCESSport = async (wrcesSportList: WRCESSport[]) => {
  for (const wrcesSport of wrcesSportList) {
    const { year, rank, countryCode, points, sportName, change } = wrcesSport;
    const existingEntry = await prisma.wRCESSport.findFirst({
      where: {
        year,
        countryCode,
      },
    });
    if (!existingEntry) return;
    return await prisma.wRCESSport.update({
      where: {
        id: existingEntry.id,
      },
      data: {
        rank: rank,
        points: points,
        sportName: sportName,
        change: change,
      },
    });
  }
};

// DELETE WRCES Sport Ranking
export const deleteWRCESSport = async (
  countryCode: string,
  year: number,
  sportName: string
) => {
  return await prisma.wRCESSport.delete({
    where: {
      year_countryCode_sportName: {
        year,
        countryCode,
        sportName,
      },
    },
  });
};
