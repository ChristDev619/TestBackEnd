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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeOneRanking = exports.modifyRankings = exports.addRankings = exports.getRankings = void 0;
// UTILS
var CSVToJSON_1 = require("../utils/CSVToJSON");
var selectRankingTable_1 = require("../utils/selectRankingTable");
// GET the Ranking based on name and year (optional)
var getRankings = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var year, rankingName, continent, limit, readRankingFunction, rankingList, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                year = parseInt(req.query.year, 10);
                rankingName = req.query.ranking;
                continent = req.query.continent;
                limit = parseInt(req.query.limit, 10);
                if (!rankingName)
                    return [2 /*return*/, res.status(400).json("Invalid or missing ranking name.")];
                return [4 /*yield*/, (0, selectRankingTable_1.selectReadRankingFunction)(rankingName)];
            case 1:
                readRankingFunction = _a.sent();
                return [4 /*yield*/, readRankingFunction(year, continent, limit)];
            case 2:
                rankingList = _a.sent();
                if (!rankingList) {
                    return [2 /*return*/, res.status(404).json("Could not find the requested ranking.")];
                }
                return [2 /*return*/, res.status(200).json(rankingList)];
            case 3:
                error_1 = _a.sent();
                if (error_1 instanceof Error) {
                    console.error(error_1.message);
                    return [2 /*return*/, res.status(500).json(error_1.message)];
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
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
var addRankings = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rankingUploadFileBuffer, rankingName, rankingJSON, importRankingFunction, ranking, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.file || !req.file.buffer)
                    return [2 /*return*/, res.status(400).json("No file was provided.")];
                rankingUploadFileBuffer = req.file.buffer;
                rankingName = req.query.ranking;
                if (!rankingName || typeof rankingName !== "string")
                    return [2 /*return*/, res.status(400).json("Invalid or missing ranking name.")];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, (0, CSVToJSON_1.CSVToJSON)(rankingUploadFileBuffer, rankingName)];
            case 2:
                rankingJSON = (_a.sent());
                if (!rankingJSON) {
                    return [2 /*return*/, res
                            .status(400)
                            .json("Could not read the data provided. Make sure you are using a CSV format.")];
                }
                return [4 /*yield*/, (0, selectRankingTable_1.selectImportRankingFunction)(rankingName)];
            case 3:
                importRankingFunction = _a.sent();
                return [4 /*yield*/, importRankingFunction(rankingJSON)];
            case 4:
                ranking = _a.sent();
                return [2 /*return*/, res.status(201).json(ranking)];
            case 5:
                error_2 = _a.sent();
                if (error_2 instanceof Error) {
                    console.error(error_2.message);
                    return [2 /*return*/, res.status(500).json(error_2.message)];
                }
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.addRankings = addRankings;
// UPDATE Rankings based on name and year
var modifyRankings = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rankingUpdateFileBuffer, rankingName, rankingJSON, updateRankingFunction, rankings, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.file || !req.file.buffer)
                    return [2 /*return*/, res.status(400).json("No file was provided.")];
                rankingUpdateFileBuffer = req.file.buffer;
                rankingName = req.query.ranking;
                if (!rankingName || typeof rankingName !== "string")
                    return [2 /*return*/, res.status(400).json("Invalid or missing ranking name.")];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, (0, CSVToJSON_1.CSVToJSON)(rankingUpdateFileBuffer, rankingName)];
            case 2:
                rankingJSON = (_a.sent());
                if (!rankingJSON) {
                    return [2 /*return*/, res
                            .status(400)
                            .json("Could not read the data provided. Make sure you are using a CSV format.")];
                }
                return [4 /*yield*/, (0, selectRankingTable_1.selectUpdateRankingFunction)(rankingName)];
            case 3:
                updateRankingFunction = _a.sent();
                return [4 /*yield*/, updateRankingFunction(rankingJSON)];
            case 4:
                rankings = _a.sent();
                return [2 /*return*/, res.status(201).json(rankings)];
            case 5:
                error_3 = _a.sent();
                if (error_3 instanceof Error) {
                    console.error(error_3.message);
                    return [2 /*return*/, res.status(500).json(error_3.message)];
                }
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.modifyRankings = modifyRankings;
// DELETE Rankings based on country code and year
var removeOneRanking = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rankingName, countryCode, year, sportName, deleteRankings, rankings, error_4;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                rankingName = req.query.ranking;
                countryCode = req.query.country;
                year = parseInt(req.query.year, 10);
                sportName = (_a = req.query) === null || _a === void 0 ? void 0 : _a.sport;
                if (!rankingName || typeof rankingName !== "string")
                    return [2 /*return*/, res.status(400).json("Invalid or missing ranking name.")];
                if (!countryCode || typeof countryCode !== "string")
                    return [2 /*return*/, res.status(400).json("Invalid or missing country code.")];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, (0, selectRankingTable_1.selectDeleteRankingFunction)(rankingName)];
            case 2:
                deleteRankings = _b.sent();
                return [4 /*yield*/, deleteRankings(countryCode, year, sportName)];
            case 3:
                rankings = _b.sent();
                return [2 /*return*/, res.status(202).json(rankings)];
            case 4:
                error_4 = _b.sent();
                if (error_4 instanceof Error) {
                    console.error(error_4.message);
                    return [2 /*return*/, res.status(500).json(error_4.message)];
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.removeOneRanking = removeOneRanking;
//# sourceMappingURL=ranking.controller.js.map