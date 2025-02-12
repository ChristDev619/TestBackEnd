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
exports.CSVToJSON = void 0;
var stream_1 = require("stream");
var csv_parser_1 = require("csv-parser");
// Convert the CSV file to a string
var CSVFileToString = function (file) {
    return file === null || file === void 0 ? void 0 : file.toString();
};
// Determine the function to call
// based on the table required
var CSVToJSONFunctionsMap = {
    "wrces_final": wrcesFinalCSVToJson,
    "wrces_sport": wrcesSportCSVToJSON,
    "wrces_merit": wrcesMeritCSVToJSON,
    "wfcr": wfcrCSVToJSON,
    "wspi": wspiCSVToJSON,
    "discipline": disciplineCSVToJSON,
    "sport": sportCSVToJSON,
    "country": countryCSVToJSON,
    "continent": continentCSVToJSON,
};
// Convert the CSV file to JSON
var CSVToJSON = function (file, type) {
    var stringCSV = CSVFileToString(file);
    if (type && CSVToJSONFunctionsMap.hasOwnProperty(type)) {
        return CSVToJSONFunctionsMap[type](stringCSV);
    }
    else {
        throw new Error("Could not find the requested ranking.");
    }
};
exports.CSVToJSON = CSVToJSON;
// WRCES Final CSV to JSON
function wrcesFinalCSVToJson(stringCSV) {
    return __awaiter(this, void 0, void 0, function () {
        var ranks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ranks = [];
                    return [4 /*yield*/, stream_1.Readable.from(stringCSV)
                            .pipe((0, csv_parser_1.default)())
                            .on("data", function (data) {
                            var newData = {
                                year: parseInt(data.year, 10),
                                rank: parseInt(data.rank, 10),
                                countryCode: data.country_code,
                                points: parseFloat(data.points),
                                change: parseInt(data.change, 10),
                            };
                            ranks.push(newData);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, ranks];
            }
        });
    });
}
// WRCES Sport CSV to JSON
function wrcesSportCSVToJSON(stringCSV) {
    return __awaiter(this, void 0, void 0, function () {
        var ranks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ranks = [];
                    return [4 /*yield*/, stream_1.Readable.from(stringCSV)
                            .pipe((0, csv_parser_1.default)())
                            .on("data", function (data) {
                            var newData = {
                                year: parseInt(data.year, 10),
                                sportName: data.sport_name,
                                rank: parseInt(data.rank, 10),
                                countryCode: data.country_code,
                                points: parseFloat(data.points),
                                change: parseInt(data.change, 10),
                            };
                            ranks.push(newData);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, ranks];
            }
        });
    });
}
// WRCES Merit CSV to JSON
function wrcesMeritCSVToJSON(stringCSV) {
    return __awaiter(this, void 0, void 0, function () {
        var ranks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ranks = [];
                    return [4 /*yield*/, stream_1.Readable.from(stringCSV)
                            .pipe((0, csv_parser_1.default)())
                            .on("data", function (data) {
                            var newData = {
                                year: parseInt(data.year, 10),
                                rank: parseInt(data.rank, 10),
                                countryCode: data.country_code,
                                gdpRank: parseInt(data.gdp_rank, 10),
                                wrcesRank: parseInt(data.wrces_rank, 10),
                                difference: parseInt(data.difference, 10),
                                points: parseFloat(data.points),
                                finalPoints: parseFloat(data.final_points),
                                change: parseInt(data.change, 10),
                            };
                            ranks.push(newData);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, ranks];
            }
        });
    });
}
// WFCR CSV to JSON
function wfcrCSVToJSON(stringCSV) {
    return __awaiter(this, void 0, void 0, function () {
        var ranks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ranks = [];
                    return [4 /*yield*/, stream_1.Readable.from(stringCSV)
                            .pipe((0, csv_parser_1.default)())
                            .on("data", function (data) {
                            var newData = {
                                year: parseInt(data.year, 10),
                                rank: parseInt(data.rank, 10),
                                countryCode: data.country_code,
                                wrces: parseFloat(data.wrces),
                                merit: parseFloat(data.merit),
                                wrcesPoints: parseFloat(data.wrces_points),
                                obesity: parseFloat(data.obesity),
                                pou: parseFloat(data.pou),
                                avgPouObesity: parseFloat(data.avg_pou_obesity),
                                points: parseFloat(data.points),
                                change: parseInt(data.change, 10),
                            };
                            ranks.push(newData);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, ranks];
            }
        });
    });
}
// WSPI CSV to JSON
function wspiCSVToJSON(stringCSV) {
    return __awaiter(this, void 0, void 0, function () {
        var ranks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ranks = [];
                    return [4 /*yield*/, stream_1.Readable.from(stringCSV)
                            .pipe((0, csv_parser_1.default)())
                            .on("data", function (data) {
                            var newData = {
                                year: parseInt(data.year, 10),
                                rank: parseInt(data.rank, 10),
                                countryCode: data.country_code,
                                wrcesPoints: parseFloat(data.wrces_points),
                                cityPoints: parseInt(data.city_points, 10),
                                proleaguePoints: parseFloat(data.proleague_points),
                                points: parseFloat(data.points),
                                change: parseInt(data.change, 10),
                            };
                            ranks.push(newData);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, ranks];
            }
        });
    });
}
// Discipline CSV to JSON
function disciplineCSVToJSON(stringCSV) {
    return __awaiter(this, void 0, void 0, function () {
        var disciplines;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    disciplines = [];
                    return [4 /*yield*/, stream_1.Readable.from(stringCSV)
                            .pipe((0, csv_parser_1.default)())
                            .on("data", function (data) {
                            var newData = {
                                sportName: data.sport_name,
                                name: data.name,
                                coeff: parseFloat(data.coeff),
                                coefficientMen: parseFloat(data.coeff_men),
                                coefficientWomen: parseFloat(data.coeff_women),
                            };
                            disciplines.push(newData);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, disciplines];
            }
        });
    });
}
// Sport CSV to JSON
function sportCSVToJSON(stringCSV) {
    return __awaiter(this, void 0, void 0, function () {
        var sports;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sports = [];
                    return [4 /*yield*/, stream_1.Readable.from(stringCSV)
                            .pipe((0, csv_parser_1.default)())
                            .on("data", function (data) {
                            var newData = {
                                name: data.name,
                                coefficient: parseFloat(data.coeff),
                            };
                            sports.push(newData);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, sports];
            }
        });
    });
}
// Country CSV to JSON
function countryCSVToJSON(stringCSV) {
    return __awaiter(this, void 0, void 0, function () {
        var countries;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    countries = [];
                    return [4 /*yield*/, stream_1.Readable.from(stringCSV)
                            .pipe((0, csv_parser_1.default)())
                            .on("data", function (data) {
                            var newData = {
                                code: data.code,
                                name: data.name,
                                iso_2: data.iso_2,
                                iso_3: data.iso_3,
                                continentCode: data.continent_code,
                            };
                            countries.push(newData);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, countries];
            }
        });
    });
}
// Continent CSV to JSON
function continentCSVToJSON(stringCSV) {
    return __awaiter(this, void 0, void 0, function () {
        var continents;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    continents = [];
                    return [4 /*yield*/, stream_1.Readable.from(stringCSV)
                            .pipe((0, csv_parser_1.default)())
                            .on("data", function (data) {
                            var newData = {
                                code: data.code,
                                name: data.name,
                            };
                            continents.push(newData);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, continents];
            }
        });
    });
}
//# sourceMappingURL=CSVToJSON.js.map