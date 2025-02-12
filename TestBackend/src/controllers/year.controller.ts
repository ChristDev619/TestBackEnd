import { Request, Response } from "express";

// SERVICES
import { readYears } from "../services/year.services";

export const getYears = async (req: Request, res: Response) => {
  try {
    const yearList = await readYears();

    return res.status(200).json(yearList);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json(error.message);
    }
  }
};
