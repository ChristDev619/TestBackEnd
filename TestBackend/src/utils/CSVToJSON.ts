import { Readable } from "stream";
import csv from "csv-parser";

// TYPES
import {
  WRCESFinal,
  WFCR,
  WSPI,
  WRCESSport,
  WRCESMerit,
} from "../utils/types/rankings/rankings.types";
import { Discipline } from "../utils/types/discipline.types";
import { Sport } from "../utils/types/sport.types";
import { Country } from "../utils/types/country.types";
import { Continent } from "../utils/types/continent.types";

// Convert the CSV file to a string
const CSVFileToString = (file: Buffer): string => {
  return file?.toString();
};

// Determine the function to call
// based on the table required
const CSVToJSONFunctionsMap: {
  [key: string]: (
    stringCSV: string
  ) => Promise<
    | WRCESFinal[]
    | WRCESSport[]
    | WRCESMerit[]
    | WFCR[]
    | WSPI[]
    | Discipline[]
    | Sport[]
    | Country[]
    | Continent[]
  >;
} = {
  "wrces_final": wrcesFinalCSVToJson,
  "wrces_sport": wrcesSportCSVToJSON,
  "wrces_merit": wrcesMeritCSVToJSON,
  "wfcr": wfcrCSVToJSON,
  "wspi": wspiCSVToJSON,
  "discipline": disciplineCSVToJSON,
  "sport": sportCSVToJSON,
  "country": countryCSVToJSON,
  "continent": continentCSVToJSON,
};

// Convert the CSV file to JSON
export const CSVToJSON = (file: Buffer, type: string) => {
  const stringCSV = CSVFileToString(file);

  if (type && CSVToJSONFunctionsMap.hasOwnProperty(type)) {
    return CSVToJSONFunctionsMap[type](stringCSV);
  } else {
    throw new Error("Could not find the requested ranking.");
  }
};

// WRCES Final CSV to JSON
async function wrcesFinalCSVToJson(stringCSV: string): Promise<WRCESFinal[]> {
  const ranks: WRCESFinal[] = [];
  await Readable.from(stringCSV)
    .pipe(csv())
    .on("data", (data: any) => {
      const newData = {
        year: parseInt(data.year, 10),
        rank: parseInt(data.rank, 10),
        countryCode: data.country_code,
        points: parseFloat(data.points),
        change: parseInt(data.change, 10),
      };
      ranks.push(newData);
    });
  return ranks;
}

// WRCES Sport CSV to JSON
async function wrcesSportCSVToJSON(stringCSV: string): Promise<WRCESSport[]> {
  const ranks: WRCESSport[] = [];

  await Readable.from(stringCSV)
    .pipe(csv())
    .on("data", (data: any) => {
      const newData = {
        year: parseInt(data.year, 10),
        sportName: data.sport_name,
        rank: parseInt(data.rank, 10),
        countryCode: data.country_code,
        points: parseFloat(data.points),
        change: parseInt(data.change, 10),
      };
      ranks.push(newData);
    });
  return ranks;
}

// WRCES Merit CSV to JSON
async function wrcesMeritCSVToJSON(stringCSV: string): Promise<WRCESMerit[]> {
  const ranks: WRCESMerit[] = [];

  await Readable.from(stringCSV)
    .pipe(csv())
    .on("data", (data: any) => {
      const newData = {
        year: parseInt(data.year, 10),
        rank: parseInt(data.rank, 10),
        countryCode: data.country_code,
        gdpRank: parseInt(data.gdp_rank, 10),
        wrcesRank: parseInt(data.wrces_rank, 10),
        difference: parseInt(data.difference, 10),
        points: parseFloat(data.points),
        finalPoints: parseFloat(data.final_points),
        change: parseInt(data.change, 10),
      };
      ranks.push(newData);
    });
  return ranks;
}

// WFCR CSV to JSON
async function wfcrCSVToJSON(stringCSV: string): Promise<WFCR[]> {
  const ranks: WFCR[] = [];

  await Readable.from(stringCSV)
    .pipe(csv())
    .on("data", (data: any) => {
      const newData = {
        year: parseInt(data.year, 10),
        rank: parseInt(data.rank, 10),
        countryCode: data.country_code,
        wrces: parseFloat(data.wrces),
        merit: parseFloat(data.merit),
        wrcesPoints: parseFloat(data.wrces_points),
        obesity: parseFloat(data.obesity),
        pou: parseFloat(data.pou),
        avgPouObesity: parseFloat(data.avg_pou_obesity),
        points: parseFloat(data.points),
        change: parseInt(data.change, 10),
      };
      ranks.push(newData);
    });
  return ranks;
}

// WSPI CSV to JSON
async function wspiCSVToJSON(stringCSV: string): Promise<WSPI[]> {
  const ranks: WSPI[] = [];

  await Readable.from(stringCSV)
    .pipe(csv())
    .on("data", (data: any) => {
      const newData = {
        year: parseInt(data.year, 10),
        rank: parseInt(data.rank, 10),
        countryCode: data.country_code,
        wrcesPoints: parseFloat(data.wrces_points),
        cityPoints: parseInt(data.city_points, 10),
        proleaguePoints: parseFloat(data.proleague_points),
        points: parseFloat(data.points),
        change: parseInt(data.change, 10),
      };
      ranks.push(newData);
    });
  return ranks;
}

// Discipline CSV to JSON
async function disciplineCSVToJSON(stringCSV: string): Promise<Discipline[]> {
  const disciplines: Discipline[] = [];

  await Readable.from(stringCSV)
    .pipe(csv())
    .on("data", (data: any) => {
      const newData = {
        sportName: data.sport_name,
        name: data.name,
        coeff: parseFloat(data.coeff),
        coefficientMen: parseFloat(data.coeff_men),
        coefficientWomen: parseFloat(data.coeff_women),
      };
      disciplines.push(newData);
    });
  return disciplines;
}

// Sport CSV to JSON
async function sportCSVToJSON(stringCSV: string): Promise<Sport[]> {
  const sports: Sport[] = [];

  await Readable.from(stringCSV)
    .pipe(csv())
    .on("data", (data: any) => {
      const newData = {
        name: data.name,
        coefficient: parseFloat(data.coeff),
      };
      sports.push(newData);
    });

  return sports;
}

// Country CSV to JSON
async function countryCSVToJSON(stringCSV: string): Promise<Country[]> {
  const countries: Country[] = [];

  await Readable.from(stringCSV)
    .pipe(csv())
    .on("data", (data: any) => {
      const newData = {
        code: data.code,
        name: data.name,
        iso_2: data.iso_2,
        iso_3: data.iso_3,
        continentCode: data.continent_code,
      };
      countries.push(newData);
    });
  return countries;
}

// Continent CSV to JSON
async function continentCSVToJSON(stringCSV: string): Promise<Continent[]> {
  const continents: Continent[] = [];

  await Readable.from(stringCSV)
    .pipe(csv())
    .on("data", (data: any) => {
      const newData = {
        code: data.code,
        name: data.name,
      };
      continents.push(newData);
    });
  return continents;
}
