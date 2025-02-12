"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeOneRanking = exports.modifyRankings = exports.addRankings = exports.getRankings = void 0;
// UTILS
const CSVToJSON_1 = require("../utils/CSVToJSON");
const selectRankingTable_1 = require("../utils/selectRankingTable");
// GET the Ranking based on name and year (optional)
const getRankings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const year = parseInt(req.query.year, 10);
        const rankingName = req.query.ranking;
        const continent = req.query.continent;
        const limit = parseInt(req.query.limit, 10);
        if (!rankingName)
            return res.status(400).json("Invalid or missing ranking name.");
        const readRankingFunction = yield (0, selectRankingTable_1.selectReadRankingFunction)(rankingName);
        const rankingList = yield readRankingFunction(year, continent, limit);
        if (!rankingList) {
            return res.status(404).json("Could not find the requested ranking.");
        }
        return res.status(200).json(rankingList);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return res.status(500).json(error.message);
        }
    }
});
exports.getRankings = getRankings;
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
const addRankings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file || !req.file.buffer)
        return res.status(400).json("No file was provided.");
    const rankingUploadFileBuffer = req.file.buffer;
    const rankingName = req.query.ranking;
    if (!rankingName || typeof rankingName !== "string")
        return res.status(400).json("Invalid or missing ranking name.");
    try {
        const rankingJSON = (yield (0, CSVToJSON_1.CSVToJSON)(rankingUploadFileBuffer, rankingName));
        if (!rankingJSON) {
            return res
                .status(400)
                .json("Could not read the data provided. Make sure you are using a CSV format.");
        }
        const importRankingFunction = yield (0, selectRankingTable_1.selectImportRankingFunction)(rankingName);
        const ranking = yield importRankingFunction(rankingJSON);
        return res.status(201).json(ranking);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return res.status(500).json(error.message);
        }
    }
});
exports.addRankings = addRankings;
// UPDATE Rankings based on name and year
const modifyRankings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file || !req.file.buffer)
        return res.status(400).json("No file was provided.");
    const rankingUpdateFileBuffer = req.file.buffer;
    const rankingName = req.query.ranking;
    if (!rankingName || typeof rankingName !== "string")
        return res.status(400).json("Invalid or missing ranking name.");
    try {
        const rankingJSON = (yield (0, CSVToJSON_1.CSVToJSON)(rankingUpdateFileBuffer, rankingName));
        if (!rankingJSON) {
            return res
                .status(400)
                .json("Could not read the data provided. Make sure you are using a CSV format.");
        }
        const updateRankingFunction = yield (0, selectRankingTable_1.selectUpdateRankingFunction)(rankingName);
        const rankings = yield updateRankingFunction(rankingJSON);
        return res.status(201).json(rankings);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return res.status(500).json(error.message);
        }
    }
});
exports.modifyRankings = modifyRankings;
// DELETE Rankings based on country code and year
const removeOneRanking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const rankingName = req.query.ranking;
    const countryCode = req.query.country;
    const year = parseInt(req.query.year, 10);
    const sportName = (_a = req.query) === null || _a === void 0 ? void 0 : _a.sport;
    if (!rankingName || typeof rankingName !== "string")
        return res.status(400).json("Invalid or missing ranking name.");
    if (!countryCode || typeof countryCode !== "string")
        return res.status(400).json("Invalid or missing country code.");
    try {
        const deleteRankings = yield (0, selectRankingTable_1.selectDeleteRankingFunction)(rankingName);
        const rankings = yield deleteRankings(countryCode, year, sportName);
        return res.status(202).json(rankings);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return res.status(500).json(error.message);
        }
    }
});
exports.removeOneRanking = removeOneRanking;
//# sourceMappingURL=ranking.controller.js.map