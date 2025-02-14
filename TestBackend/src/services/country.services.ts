// DB INSTANCE
import { prisma } from "../config/db.server";

// TYPES
import { Country } from "../utils/types/country.types";

// READ Countries
export const readCountries = async () => {
  return await prisma.country.findMany({
    orderBy: [
      {
        code: "asc",
      },
    ],
  });
};

// READ a Country's stats in WRCES Final Ranking
export const readCountryStatsWRCESFinal = async (countryCode: string) => {
  return await prisma.wRCESFinal.findMany({
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
      year: true,
      change: true,
    },
    where: {
      country: {
        iso_2: countryCode,
      },
    },
  });
};

// READ a Country's stats in WRCES Merit Ranking
export const readCountryStatsWRCESMerit = async (countryCode: string) => {
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
      year: true,
      change: true,
    },
    where: {
      country: {
        iso_2: countryCode,
      },
    },
  });
};

// READ a Country's stats in WSPI Ranking
export const readCountryStatsWSPI = async (countryCode: string) => {
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
      year: true,
      change: true,
    },
    where: {
      country: {
        iso_2: countryCode,
      },
    },
  });
};

// READ a Country's stats in WFCR Ranking
export const readCountryStatsWFCR = async (countryCode: string) => {
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
      year: true,
      change: true,
    },
    where: {
      country: {
        iso_2: countryCode,
      },
    },
  });
};

// CREATE Countries
export const createCountries = async (countries: Country[]) => {
  return await prisma.country.createMany({
    data: countries,
  });
};

// UPDATE Countries
export const updateCountries = async (countries: Country[]) => {
  for (const country of countries) {
    const { code, name, iso_2, iso_3, continentCode } = country;
    const existingEntry = await prisma.country.findUnique({
      where: {
        code,
      },
    });
    if (existingEntry) {
      return await prisma.country.update({
        where: {
          code: existingEntry.code,
        },
        data: {
          code: code,
          name: name,
          iso_2: iso_2,
          iso_3: iso_3,
          continentCode: continentCode,
        },
      });
    }
  }
};

// DELETE Country by code
export const deleteOneCountry = async (code: string) => {
  return await prisma.country.delete({
    where: {
      code,
    },
  });
};


// UPDATE a Single Country
export const updateOneCountry = async (code: string, countryData: Partial<Country>) => {
  const existingEntry = await prisma.country.findUnique({
    where: {
      code,
    },
  });

  if (!existingEntry) {
    throw new Error(`Country with code ${code} not found`);
  }

  return await prisma.country.update({
    where: {
      code,
    },
    data: {
      ...countryData,
    },
  });
};
