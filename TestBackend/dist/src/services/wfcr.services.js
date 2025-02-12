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
exports.deleteWFCR = exports.updateWFCR = exports.importWFCR = exports.readWFCR = void 0;
// DB Instance
const db_server_1 = require("../config/db.server");
// READ WFCR Ranking
const readWFCR = (year, continentCode) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.readWFCR = readWFCR;
// IMPORT WFCR Ranking
const importWFCR = (wfcr) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.prisma.wFCR.createMany({
        data: wfcr,
    });
});
exports.importWFCR = importWFCR;
// UPDATE WFCR Ranking
const updateWFCR = (wfcrList) => __awaiter(void 0, void 0, void 0, function* () {
    for (const wfcr of wfcrList) {
        const { year, rank, countryCode, wrces, merit, wrcesPoints, obesity, pou, avgPouObesity, points, change, } = wfcr;
        const existingEntry = yield db_server_1.prisma.wFCR.findFirst({
            where: {
                year,
                countryCode,
            },
        });
        if (existingEntry) {
            return yield db_server_1.prisma.wFCR.update({
                where: {
                    id: existingEntry.id,
                },
                data: {
                    rank: rank,
                    wrces: wrces,
                    merit: merit,
                    wrcesPoints: wrcesPoints,
                    obesity: obesity,
                    pou: pou,
                    avgPouObesity: avgPouObesity,
                    points: points,
                    change: change,
                },
            });
        }
    }
});
exports.updateWFCR = updateWFCR;
// DELETE WFCR Ranking
const deleteWFCR = (countryCode, year) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.prisma.wFCR.delete({
        where: {
            year_countryCode: {
                countryCode,
                year,
            },
        },
    });
});
exports.deleteWFCR = deleteWFCR;
//# sourceMappingURL=wfcr.services.js.map