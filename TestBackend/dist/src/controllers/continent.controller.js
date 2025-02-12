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
exports.removeOneContinent = exports.modifyContinents = exports.addContinents = exports.getContinents = void 0;
// DB SERVICE FUNCTIONS
const continent_services_1 = require("../services/continent.services");
// UTILS
const CSVToJSON_1 = require("../utils/CSVToJSON");
// GET Continents
const getContinents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const continents = yield (0, continent_services_1.readContinents)();
        if (!continents) {
            return res.status(404).json("Could not find the continents.");
        }
        return res.status(200).json(continents);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return res.status(500).json(error.message);
        }
    }
});
exports.getContinents = getContinents;
// POST Continents read from CSV file
const addContinents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file || !req.file.buffer)
        return res.status(400).json("No file was provided.");
    const continentsUploadCSVFileBuffer = req.file.buffer;
    try {
        const continentJSON = (yield (0, CSVToJSON_1.CSVToJSON)(continentsUploadCSVFileBuffer, "continent"));
        if (!continentJSON) {
            return res
                .status(400)
                .json("Could not read the data provided. Make sure you are using a CSV file.");
        }
        const continents = yield (0, continent_services_1.createContinent)(continentJSON);
        return res.status(201).json(continents);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return res.status(500).json(error.message);
        }
    }
});
exports.addContinents = addContinents;
// PATCH Continents read from CSV file
const modifyContinents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file || !req.file.buffer)
        return res.status(400).json("No file was provided.");
    const continentsUpdateCSVFileBuffer = req.file.buffer;
    try {
        const continentJSON = (yield (0, CSVToJSON_1.CSVToJSON)(continentsUpdateCSVFileBuffer, "continent"));
        if (!continentJSON) {
            return res
                .status(400)
                .json("Could not read the data provided. Make sure you are using a CSV file.");
        }
        const continents = yield (0, continent_services_1.updateContinents)(continentJSON);
        return res.status(201).json(continents);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return res.status(500).json(error.message);
        }
    }
});
exports.modifyContinents = modifyContinents;
// DELETE Continent by code
const removeOneContinent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const continentCode = req.query.continent;
    if (!continentCode || typeof continentCode !== "string")
        return res.status(400).json("Invalid or missing continent.");
    try {
        const continent = yield (0, continent_services_1.deleteOneContinent)(continentCode);
        return res.status(202).json(continent);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return res.status(500).json(error.message);
        }
    }
});
exports.removeOneContinent = removeOneContinent;
//# sourceMappingURL=continent.controller.js.map