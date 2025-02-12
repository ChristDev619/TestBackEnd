import { Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export type ReadRankingFunction = (
  year?: number,
  continentCode?: string,
  limit?: number
) => Promise<
  {
    year?: number;
    rank: number;
    countryCode?: string;
    points: Decimal;
    change: number | null;
    country: {
      name: string;
      iso_2: string;
    };
  }[]
>;

export type ReadRankingFunctionSport = (
  year?: number,
  sportName?: string
) => Promise<
  {
    year?: number | null;
    rank: number | null;
    countryCode?: string | null;
    points: Decimal | null;
    change: number | null;
    sportName?: string | null;
  }[]
>;

export type ImportRankingFunction = (
  rankingJSON: any
) => Promise<Prisma.BatchPayload>;

export type UpdateRankingFunction = (rankingJSON: any) => Promise<
  | {
      id: number;
      year: number;
      rank: number;
      countryCode: string;
      points: Decimal;
      change: number | null;
    }
  | undefined
>;

export type UpdateRankingFunctionSport = (rankingJSON: any) => Promise<
  | {
      id: number;
      year: number | null;
      rank: number | null;
      countryCode: string | null;
      points: Decimal | null;
      change: number | null;
    }
  | undefined
>;

export type DeleteRankingFunction = (
  countryCode: string,
  year: number
) => Promise<
  | {
      id: number;
      year: number;
      rank: number;
      countryCode: string;
      points: Decimal;
      change: number | null;
    }
  | undefined
>;

// WRCES Sport ONLY
export type DeleteRankingFunctionSport = (
  countryCode: string,
  year: number,
  sportName: string
) => Promise<
  | {
      id: number;
      year: number | null;
      rank: number | null;
      countryCode: string | null;
      points: Decimal | null;
      change: number | null;
    }
  | undefined
>;

export type ReadCountryStatsFunction = (countryCode: string) => Promise<
  {
    year: number;
    rank: number;
    change: number | null;
    country: {
      name: string;
      iso_2: string;
    };
  }[]
>;
