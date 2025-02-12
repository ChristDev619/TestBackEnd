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
exports.deleteOneCountry = exports.updateCountries = exports.createCountries = exports.readCountryStatsWFCR = exports.readCountryStatsWSPI = exports.readCountryStatsWRCESMerit = exports.readCountryStatsWRCESFinal = exports.readCountries = void 0;
// DB INSTANCE
const db_server_1 = require("../config/db.server");
// READ Countries
const readCountries = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.prisma.country.findMany({
        orderBy: [
            {
                code: "asc",
            },
        ],
    });
});
exports.readCountries = readCountries;
// READ a Country's stats in WRCES Final Ranking
const readCountryStatsWRCESFinal = (countryCode) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.prisma.wRCESFinal.findMany({
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
    });
});
exports.readCountryStatsWRCESFinal = readCountryStatsWRCESFinal;
// READ a Country's stats in WRCES Merit Ranking
const readCountryStatsWRCESMerit = (countryCode) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.prisma.wRCESMerit.findMany({
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
    });
});
exports.readCountryStatsWRCESMerit = readCountryStatsWRCESMerit;
// READ a Country's stats in WSPI Ranking
const readCountryStatsWSPI = (countryCode) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.prisma.wSPI.findMany({
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
    });
});
exports.readCountryStatsWSPI = readCountryStatsWSPI;
// READ a Country's stats in WFCR Ranking
const readCountryStatsWFCR = (countryCode) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.prisma.wFCR.findMany({
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
    });
});
exports.readCountryStatsWFCR = readCountryStatsWFCR;
// CREATE Countries
const createCountries = (countries) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.prisma.country.createMany({
        data: countries,
    });
});
exports.createCountries = createCountries;
// UPDATE Countries
const updateCountries = (countries) => __awaiter(void 0, void 0, void 0, function* () {
    for (const country of countries) {
        const { code, name, iso_2, iso_3, continentCode } = country;
        const existingEntry = yield db_server_1.prisma.country.findUnique({
            where: {
                code,
            },
        });
        if (existingEntry) {
            return yield db_server_1.prisma.country.update({
                where: {
                    code: existingEntry.code,
                },
                data: {
                    code: code,
                    name: name,
                    iso_2: iso_2,
                    iso_3: iso_3,
                    continentCode: continentCode,
                },
            });
        }
    }
});
exports.updateCountries = updateCountries;
// DELETE Country by code
const deleteOneCountry = (code) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.prisma.country.delete({
        where: {
            code,
        },
    });
});
exports.deleteOneCountry = deleteOneCountry;
//# sourceMappingURL=country.services.js.map