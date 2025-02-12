import { Request, Response } from "express";

// DB SERVICE FUNCTIONS
import {
  readDisciplines,
  createDisciplines,
  updateDisciplines,
  deleteOneDiscipline,
} from "../services/discipline.services";

//Types
import { Discipline } from "../utils/types/discipline.types";

// UTILS
import { CSVToJSON } from "../utils/CSVToJSON";

// GET Disciplines
export const getDiscplines = async (req: Request, res: Response) => {
  try {
    const disciplines = await readDisciplines();

    if (!disciplines) {
      return res.status(404).json("Could not find the disciplines.");
    }

    return res.status(200).json(disciplines);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json(error.message);
    }
  }
};

// POST Disciplines read from CSV file
export const addDisciplines = async (req: Request, res: Response) => {
  if (!req.file || !req.file.buffer)
    return res.status(400).json("No file was provided.");

  const disciplineUploadCSVFileBuffer = req.file.buffer;

  try {
    const disciplineJSON = (await CSVToJSON(
      disciplineUploadCSVFileBuffer,
      "discipline"
    )) as Discipline[];
    if (!disciplineJSON) {
      return res
        .status(400)
        .json(
          "Could not read the data provided. Make sure you are using a CSV file."
        );
    }
    const disciplines = await createDisciplines(disciplineJSON);
    return res.status(201).json(disciplines);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json(error.message);
    }
  }
};

// PATCH Disciplines read from CSV file
export const modifyDisciplines = async (req: Request, res: Response) => {
  if (!req.file || !req.file.buffer)
    return res.status(400).json("No file was provided.");

  const discpiplineUpdateCSVFileBuffer = req.file.buffer;

  try {
    const disciplineJSON = (await CSVToJSON(
      discpiplineUpdateCSVFileBuffer,
      "discipline"
    )) as Discipline[];
    if (!disciplineJSON) {
      return res
        .status(400)
        .json(
          "Could not read the data provided. Make sure you are using a CSV file."
        );
    }
    const disciplines = await updateDisciplines(disciplineJSON);
    return res.status(201).json(disciplines);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json(error.message);
    }
  }
};

// DELETE Discipline by name
export const removeOneDiscipline = async (req: Request, res: Response) => {
  const disciplineName = req.query.discipline;

  if (!disciplineName || typeof disciplineName !== "string")
    return res.status(400).json("Invalid or missing discipline.");

  try {
    const discipline = await deleteOneDiscipline(disciplineName);

    return res.status(202).json(discipline);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json(error.message);
    }
  }
};
