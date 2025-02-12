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
exports.deleteWRCESSport = exports.updateWRCESSport = exports.importWRCESSport = exports.readWRCESSport = void 0;
// DB Instance
const db_server_1 = require("../config/db.server");
const readWRCESSport = (year, sportName) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.prisma.wRCESSport.findMany({
        orderBy: [
            {
                year: "desc",
            },
            {
                sportName: "asc",
            },
            {
                rank: "asc",
            },
        ],
        select: {
            sportName: true,
            rank: true,
            year: true,
            countryCode: true,
            points: true,
            change: true,
        },
        where: {
            year,
            sportName,
        },
    });
});
exports.readWRCESSport = readWRCESSport;
// IMPORT WRCES Sport Ranking
const importWRCESSport = (wrcesSport) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.prisma.wRCESSport.createMany({
        data: wrcesSport,
    });
});
exports.importWRCESSport = importWRCESSport;
// UPDATE WRCES Sport Ranking
const updateWRCESSport = (wrcesSportList) => __awaiter(void 0, void 0, void 0, function* () {
    for (const wrcesSport of wrcesSportList) {
        const { year, rank, countryCode, points, sportName, change } = wrcesSport;
        const existingEntry = yield db_server_1.prisma.wRCESSport.findFirst({
            where: {
                year,
                countryCode,
            },
        });
        if (!existingEntry)
            return;
        return yield db_server_1.prisma.wRCESSport.update({
            where: {
                id: existingEntry.id,
            },
            data: {
                rank: rank,
                points: points,
                sportName: sportName,
                change: change,
            },
        });
    }
});
exports.updateWRCESSport = updateWRCESSport;
// DELETE WRCES Sport Ranking
const deleteWRCESSport = (countryCode, year, sportName) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.prisma.wRCESSport.delete({
        where: {
            year_countryCode_sportName: {
                year,
                countryCode,
                sportName,
            },
        },
    });
});
exports.deleteWRCESSport = deleteWRCESSport;
//# sourceMappingURL=wrcesSport.services.js.map