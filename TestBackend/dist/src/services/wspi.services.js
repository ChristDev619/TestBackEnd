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
exports.deleteWSPI = exports.updateWSPI = exports.importWSPI = exports.readWSPI = void 0;
// DB Instance
const db_server_1 = require("../config/db.server");
// READ WSPI Ranking
const readWSPI = (year, continentCode) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.readWSPI = readWSPI;
// IMPORT WSPI Ranking
const importWSPI = (wspi) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.prisma.wSPI.createMany({
        data: wspi,
    });
});
exports.importWSPI = importWSPI;
// UPDATE WSPI Ranking
const updateWSPI = (wspiList) => __awaiter(void 0, void 0, void 0, function* () {
    for (const wspi of wspiList) {
        const { year, rank, countryCode, wrcesPoints, cityPoints, proleaguePoints, points, change, } = wspi;
        const existingEntry = yield db_server_1.prisma.wSPI.findFirst({
            where: {
                year,
                countryCode,
            },
        });
        if (existingEntry) {
            return yield db_server_1.prisma.wSPI.update({
                where: {
                    id: existingEntry.id,
                },
                data: {
                    rank: rank,
                    wrcesPoints: wrcesPoints,
                    cityPoints: cityPoints,
                    proleaguePoints: proleaguePoints,
                    points: points,
                    change: change,
                },
            });
        }
    }
});
exports.updateWSPI = updateWSPI;
// DELETE WSPI Ranking
const deleteWSPI = (countryCode, year) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.prisma.wSPI.delete({
        where: {
            year_countryCode: {
                year,
                countryCode,
            },
        },
    });
});
exports.deleteWSPI = deleteWSPI;
//# sourceMappingURL=wspi.services.js.map