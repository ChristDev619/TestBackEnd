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
exports.deleteWRCESMerit = exports.updateWRCESMerit = exports.importWRCESMerit = exports.readWRCESMerit = void 0;
// DB Instance
const db_server_1 = require("../config/db.server");
// READ WRCES Merit Ranking
const readWRCESMerit = (year, continentCode) => __awaiter(void 0, void 0, void 0, function* () {
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
            countryCode: true,
            points: true,
            year: true,
            change: true,
        },
        where: {
            year: year ? year : undefined,
            country: {
                continentCode,
            },
        },
    });
});
exports.readWRCESMerit = readWRCESMerit;
// IMPORT WRCES Merit Ranking
const importWRCESMerit = (wrcesMerit) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.prisma.wRCESMerit.createMany({
        data: wrcesMerit,
    });
});
exports.importWRCESMerit = importWRCESMerit;
// UPDATE WRCES Merit Ranking
const updateWRCESMerit = (wrcesMeritList) => __awaiter(void 0, void 0, void 0, function* () {
    for (const wrcesMerit of wrcesMeritList) {
        const { year, rank, countryCode, gdpRank, wrcesRank, difference, points, finalPoints, change, } = wrcesMerit;
        const existingEntry = yield db_server_1.prisma.wRCESMerit.findFirst({
            where: {
                year,
                countryCode,
            },
        });
        if (existingEntry) {
            return yield db_server_1.prisma.wRCESMerit.update({
                where: {
                    id: existingEntry.id,
                },
                data: {
                    rank: rank,
                    gdpRank: gdpRank,
                    wrcesRank: wrcesRank,
                    difference: difference,
                    points: points,
                    finalPoints: finalPoints,
                    change: change,
                },
            });
        }
    }
});
exports.updateWRCESMerit = updateWRCESMerit;
// DELETE WRCES Merit Ranking
const deleteWRCESMerit = (countryCode, year) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.prisma.wRCESMerit.delete({
        where: {
            year_countryCode: {
                year,
                countryCode,
            },
        },
    });
});
exports.deleteWRCESMerit = deleteWRCESMerit;
//# sourceMappingURL=wrcesMerit.services.js.map