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
exports.deleteWRCESFinal = exports.updateWRCESFinal = exports.importWRCESFinal = exports.readWRCESFinal = void 0;
// DB Instance
const db_server_1 = require("../config/db.server");
// READ WRCES Final Ranking
const readWRCESFinal = (year, continentCode, limit) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.prisma.wRCESFinal.findMany({
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
        orderBy: [
            {
                year: "desc",
            },
            {
                rank: "asc",
            },
        ],
        take: limit ? limit : undefined,
    });
});
exports.readWRCESFinal = readWRCESFinal;
// IMPORT WRCES Final Ranking with Transaction
const importWRCESFinal = (wrcesFinal) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.prisma.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('Starting transaction to import WRCES Final Rankings.');
        // Step 1: Delete all existing records from the table
        console.log('Deleting all existing records from the wRCESFinal table.');
        yield prisma.wRCESFinal.deleteMany({});
        console.log('All existing records deleted.');
        // Step 2: Insert new records using createMany
        console.log('Inserting new records into the wRCESFinal table.');
        const result = yield prisma.wRCESFinal.createMany({
            data: wrcesFinal,
        });
        console.log('New records inserted successfully.');
        console.log('Transaction completed.');
        return result;
    }));
});
exports.importWRCESFinal = importWRCESFinal;
// UPDATE WRCES Final Ranking
const updateWRCESFinal = (wrcesFinalList) => __awaiter(void 0, void 0, void 0, function* () {
    for (const wrcesFinal of wrcesFinalList) {
        const { year, rank, countryCode, points, change } = wrcesFinal;
        const existingEntry = yield db_server_1.prisma.wRCESFinal.findFirst({
            where: {
                year,
                countryCode,
            },
        });
        if (existingEntry) {
            return yield db_server_1.prisma.wRCESFinal.update({
                where: {
                    id: existingEntry.id,
                },
                data: {
                    rank: rank,
                    points: points,
                    change: change,
                },
            });
        }
    }
});
exports.updateWRCESFinal = updateWRCESFinal;
// DELETE WRCES Final Ranking
const deleteWRCESFinal = (countryCode, year) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.prisma.wRCESFinal.delete({
        where: {
            year_countryCode: {
                year,
                countryCode,
            },
        },
    });
});
exports.deleteWRCESFinal = deleteWRCESFinal;
//# sourceMappingURL=wrcesFinal.services.js.map