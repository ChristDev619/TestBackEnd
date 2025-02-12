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
exports.removeOneCountry = exports.modifyCountries = exports.addCountries = exports.getCountryStats = exports.getCountries = void 0;
// DB SERVICE FUNCTIONS
var country_services_1 = require("../services/country.services");
// UTILS
var CSVToJSON_1 = require("../utils/CSVToJSON");
var selectRankingTable_1 = require("../utils/selectRankingTable");
// GET Countries
var getCountries = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var countries, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, country_services_1.readCountries)()];
            case 1:
                countries = _a.sent();
                console.log(countries);
                if (!countries) {
                    return [2 /*return*/, res.status(404).json("Could not find the countries.")];
                }
                return [2 /*return*/, res.status(200).json(countries)];
            case 2:
                error_1 = _a.sent();
                if (error_1 instanceof Error) {
                    console.error(error_1.message);
                    return [2 /*return*/, res.status(500).json(error_1.message)];
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCountries = getCountries;
// GET a single country's stats by its iso_2 code and the requested ranking
var getCountryStats = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var countryCode, ranking, readCountryStatsFunction, countryStats, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                countryCode = req.params.country;
                ranking = req.query.ranking;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, (0, selectRankingTable_1.selectReadCountryStatsFunction)(ranking)];
            case 2:
                readCountryStatsFunction = _a.sent();
                return [4 /*yield*/, readCountryStatsFunction(countryCode)];
            case 3:
                countryStats = _a.sent();
                if (!countryStats) {
                    return [2 /*return*/, res.status(404).json("Could not find the requested country.")];
                }
                return [2 /*return*/, res.status(200).json(countryStats)];
            case 4:
                error_2 = _a.sent();
                if (error_2 instanceof Error) {
                    console.error(error_2.message);
                    return [2 /*return*/, res.status(500).json(error_2.message)];
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getCountryStats = getCountryStats;
// POST Countries read from CSV file
var addCountries = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var countriesUploadCSVFileBuffer, countryJSON, countries, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.file || !req.file.buffer)
                    return [2 /*return*/, res.status(400).json("No file was provided.")];
                countriesUploadCSVFileBuffer = req.file.buffer;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, (0, CSVToJSON_1.CSVToJSON)(countriesUploadCSVFileBuffer, "country")];
            case 2:
                countryJSON = (_a.sent());
                if (!countryJSON) {
                    return [2 /*return*/, res
                            .status(400)
                            .json("Could not read the data provided. Make sure you are using a CSV file.")];
                }
                return [4 /*yield*/, (0, country_services_1.createCountries)(countryJSON)];
            case 3:
                countries = _a.sent();
                return [2 /*return*/, res.status(201).json(countries)];
            case 4:
                error_3 = _a.sent();
                if (error_3 instanceof Error) {
                    console.error(error_3);
                    return [2 /*return*/, res.status(500).json(error_3)];
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.addCountries = addCountries;
// PATCH Countries read from CSV file
var modifyCountries = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var countriesUpdateCSVFileBuffer, countryJSON, countries, error_4;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!req.file || !req.file.buffer)
                    return [2 /*return*/, res.status(400).json("No file was provided.")];
                countriesUpdateCSVFileBuffer = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, (0, CSVToJSON_1.CSVToJSON)(countriesUpdateCSVFileBuffer, "country")];
            case 2:
                countryJSON = (_b.sent());
                if (!countryJSON) {
                    return [2 /*return*/, res
                            .status(400)
                            .json("Could not read the data provided. Make sure you are using a CSV file.")];
                }
                return [4 /*yield*/, (0, country_services_1.updateCountries)(countryJSON)];
            case 3:
                countries = _b.sent();
                return [2 /*return*/, res.status(201).json(countries)];
            case 4:
                error_4 = _b.sent();
                if (error_4 instanceof Error) {
                    console.error(error_4);
                    return [2 /*return*/, res.status(500).json(error_4)];
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.modifyCountries = modifyCountries;
// DELETE Country by code
var removeOneCountry = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var countryCode, country, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                countryCode = req.query.country;
                if (!countryCode || typeof countryCode !== "string")
                    return [2 /*return*/, res.status(400).json("Invalid or missing continent.")];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, country_services_1.deleteOneCountry)(countryCode)];
            case 2:
                country = _a.sent();
                return [2 /*return*/, res.status(202).json(country)];
            case 3:
                error_5 = _a.sent();
                if (error_5 instanceof Error) {
                    console.error(error_5.message);
                    return [2 /*return*/, res.status(500).json(error_5.message)];
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.removeOneCountry = removeOneCountry;
//# sourceMappingURL=country.controller.js.map