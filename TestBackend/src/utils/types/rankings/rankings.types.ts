export type WFCR = {
  year: number;
  rank: number;
  countryCode: string;
  wrces: number;
  merit: number;
  wrcesPoints: number;
  obesity: number;
  pou: number;
  avgPouObesity: number;
  points: number;
  change: number;
};

export type WRCESFinal = {
  year: number;
  rank: number;
  countryCode: string;
  points: number;
  change: number;
};

export type WRCESSport = {
  year: number;
  sportName: string;
  rank: number;
  countryCode: string;
  points: number;
  change: number;
};

export type WRCESMerit = {
  year: number;
  rank: number;
  countryCode: string;
  gdpRank: number;
  wrcesRank: number;
  difference: number;
  points: number;
  finalPoints: number;
  change: number;
};

export type WSPI = {
  year: number;
  rank: number;
  countryCode: string;
  wrcesPoints: number;
  cityPoints: number;
  proleaguePoints: number;
  points: number;
  change: number;
};

export type RankingNameType =
  | "wrces_final"
  | "wrces_sport"
  | "wrces_merit"
  | "wfcr"
  | "wspi";

export type Ranking = WRCESFinal | WRCESSport | WRCESMerit | WSPI;
