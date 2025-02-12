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
exports.deleteWRCESFinal = exports.updateWRCESFinal = exports.importWRCESFinal = exports.readWRCESFinal = void 0;
// DB Instance
var db_server_1 = require("../config/db.server");
// READ WRCES Final Ranking
var readWRCESFinal = function (year, continentCode, limit) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_server_1.prisma.wRCESFinal.findMany({
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
                            continentCode: continentCode,
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
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.readWRCESFinal = readWRCESFinal;
// IMPORT WRCES Final Ranking with Transaction
var importWRCESFinal = function (wrcesFinal) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_server_1.prisma.$transaction(function (prisma) { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log('Starting transaction to import WRCES Final Rankings.');
                                // Step 1: Delete all existing records from the table
                                console.log('Deleting all existing records from the wRCESFinal table.');
                                return [4 /*yield*/, prisma.wRCESFinal.deleteMany({})];
                            case 1:
                                _a.sent();
                                console.log('All existing records deleted.');
                                // Step 2: Insert new records using createMany
                                console.log('Inserting new records into the wRCESFinal table.');
                                return [4 /*yield*/, prisma.wRCESFinal.createMany({
                                        data: wrcesFinal,
                                    })];
                            case 2:
                                result = _a.sent();
                                console.log('New records inserted successfully.');
                                console.log('Transaction completed.');
                                return [2 /*return*/, result];
                        }
                    });
                }); })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.importWRCESFinal = importWRCESFinal;
// UPDATE WRCES Final Ranking
var updateWRCESFinal = function (wrcesFinalList) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, wrcesFinalList_1, wrcesFinal, year, rank, countryCode, points, change, existingEntry;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _i = 0, wrcesFinalList_1 = wrcesFinalList;
                _a.label = 1;
            case 1:
                if (!(_i < wrcesFinalList_1.length)) return [3 /*break*/, 5];
                wrcesFinal = wrcesFinalList_1[_i];
                year = wrcesFinal.year, rank = wrcesFinal.rank, countryCode = wrcesFinal.countryCode, points = wrcesFinal.points, change = wrcesFinal.change;
                return [4 /*yield*/, db_server_1.prisma.wRCESFinal.findFirst({
                        where: {
                            year: year,
                            countryCode: countryCode,
                        },
                    })];
            case 2:
                existingEntry = _a.sent();
                if (!existingEntry) return [3 /*break*/, 4];
                return [4 /*yield*/, db_server_1.prisma.wRCESFinal.update({
                        where: {
                            id: existingEntry.id,
                        },
                        data: {
                            rank: rank,
                            points: points,
                            change: change,
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
exports.updateWRCESFinal = updateWRCESFinal;
// DELETE WRCES Final Ranking
var deleteWRCESFinal = function (countryCode, year) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_server_1.prisma.wRCESFinal.delete({
                    where: {
                        year_countryCode: {
                            year: year,
                            countryCode: countryCode,
                        },
                    },
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.deleteWRCESFinal = deleteWRCESFinal;
//# sourceMappingURL=wrcesFinal.services.js.map