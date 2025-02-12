// DB Instance
import { prisma } from "../config/db.server";

// TYPES
import { WSPI } from "../utils/types/rankings/rankings.types";

// READ WSPI Ranking
export const readWSPI = async (year?: number, continentCode?: string) => {
  return await prisma.wSPI.findMany({
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

// IMPORT WSPI Ranking
export const importWSPI = async (wspi: WSPI[]) => {
  return await prisma.wSPI.createMany({
    data: wspi,
  });
};

// UPDATE WSPI Ranking
export const updateWSPI = async (wspiList: WSPI[]) => {
  for (const wspi of wspiList) {
    const {
      year,
      rank,
      countryCode,
      wrcesPoints,
      cityPoints,
      proleaguePoints,
      points,
      change,
    } = wspi;
    const existingEntry = await prisma.wSPI.findFirst({
      where: {
        year,
        countryCode,
      },
    });
    if (existingEntry) {
      return await prisma.wSPI.update({
        where: {
          id: existingEntry.id,
        },
        data: {
          rank: rank,
          wrcesPoints: wrcesPoints,
          cityPoints: cityPoints,
          proleaguePoints: proleaguePoints,
          points: points,
          change: change,
        },
      });
    }
  }
};

// DELETE WSPI Ranking
export const deleteWSPI = async (countryCode: string, year: number) => {
  return await prisma.wSPI.delete({
    where: {
      year_countryCode: {
        year,
        countryCode,
      },
    },
  });
};
