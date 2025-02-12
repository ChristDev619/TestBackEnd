import { Request, Response } from "express";

// DB SERVICES
import {
  readSports,
  createSports,
  updateSports,
  deleteOneSport,
} from "../services/sport.services";

// Types
import { Sport } from "../utils/types/sport.types";

// UTILS
import { CSVToJSON } from "../utils/CSVToJSON";

// GET Sports
export const getSports = async (req: Request, res: Response) => {
  try {
    const sports = await readSports();
    if (!sports) {
      return res.status(404).json("Could not find the requested sports.");
    }

    return res.status(200).json(sports);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json(error.message);
    }
  }
};

// CREATE Sports
export const addSports = async (req: Request, res: Response) => {
  if (!req.file || !req.file.buffer)
    return res.status(400).json("No file was provided");

  const sportsUploadCSVFileBuffer = req.file.buffer;

  try {
    const sportsJSON = (await CSVToJSON(
      sportsUploadCSVFileBuffer,
      "sport"
    )) as Sport[];

    if (!sportsJSON) {
      return res
        .status(400)
        .json(
          "Could not read the data provided. Make sure you are using a CSV file."
        );
    }
    const sports = await createSports(sportsJSON);
    return res.status(201).json(sports);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json(error.message);
    }
  }
};

// UPDATE Sports
export const modifySport = async (req: Request, res: Response) => {
  if (!req.file || !req.file.buffer)
    return res.status(400).json("No file was provided");

  const sportsUpdateCSVFileBuffer = req.file.buffer;

  try {
    const sportsJSON = (await CSVToJSON(
      sportsUpdateCSVFileBuffer,
      "sport"
    )) as Sport[];
    if (!sportsJSON) {
      return res
        .status(400)
        .json(
          "Could not read the data provided. Make sure you are using a CSV file."
        );
    }
    const sports = await updateSports(sportsJSON);
    return res.status(201).json(sports);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json(error.message);
    }
  }
};

// DELETE a Sport by name
export const removeOneSport = async (req: Request, res: Response) => {
  const sportName = req.query.sport;

  if (!sportName || typeof sportName !== "string")
    return res.status(400).json("Invalid or missing sport name.");

  try {
    const sport = await deleteOneSport(sportName.toUpperCase());

    return res.status(202).json(sport);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json(error.message);
    }
  }
};
