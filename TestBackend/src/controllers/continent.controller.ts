import { Request, Response } from "express";

// DB SERVICE FUNCTIONS
import {
  readContinents,
  createContinent,
  updateContinents,
  deleteOneContinent,
} from "../services/continent.services";

// TYPES
import { Continent } from "../utils/types/continent.types";

// UTILS
import { CSVToJSON } from "../utils/CSVToJSON";

// GET Continents
export const getContinents = async (req: Request, res: Response) => {
  try {
    const continents = await readContinents();

    if (!continents) {
      return res.status(404).json("Could not find the continents.");
    }

    return res.status(200).json(continents);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json(error.message);
    }
  }
};

// POST Continents read from CSV file
export const addContinents = async (req: Request, res: Response) => {
  if (!req.file || !req.file.buffer)
    return res.status(400).json("No file was provided.");

  const continentsUploadCSVFileBuffer = req.file.buffer;

  try {
    const continentJSON = (await CSVToJSON(
      continentsUploadCSVFileBuffer,
      "continent"
    )) as Continent[];
    if (!continentJSON) {
      return res
        .status(400)
        .json(
          "Could not read the data provided. Make sure you are using a CSV file."
        );
    }
    const continents = await createContinent(continentJSON);
    return res.status(201).json(continents);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json(error.message);
    }
  }
};

// PATCH Continents read from CSV file
export const modifyContinents = async (req: Request, res: Response) => {
  if (!req.file || !req.file.buffer)
    return res.status(400).json("No file was provided.");

  const continentsUpdateCSVFileBuffer = req.file.buffer;

  try {
    const continentJSON = (await CSVToJSON(
      continentsUpdateCSVFileBuffer,
      "continent"
    )) as Continent[];
    if (!continentJSON) {
      return res
        .status(400)
        .json(
          "Could not read the data provided. Make sure you are using a CSV file."
        );
    }
    const continents = await updateContinents(continentJSON);
    return res.status(201).json(continents);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json(error.message);
    }
  }
};

// DELETE Continent by code
export const removeOneContinent = async (req: Request, res: Response) => {
  const continentCode = req.query.continent;

  if (!continentCode || typeof continentCode !== "string")
    return res.status(400).json("Invalid or missing continent.");

  try {
    const continent = await deleteOneContinent(continentCode);

    return res.status(202).json(continent);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json(error.message);
    }
  }
};
