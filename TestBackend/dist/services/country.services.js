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
exports.deleteOneCountry = exports.updateCountries = exports.createCountries = exports.readCountryStatsWFCR = exports.readCountryStatsWSPI = exports.readCountryStatsWRCESMerit = exports.readCountryStatsWRCESFinal = exports.readCountries = void 0;
// DB INSTANCE
var db_server_1 = require("../config/db.server");
// READ Countries
var readCountries = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_server_1.prisma.country.findMany({
                    orderBy: [
                        {
                            code: "asc",
                        },
                    ],
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.readCountries = readCountries;
// READ a Country's stats in WRCES Final Ranking
var readCountryStatsWRCESFinal = function (countryCode) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_server_1.prisma.wRCESFinal.findMany({
                    orderBy: [
                        {
                            year: "desc",
                        },
                        {
                            rank: "asc",
                        },
                    ],
                    select: {
                        rank: true,
                        country: {
                            select: {
                                name: true,
                                iso_2: true,
                            },
                        },
                        year: true,
                        change: true,
                    },
                    where: {
                        country: {
                            iso_2: countryCode,
                        },
                    },
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.readCountryStatsWRCESFinal = readCountryStatsWRCESFinal;
// READ a Country's stats in WRCES Merit Ranking
var readCountryStatsWRCESMerit = function (countryCode) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_server_1.prisma.wRCESMerit.findMany({
                    orderBy: [
                        {
                            year: "desc",
                        },
                        {
                            rank: "asc",
                        },
                    ],
                    select: {
                        rank: true,
                        country: {
                            select: {
                                name: true,
                                iso_2: true,
                            },
                        },
                        year: true,
                        change: true,
                    },
                    where: {
                        country: {
                            iso_2: countryCode,
                        },
                    },
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.readCountryStatsWRCESMerit = readCountryStatsWRCESMerit;
// READ a Country's stats in WSPI Ranking
var readCountryStatsWSPI = function (countryCode) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_server_1.prisma.wSPI.findMany({
                    orderBy: [
                        {
                            year: "desc",
                        },
                        {
                            rank: "asc",
                        },
                    ],
                    select: {
                        rank: true,
                        country: {
                            select: {
                                name: true,
                                iso_2: true,
                            },
                        },
                        year: true,
                        change: true,
                    },
                    where: {
                        country: {
                            iso_2: countryCode,
                        },
                    },
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.readCountryStatsWSPI = readCountryStatsWSPI;
// READ a Country's stats in WFCR Ranking
var readCountryStatsWFCR = function (countryCode) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_server_1.prisma.wFCR.findMany({
                    orderBy: [
                        {
                            year: "desc",
                        },
                        {
                            rank: "asc",
                        },
                    ],
                    select: {
                        rank: true,
                        country: {
                            select: {
                                name: true,
                                iso_2: true,
                            },
                        },
                        year: true,
                        change: true,
                    },
                    where: {
                        country: {
                            iso_2: countryCode,
                        },
                    },
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.readCountryStatsWFCR = readCountryStatsWFCR;
// CREATE Countries
var createCountries = function (countries) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_server_1.prisma.country.createMany({
                    data: countries,
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.createCountries = createCountries;
// UPDATE Countries
var updateCountries = function (countries) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, countries_1, country, code, name_1, iso_2, iso_3, continentCode, existingEntry;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _i = 0, countries_1 = countries;
                _a.label = 1;
            case 1:
                if (!(_i < countries_1.length)) return [3 /*break*/, 5];
                country = countries_1[_i];
                code = country.code, name_1 = country.name, iso_2 = country.iso_2, iso_3 = country.iso_3, continentCode = country.continentCode;
                return [4 /*yield*/, db_server_1.prisma.country.findUnique({
                        where: {
                            code: code,
                        },
                    })];
            case 2:
                existingEntry = _a.sent();
                if (!existingEntry) return [3 /*break*/, 4];
                return [4 /*yield*/, db_server_1.prisma.country.update({
                        where: {
                            code: existingEntry.code,
                        },
                        data: {
                            code: code,
                            name: name_1,
                            iso_2: iso_2,
                            iso_3: iso_3,
                            continentCode: continentCode,
                        },
                    })];
            case 3: return [2 /*return*/, _a.sent()];
            case 4:
                _i++;
                return [3 /*break*/, 1];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateCountries = updateCountries;
// DELETE Country by code
var deleteOneCountry = function (code) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_server_1.prisma.country.delete({
                    where: {
                        code: code,
                    },
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.deleteOneCountry = deleteOneCountry;
//# sourceMappingURL=country.services.js.map