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
exports.removeOneSport = exports.modifySport = exports.addSports = exports.getSports = void 0;
// DB SERVICES
const sport_services_1 = require("../services/sport.services");
// UTILS
const CSVToJSON_1 = require("../utils/CSVToJSON");
// GET Sports
const getSports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sports = yield (0, sport_services_1.readSports)();
        if (!sports) {
            return res.status(404).json("Could not find the requested sports.");
        }
        return res.status(200).json(sports);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return res.status(500).json(error.message);
        }
    }
});
exports.getSports = getSports;
// CREATE Sports
const addSports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file || !req.file.buffer)
        return res.status(400).json("No file was provided");
    const sportsUploadCSVFileBuffer = req.file.buffer;
    try {
        const sportsJSON = (yield (0, CSVToJSON_1.CSVToJSON)(sportsUploadCSVFileBuffer, "sport"));
        if (!sportsJSON) {
            return res
                .status(400)
                .json("Could not read the data provided. Make sure you are using a CSV file.");
        }
        const sports = yield (0, sport_services_1.createSports)(sportsJSON);
        return res.status(201).json(sports);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return res.status(500).json(error.message);
        }
    }
});
exports.addSports = addSports;
// UPDATE Sports
const modifySport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file || !req.file.buffer)
        return res.status(400).json("No file was provided");
    const sportsUpdateCSVFileBuffer = req.file.buffer;
    try {
        const sportsJSON = (yield (0, CSVToJSON_1.CSVToJSON)(sportsUpdateCSVFileBuffer, "sport"));
        if (!sportsJSON) {
            return res
                .status(400)
                .json("Could not read the data provided. Make sure you are using a CSV file.");
        }
        const sports = yield (0, sport_services_1.updateSports)(sportsJSON);
        return res.status(201).json(sports);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return res.status(500).json(error.message);
        }
    }
});
exports.modifySport = modifySport;
// DELETE a Sport by name
const removeOneSport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sportName = req.query.sport;
    if (!sportName || typeof sportName !== "string")
        return res.status(400).json("Invalid or missing sport name.");
    try {
        const sport = yield (0, sport_services_1.deleteOneSport)(sportName.toUpperCase());
        return res.status(202).json(sport);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return res.status(500).json(error.message);
        }
    }
});
exports.removeOneSport = removeOneSport;
//# sourceMappingURL=sport.controller.js.map