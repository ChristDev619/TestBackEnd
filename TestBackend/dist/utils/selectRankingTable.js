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
exports.selectReadCountryStatsFunction = exports.selectDeleteRankingFunction = exports.selectUpdateRankingFunction = exports.selectImportRankingFunction = exports.selectReadRankingFunction = void 0;
// SERVICES
// WRCES Final
var wrcesFinal_services_1 = require("../services/wrcesFinal.services");
// WRCES Sport
var wrcesSport_services_1 = require("../services/wrcesSport.services");
// WRCES Merit
var wrcesMerit_services_1 = require("../services/wrcesMerit.services");
// WFCR
var wfcr_services_1 = require("../services/wfcr.services");
// WSPI
var wspi_services_1 = require("../services/wspi.services");
var country_services_1 = require("../services/country.services");
// READ Function Map
var readRankingFunctionMap = {
    "wrces_final": wrcesFinal_services_1.readWRCESFinal,
    "wrces_sport": wrcesSport_services_1.readWRCESSport,
    "wrces_merit": wrcesMerit_services_1.readWRCESMerit,
    "wspi": wspi_services_1.readWSPI,
    "wfcr": wfcr_services_1.readWFCR,
};
// IMPORT Function Map
var importRankingFunctionMap = {
    "wrces_final": wrcesFinal_services_1.importWRCESFinal,
    "wrces_sport": wrcesSport_services_1.importWRCESSport,
    "wrces_merit": wrcesMerit_services_1.importWRCESMerit,
    "wspi": wspi_services_1.importWSPI,
    "wfcr": wfcr_services_1.importWFCR,
};
// UPDATE Function Map
var updateRankingFunctionMap = {
    "wrces_final": wrcesFinal_services_1.updateWRCESFinal,
    "wrces_sport": wrcesSport_services_1.updateWRCESSport,
    "wrces_merit": wrcesMerit_services_1.updateWRCESMerit,
    "wspi": wspi_services_1.updateWSPI,
    "wfcr": wfcr_services_1.updateWFCR,
};
// DELETE Function Map
var deleteRankingFunctionMap = {
    "wrces_final": wrcesFinal_services_1.deleteWRCESFinal,
    "wrces_sport": wrcesSport_services_1.deleteWRCESSport,
    "wrces_merit": wrcesMerit_services_1.deleteWRCESMerit,
    "wspi": wspi_services_1.deleteWSPI,
    "wfcr": wfcr_services_1.deleteWFCR,
};
// Select READ Funcion
var selectReadRankingFunction = function (rankingName) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            if (readRankingFunctionMap.hasOwnProperty(rankingName)) {
                return [2 /*return*/, readRankingFunctionMap[rankingName]];
            }
            else {
                throw "Could not find the requested table.";
            }
        }
        catch (error) {
            throw error;
        }
        return [2 /*return*/];
    });
}); };
exports.selectReadRankingFunction = selectReadRankingFunction;
// Select IMPORT Function
var selectImportRankingFunction = function (rankingName) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            if (importRankingFunctionMap.hasOwnProperty(rankingName)) {
                return [2 /*return*/, importRankingFunctionMap[rankingName]];
            }
            else {
                throw "Could not find the requested table.";
            }
        }
        catch (error) {
            throw error;
        }
        return [2 /*return*/];
    });
}); };
exports.selectImportRankingFunction = selectImportRankingFunction;
// Select UPDATE Function
var selectUpdateRankingFunction = function (rankingName) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            if (updateRankingFunctionMap.hasOwnProperty(rankingName)) {
                return [2 /*return*/, updateRankingFunctionMap[rankingName]];
            }
            else {
                throw "Could not find the requested table.";
            }
        }
        catch (error) {
            throw error;
        }
        return [2 /*return*/];
    });
}); };
exports.selectUpdateRankingFunction = selectUpdateRankingFunction;
// Select DELETE Function
var selectDeleteRankingFunction = function (rankingName) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            if (deleteRankingFunctionMap.hasOwnProperty(rankingName)) {
                return [2 /*return*/, deleteRankingFunctionMap[rankingName]];
            }
            else {
                throw "Could not find the requested table.";
            }
        }
        catch (error) {
            throw error;
        }
        return [2 /*return*/];
    });
}); };
exports.selectDeleteRankingFunction = selectDeleteRankingFunction;
// READ Country Stats Function Map
var readCountryStatsFunctionMap = {
    "wrces_final": country_services_1.readCountryStatsWRCESFinal,
    "wrces_merit": country_services_1.readCountryStatsWRCESMerit,
    "wspi": country_services_1.readCountryStatsWSPI,
    "wfcr": country_services_1.readCountryStatsWFCR,
};
// Select READ Country Stats Function
var selectReadCountryStatsFunction = function (rankingName) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            if (readCountryStatsFunctionMap.hasOwnProperty(rankingName)) {
                return [2 /*return*/, readCountryStatsFunctionMap[rankingName]];
            }
            else {
                throw "Could not find the requested table.";
            }
        }
        catch (error) {
            throw error;
        }
        return [2 /*return*/];
    });
}); };
exports.selectReadCountryStatsFunction = selectReadCountryStatsFunction;
//# sourceMappingURL=selectRankingTable.js.map