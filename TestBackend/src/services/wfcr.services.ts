// DB Instance
import { prisma } from "../config/db.server";

// TYPES
import { WFCR } from "../utils/types/rankings/rankings.types";

// READ WFCR Ranking
export const readWFCR = async (year?: number, continentCode?: string) => {
  return await prisma.wFCR.findMany({
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

// IMPORT WFCR Ranking
export const importWFCR = async (wfcr: WFCR[]) => {
  return await prisma.wFCR.createMany({
    data: wfcr,
  });
};

// UPDATE WFCR Ranking
export const updateWFCR = async (wfcrList: WFCR[]) => {
  for (const wfcr of wfcrList) {
    const {
      year,
      rank,
      countryCode,
      wrces,
      merit,
      wrcesPoints,
      obesity,
      pou,
      avgPouObesity,
      points,
      change,
    } = wfcr;
    const existingEntry = await prisma.wFCR.findFirst({
      where: {
        year,
        countryCode,
      },
    });
    if (existingEntry) {
      return await prisma.wFCR.update({
        where: {
          id: existingEntry.id,
        },
        data: {
          rank: rank,
          wrces: wrces,
          merit: merit,
          wrcesPoints: wrcesPoints,
          obesity: obesity,
          pou: pou,
          avgPouObesity: avgPouObesity,
          points: points,
          change: change,
        },
      });
    }
  }
};

// DELETE WFCR Ranking
export const deleteWFCR = async (countryCode: string, year: number) => {
  return await prisma.wFCR.delete({
    where: {
      year_countryCode: {
        countryCode,
        year,
      },
    },
  });
};
