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
exports.deleteOneContinent = exports.updateContinents = exports.createContinent = exports.readContinents = void 0;
// DB INSTANCE
const db_server_1 = require("../config/db.server");
// READ Continents
const readContinents = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.prisma.continent.findMany({
        orderBy: [
            {
                code: "asc",
            },
        ],
    });
});
exports.readContinents = readContinents;
// CREATE Continent
const createContinent = (continents) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.prisma.continent.createMany({
        data: continents,
    });
});
exports.createContinent = createContinent;
// UPDATE Continent
const updateContinents = (continents) => __awaiter(void 0, void 0, void 0, function* () {
    for (const continent of continents) {
        const { code, name } = continent;
        const existingEntry = yield db_server_1.prisma.continent.findUnique({
            where: {
                code,
            },
        });
        if (existingEntry) {
            return yield db_server_1.prisma.continent.update({
                where: {
                    code,
                },
                data: {
                    code: code,
                    name: name,
                },
            });
        }
    }
});
exports.updateContinents = updateContinents;
// DELETE Continent by code
const deleteOneContinent = (code) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.prisma.continent.delete({
        where: {
            code,
        },
    });
});
exports.deleteOneContinent = deleteOneContinent;
//# sourceMappingURL=continent.services.js.map