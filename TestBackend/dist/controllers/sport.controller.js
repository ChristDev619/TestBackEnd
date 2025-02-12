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
exports.removeOneSport = exports.modifySport = exports.addSports = exports.getSports = void 0;
// DB SERVICES
var sport_services_1 = require("../services/sport.services");
// UTILS
var CSVToJSON_1 = require("../utils/CSVToJSON");
// GET Sports
var getSports = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sports, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, sport_services_1.readSports)()];
            case 1:
                sports = _a.sent();
                if (!sports) {
                    return [2 /*return*/, res.status(404).json("Could not find the requested sports.")];
                }
                return [2 /*return*/, res.status(200).json(sports)];
            case 2:
                error_1 = _a.sent();
                if (error_1 instanceof Error) {
                    console.error(error_1.message);
                    return [2 /*return*/, res.status(500).json(error_1.message)];
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getSports = getSports;
// CREATE Sports
var addSports = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sportsUploadCSVFileBuffer, sportsJSON, sports, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.file || !req.file.buffer)
                    return [2 /*return*/, res.status(400).json("No file was provided")];
                sportsUploadCSVFileBuffer = req.file.buffer;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, (0, CSVToJSON_1.CSVToJSON)(sportsUploadCSVFileBuffer, "sport")];
            case 2:
                sportsJSON = (_a.sent());
                if (!sportsJSON) {
                    return [2 /*return*/, res
                            .status(400)
                            .json("Could not read the data provided. Make sure you are using a CSV file.")];
                }
                return [4 /*yield*/, (0, sport_services_1.createSports)(sportsJSON)];
            case 3:
                sports = _a.sent();
                return [2 /*return*/, res.status(201).json(sports)];
            case 4:
                error_2 = _a.sent();
                if (error_2 instanceof Error) {
                    console.error(error_2.message);
                    return [2 /*return*/, res.status(500).json(error_2.message)];
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.addSports = addSports;
// UPDATE Sports
var modifySport = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sportsUpdateCSVFileBuffer, sportsJSON, sports, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.file || !req.file.buffer)
                    return [2 /*return*/, res.status(400).json("No file was provided")];
                sportsUpdateCSVFileBuffer = req.file.buffer;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, (0, CSVToJSON_1.CSVToJSON)(sportsUpdateCSVFileBuffer, "sport")];
            case 2:
                sportsJSON = (_a.sent());
                if (!sportsJSON) {
                    return [2 /*return*/, res
                            .status(400)
                            .json("Could not read the data provided. Make sure you are using a CSV file.")];
                }
                return [4 /*yield*/, (0, sport_services_1.updateSports)(sportsJSON)];
            case 3:
                sports = _a.sent();
                return [2 /*return*/, res.status(201).json(sports)];
            case 4:
                error_3 = _a.sent();
                if (error_3 instanceof Error) {
                    console.error(error_3.message);
                    return [2 /*return*/, res.status(500).json(error_3.message)];
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.modifySport = modifySport;
// DELETE a Sport by name
var removeOneSport = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sportName, sport, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sportName = req.query.sport;
                if (!sportName || typeof sportName !== "string")
                    return [2 /*return*/, res.status(400).json("Invalid or missing sport name.")];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, sport_services_1.deleteOneSport)(sportName.toUpperCase())];
            case 2:
                sport = _a.sent();
                return [2 /*return*/, res.status(202).json(sport)];
            case 3:
                error_4 = _a.sent();
                if (error_4 instanceof Error) {
                    console.error(error_4.message);
                    return [2 /*return*/, res.status(500).json(error_4.message)];
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.removeOneSport = removeOneSport;
//# sourceMappingURL=sport.controller.js.map