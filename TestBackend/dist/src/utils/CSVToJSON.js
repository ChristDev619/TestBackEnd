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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSVToJSON = void 0;
const stream_1 = require("stream");
const csv_parser_1 = __importDefault(require("csv-parser"));
// Convert the CSV file to a string
const CSVFileToString = (file) => {
    return file === null || file === void 0 ? void 0 : file.toString();
};
// Determine the function to call
// based on the table required
const CSVToJSONFunctionsMap = {
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
const CSVToJSON = (file, type) => {
    const stringCSV = CSVFileToString(file);
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
    return __awaiter(this, void 0, void 0, function* () {
        const ranks = [];
        yield stream_1.Readable.from(stringCSV)
            .pipe((0, csv_parser_1.default)())
            .on("data", (data) => {
            const newData = {
                year: parseInt(data.year, 10),
                rank: parseInt(data.rank, 10),
                countryCode: data.country_code,
                points: parseFloat(data.points),
                change: parseInt(data.change, 10),
            };
            ranks.push(newData);
        });
        return ranks;
    });
}
// WRCES Sport CSV to JSON
function wrcesSportCSVToJSON(stringCSV) {
    return __awaiter(this, void 0, void 0, function* () {
        const ranks = [];
        yield stream_1.Readable.from(stringCSV)
            .pipe((0, csv_parser_1.default)())
            .on("data", (data) => {
            const newData = {
                year: parseInt(data.year, 10),
                sportName: data.sport_name,
                rank: parseInt(data.rank, 10),
                countryCode: data.country_code,
                points: parseFloat(data.points),
                change: parseInt(data.change, 10),
            };
            ranks.push(newData);
        });
        return ranks;
    });
}
// WRCES Merit CSV to JSON
function wrcesMeritCSVToJSON(stringCSV) {
    return __awaiter(this, void 0, void 0, function* () {
        const ranks = [];
        yield stream_1.Readable.from(stringCSV)
            .pipe((0, csv_parser_1.default)())
            .on("data", (data) => {
            const newData = {
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
        });
        return ranks;
    });
}
// WFCR CSV to JSON
function wfcrCSVToJSON(stringCSV) {
    return __awaiter(this, void 0, void 0, function* () {
        const ranks = [];
        yield stream_1.Readable.from(stringCSV)
            .pipe((0, csv_parser_1.default)())
            .on("data", (data) => {
            const newData = {
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
        });
        return ranks;
    });
}
// WSPI CSV to JSON
function wspiCSVToJSON(stringCSV) {
    return __awaiter(this, void 0, void 0, function* () {
        const ranks = [];
        yield stream_1.Readable.from(stringCSV)
            .pipe((0, csv_parser_1.default)())
            .on("data", (data) => {
            const newData = {
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
        });
        return ranks;
    });
}
// Discipline CSV to JSON
function disciplineCSVToJSON(stringCSV) {
    return __awaiter(this, void 0, void 0, function* () {
        const disciplines = [];
        yield stream_1.Readable.from(stringCSV)
            .pipe((0, csv_parser_1.default)())
            .on("data", (data) => {
            const newData = {
                sportName: data.sport_name,
                name: data.name,
                coeff: parseFloat(data.coeff),
                coefficientMen: parseFloat(data.coeff_men),
                coefficientWomen: parseFloat(data.coeff_women),
            };
            disciplines.push(newData);
        });
        return disciplines;
    });
}
// Sport CSV to JSON
function sportCSVToJSON(stringCSV) {
    return __awaiter(this, void 0, void 0, function* () {
        const sports = [];
        yield stream_1.Readable.from(stringCSV)
            .pipe((0, csv_parser_1.default)())
            .on("data", (data) => {
            const newData = {
                name: data.name,
                coefficient: parseFloat(data.coeff),
            };
            sports.push(newData);
        });
        return sports;
    });
}
// Country CSV to JSON
function countryCSVToJSON(stringCSV) {
    return __awaiter(this, void 0, void 0, function* () {
        const countries = [];
        yield stream_1.Readable.from(stringCSV)
            .pipe((0, csv_parser_1.default)())
            .on("data", (data) => {
            const newData = {
                code: data.code,
                name: data.name,
                iso_2: data.iso_2,
                iso_3: data.iso_3,
                continentCode: data.continent_code,
            };
            countries.push(newData);
        });
        return countries;
    });
}
// Continent CSV to JSON
function continentCSVToJSON(stringCSV) {
    return __awaiter(this, void 0, void 0, function* () {
        const continents = [];
        yield stream_1.Readable.from(stringCSV)
            .pipe((0, csv_parser_1.default)())
            .on("data", (data) => {
            const newData = {
                code: data.code,
                name: data.name,
            };
            continents.push(newData);
        });
        return continents;
    });
}
//# sourceMappingURL=CSVToJSON.js.map