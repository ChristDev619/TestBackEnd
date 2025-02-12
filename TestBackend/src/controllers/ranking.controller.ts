import { Request, Response } from "express";

//Types
import { Ranking } from "../utils/types/rankings/rankings.types";
import { RankingNameType } from "../utils/types/rankings/rankings.types";
import type { ContinentNameType } from "../utils/types/continent.types";

// UTILS
import { CSVToJSON } from "../utils/CSVToJSON";
import {
  selectReadRankingFunction,
  selectDeleteRankingFunction,
  selectImportRankingFunction,
  selectUpdateRankingFunction,
} from "../utils/selectRankingTable";

// GET the Ranking based on name and year (optional)
export const getRankings = async (req: Request, res: Response) => {
  try {
    const year = parseInt(req.query.year as string, 10);
    const rankingName = req.query.ranking as RankingNameType;
    const continent = req.query.continent as ContinentNameType;
    const limit = parseInt(req.query.limit as string, 10);

    if (!rankingName)
      return res.status(400).json("Invalid or missing ranking name.");

    const readRankingFunction = await selectReadRankingFunction(rankingName);

    const rankingList = await readRankingFunction(year, continent, limit);

    if (!rankingList) {
      return res.status(404).json("Could not find the requested ranking.");
    }

    return res.status(200).json(rankingList);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json(error.message);
    }
  }
};

// GET latest rankings without country code
// export const getLatestRankingsWithoutCode = async (
//   req: Request,
//   res: Response
// ) => {
//   const rankingName = req.query.ranking as RankingNameType;

//   if (!rankingName)
//     return res.status(400).json("Invalid or missing ranking name.");

//   try {
//     const rankingList = await readLatestRankingsWithoutCode(rankingName);

//     if (!rankingList) {
//       return res.status(404).json("Could not find the requested ranking.");
//     }

//     return res.status(200).json(rankingList);
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error(error.message);
//       return res.status(500).json(error.message);
//     }
//   }
// };

// POST Rankings based on name.
export const addRankings = async (req: Request, res: Response) => {
  if (!req.file || !req.file.buffer)
    return res.status(400).json("No file was provided.");

  const rankingUploadFileBuffer = req.file.buffer;

  const rankingName = req.query.ranking;

  if (!rankingName || typeof rankingName !== "string")
    return res.status(400).json("Invalid or missing ranking name.");

  try {
    const rankingJSON = (await CSVToJSON(
      rankingUploadFileBuffer,
      rankingName
    )) as Ranking[];

    if (!rankingJSON) {
      return res
        .status(400)
        .json(
          "Could not read the data provided. Make sure you are using a CSV format."
        );
    }
    const importRankingFunction = await selectImportRankingFunction(
      rankingName
    );

    const ranking = await importRankingFunction(rankingJSON);
    return res.status(201).json(ranking);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json(error.message);
    }
  }
};

// UPDATE Rankings based on name and year
export const modifyRankings = async (req: Request, res: Response) => {
  if (!req.file || !req.file.buffer)
    return res.status(400).json("No file was provided.");

  const rankingUpdateFileBuffer = req.file.buffer;

  const rankingName = req.query.ranking;

  if (!rankingName || typeof rankingName !== "string")
    return res.status(400).json("Invalid or missing ranking name.");

  try {
    const rankingJSON = (await CSVToJSON(
      rankingUpdateFileBuffer,
      rankingName
    )) as Ranking[];

    if (!rankingJSON) {
      return res
        .status(400)
        .json(
          "Could not read the data provided. Make sure you are using a CSV format."
        );
    }

    const updateRankingFunction = await selectUpdateRankingFunction(
      rankingName
    );

    const rankings = await updateRankingFunction(rankingJSON);
    return res.status(201).json(rankings);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json(error.message);
    }
  }
};

// DELETE Rankings based on country code and year
export const removeOneRanking = async (req: Request, res: Response) => {
  const rankingName = req.query.ranking;
  const countryCode = req.query.country;
  const year = parseInt(req.query.year as string, 10);
  const sportName = req.query?.sport;

  if (!rankingName || typeof rankingName !== "string")
    return res.status(400).json("Invalid or missing ranking name.");
  if (!countryCode || typeof countryCode !== "string")
    return res.status(400).json("Invalid or missing country code.");

  try {
    const deleteRankings = await selectDeleteRankingFunction(rankingName);
    const rankings = await deleteRankings(
      countryCode,
      year,
      sportName as string
    );

    return res.status(202).json(rankings);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json(error.message);
    }
  }
};
