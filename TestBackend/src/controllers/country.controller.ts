import { Request, Response } from "express";

// DB SERVICE FUNCTIONS
import {
  readCountries,
  createCountries,
  updateCountries,
  deleteOneCountry,
} from "../services/country.services";

// Types
import { Country } from "../utils/types/country.types";

// UTILS
import { CSVToJSON } from "../utils/CSVToJSON";
import { selectReadCountryStatsFunction } from "../utils/selectRankingTable";

// GET Countries
export const getCountries = async (req: Request, res: Response) => {
  try {
    const countries = await readCountries();
      console.log(countries);
    if (!countries) {
      return res.status(404).json("Could not find the countries.");
    }
    return res.status(200).json(countries);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json(error.message);
    }
  }
};

// GET a single country's stats by its iso_2 code and the requested ranking
export const getCountryStats = async (req: Request, res: Response) => {
  const countryCode = req.params.country as string;
  const ranking = req.query.ranking as string;

  try {
    // const countryStats = await readCountryStats(countryCode, ranking);
    const readCountryStatsFunction = await selectReadCountryStatsFunction(
      ranking
    );

    const countryStats = await readCountryStatsFunction(countryCode);

    if (!countryStats) {
      return res.status(404).json("Could not find the requested country.");
    }

    return res.status(200).json(countryStats);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json(error.message);
    }
  }
};

// POST Countries read from CSV file
export const addCountries = async (req: Request, res: Response) => {
  if (!req.file || !req.file.buffer)
    return res.status(400).json("No file was provided.");

  const countriesUploadCSVFileBuffer = req.file.buffer;

  try {
    const countryJSON = (await CSVToJSON(
      countriesUploadCSVFileBuffer,
      "country"
    )) as Country[];
    if (!countryJSON) {
      return res
        .status(400)
        .json(
          "Could not read the data provided. Make sure you are using a CSV file."
        );
    }
    const countries = await createCountries(countryJSON);
    return res.status(201).json(countries);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
};

// PATCH Countries read from CSV file
export const modifyCountries = async (req: Request, res: Response) => {
  if (!req.file || !req.file.buffer)
    return res.status(400).json("No file was provided.");

  const countriesUpdateCSVFileBuffer = req.file?.buffer;

  try {
    const countryJSON = (await CSVToJSON(
      countriesUpdateCSVFileBuffer,
      "country"
    )) as Country[];
    if (!countryJSON) {
      return res
        .status(400)
        .json(
          "Could not read the data provided. Make sure you are using a CSV file."
        );
    }
    const countries = await updateCountries(countryJSON);
    return res.status(201).json(countries);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
};

// DELETE Country by code
export const removeOneCountry = async (req: Request, res: Response) => {
  const countryCode = req.query.country;

  if (!countryCode || typeof countryCode !== "string")
    return res.status(400).json("Invalid or missing continent.");

  try {
    const country = await deleteOneCountry(countryCode);

    return res.status(202).json(country);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json(error.message);
    }
  }
};
