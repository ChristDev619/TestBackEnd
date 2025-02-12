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
exports.deleteOneDiscipline = exports.updateDisciplines = exports.createDisciplines = exports.readDisciplines = void 0;
// DB Instance
const db_server_1 = require("../config/db.server");
// READ Disciplines
const readDisciplines = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.prisma.discipline.findMany({
        orderBy: [
            {
                name: "asc",
            },
        ],
    });
});
exports.readDisciplines = readDisciplines;
// CREATE Disciplines
const createDisciplines = (disciplines) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.prisma.discipline.createMany({
        data: disciplines,
    });
});
exports.createDisciplines = createDisciplines;
// UPDATE Disciplines
const updateDisciplines = (disciplines) => __awaiter(void 0, void 0, void 0, function* () {
    for (const discipline of disciplines) {
        const { name, coeff, coefficientMen, coefficientWomen } = discipline;
        const existingEntry = yield db_server_1.prisma.discipline.findUnique({
            where: {
                name,
            },
        });
        if (existingEntry) {
            return yield db_server_1.prisma.discipline.update({
                where: {
                    id: existingEntry.id,
                },
                data: {
                    coeff: coeff,
                    coefficientMen: coefficientMen,
                    coefficientWomen: coefficientWomen,
                },
            });
        }
    }
});
exports.updateDisciplines = updateDisciplines;
// DELETE Discipline by name
const deleteOneDiscipline = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.prisma.discipline.delete({
        where: {
            name,
        },
    });
});
exports.deleteOneDiscipline = deleteOneDiscipline;
//# sourceMappingURL=discipline.services.js.map