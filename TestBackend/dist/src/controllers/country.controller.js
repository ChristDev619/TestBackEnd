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
exports.removeOneCountry = exports.modifyCountries = exports.addCountries = exports.getCountryStats = exports.getCountries = void 0;
// DB SERVICE FUNCTIONS
const country_services_1 = require("../services/country.services");
// UTILS
const CSVToJSON_1 = require("../utils/CSVToJSON");
const selectRankingTable_1 = require("../utils/selectRankingTable");
// GET Countries
const getCountries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countries = yield (0, country_services_1.readCountries)();
        console.log(countries);
        if (!countries) {
            return res.status(404).json("Could not find the countries.");
        }
        return res.status(200).json(countries);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return res.status(500).json(error.message);
        }
    }
});
exports.getCountries = getCountries;
// GET a single country's stats by its iso_2 code and the requested ranking
const getCountryStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const countryCode = req.params.country;
    const ranking = req.query.ranking;
    try {
        // const countryStats = await readCountryStats(countryCode, ranking);
        const readCountryStatsFunction = yield (0, selectRankingTable_1.selectReadCountryStatsFunction)(ranking);
        const countryStats = yield readCountryStatsFunction(countryCode);
        if (!countryStats) {
            return res.status(404).json("Could not find the requested country.");
        }
        return res.status(200).json(countryStats);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return res.status(500).json(error.message);
        }
    }
});
exports.getCountryStats = getCountryStats;
// POST Countries read from CSV file
const addCountries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file || !req.file.buffer)
        return res.status(400).json("No file was provided.");
    const countriesUploadCSVFileBuffer = req.file.buffer;
    try {
        const countryJSON = (yield (0, CSVToJSON_1.CSVToJSON)(countriesUploadCSVFileBuffer, "country"));
        if (!countryJSON) {
            return res
                .status(400)
                .json("Could not read the data provided. Make sure you are using a CSV file.");
        }
        const countries = yield (0, country_services_1.createCountries)(countryJSON);
        return res.status(201).json(countries);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error);
            return res.status(500).json(error);
        }
    }
});
exports.addCountries = addCountries;
// PATCH Countries read from CSV file
const modifyCountries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!req.file || !req.file.buffer)
        return res.status(400).json("No file was provided.");
    const countriesUpdateCSVFileBuffer = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer;
    try {
        const countryJSON = (yield (0, CSVToJSON_1.CSVToJSON)(countriesUpdateCSVFileBuffer, "country"));
        if (!countryJSON) {
            return res
                .status(400)
                .json("Could not read the data provided. Make sure you are using a CSV file.");
        }
        const countries = yield (0, country_services_1.updateCountries)(countryJSON);
        return res.status(201).json(countries);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error);
            return res.status(500).json(error);
        }
    }
});
exports.modifyCountries = modifyCountries;
// DELETE Country by code
const removeOneCountry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const countryCode = req.query.country;
    if (!countryCode || typeof countryCode !== "string")
        return res.status(400).json("Invalid or missing continent.");
    try {
        const country = yield (0, country_services_1.deleteOneCountry)(countryCode);
        return res.status(202).json(country);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return res.status(500).json(error.message);
        }
    }
});
exports.removeOneCountry = removeOneCountry;
//# sourceMappingURL=country.controller.js.map