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
exports.deleteOneSport = exports.updateSports = exports.createSports = exports.readSports = void 0;
// DB Instance
const db_server_1 = require("../config/db.server");
// READ Sports
const readSports = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.prisma.sport.findMany({
        orderBy: [
            {
                name: "asc",
            },
        ],
    });
});
exports.readSports = readSports;
// CREATE Sports
const createSports = (sport) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.prisma.sport.createMany({
        data: sport,
    });
});
exports.createSports = createSports;
// UPDATE Sports
const updateSports = (sports) => __awaiter(void 0, void 0, void 0, function* () {
    for (const sport of sports) {
        const { name, coefficient } = sport;
        const existingEntry = yield db_server_1.prisma.sport.findUnique({
            where: {
                name,
            },
        });
        if (existingEntry) {
            return yield db_server_1.prisma.sport.update({
                where: {
                    id: existingEntry.id,
                },
                data: {
                    coefficient: coefficient,
                },
            });
        }
    }
});
exports.updateSports = updateSports;
// DELETE Sport
const deleteOneSport = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.prisma.sport.delete({
        where: {
            name,
        },
    });
});
exports.deleteOneSport = deleteOneSport;
//# sourceMappingURL=sport.services.js.map