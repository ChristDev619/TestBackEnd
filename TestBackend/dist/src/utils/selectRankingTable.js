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
exports.selectReadCountryStatsFunction = exports.selectDeleteRankingFunction = exports.selectUpdateRankingFunction = exports.selectImportRankingFunction = exports.selectReadRankingFunction = void 0;
// SERVICES
// WRCES Final
const wrcesFinal_services_1 = require("../services/wrcesFinal.services");
// WRCES Sport
const wrcesSport_services_1 = require("../services/wrcesSport.services");
// WRCES Merit
const wrcesMerit_services_1 = require("../services/wrcesMerit.services");
// WFCR
const wfcr_services_1 = require("../services/wfcr.services");
// WSPI
const wspi_services_1 = require("../services/wspi.services");
const country_services_1 = require("../services/country.services");
// READ Function Map
const readRankingFunctionMap = {
    "wrces_final": wrcesFinal_services_1.readWRCESFinal,
    "wrces_sport": wrcesSport_services_1.readWRCESSport,
    "wrces_merit": wrcesMerit_services_1.readWRCESMerit,
    "wspi": wspi_services_1.readWSPI,
    "wfcr": wfcr_services_1.readWFCR,
};
// IMPORT Function Map
const importRankingFunctionMap = {
    "wrces_final": wrcesFinal_services_1.importWRCESFinal,
    "wrces_sport": wrcesSport_services_1.importWRCESSport,
    "wrces_merit": wrcesMerit_services_1.importWRCESMerit,
    "wspi": wspi_services_1.importWSPI,
    "wfcr": wfcr_services_1.importWFCR,
};
// UPDATE Function Map
const updateRankingFunctionMap = {
    "wrces_final": wrcesFinal_services_1.updateWRCESFinal,
    "wrces_sport": wrcesSport_services_1.updateWRCESSport,
    "wrces_merit": wrcesMerit_services_1.updateWRCESMerit,
    "wspi": wspi_services_1.updateWSPI,
    "wfcr": wfcr_services_1.updateWFCR,
};
// DELETE Function Map
const deleteRankingFunctionMap = {
    "wrces_final": wrcesFinal_services_1.deleteWRCESFinal,
    "wrces_sport": wrcesSport_services_1.deleteWRCESSport,
    "wrces_merit": wrcesMerit_services_1.deleteWRCESMerit,
    "wspi": wspi_services_1.deleteWSPI,
    "wfcr": wfcr_services_1.deleteWFCR,
};
// Select READ Funcion
const selectReadRankingFunction = (rankingName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (readRankingFunctionMap.hasOwnProperty(rankingName)) {
            return readRankingFunctionMap[rankingName];
        }
        else {
            throw "Could not find the requested table.";
        }
    }
    catch (error) {
        throw error;
    }
});
exports.selectReadRankingFunction = selectReadRankingFunction;
// Select IMPORT Function
const selectImportRankingFunction = (rankingName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (importRankingFunctionMap.hasOwnProperty(rankingName)) {
            return importRankingFunctionMap[rankingName];
        }
        else {
            throw "Could not find the requested table.";
        }
    }
    catch (error) {
        throw error;
    }
});
exports.selectImportRankingFunction = selectImportRankingFunction;
// Select UPDATE Function
const selectUpdateRankingFunction = (rankingName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (updateRankingFunctionMap.hasOwnProperty(rankingName)) {
            return updateRankingFunctionMap[rankingName];
        }
        else {
            throw "Could not find the requested table.";
        }
    }
    catch (error) {
        throw error;
    }
});
exports.selectUpdateRankingFunction = selectUpdateRankingFunction;
// Select DELETE Function
const selectDeleteRankingFunction = (rankingName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (deleteRankingFunctionMap.hasOwnProperty(rankingName)) {
            return deleteRankingFunctionMap[rankingName];
        }
        else {
            throw "Could not find the requested table.";
        }
    }
    catch (error) {
        throw error;
    }
});
exports.selectDeleteRankingFunction = selectDeleteRankingFunction;
// READ Country Stats Function Map
const readCountryStatsFunctionMap = {
    "wrces_final": country_services_1.readCountryStatsWRCESFinal,
    "wrces_merit": country_services_1.readCountryStatsWRCESMerit,
    "wspi": country_services_1.readCountryStatsWSPI,
    "wfcr": country_services_1.readCountryStatsWFCR,
};
// Select READ Country Stats Function
const selectReadCountryStatsFunction = (rankingName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (readCountryStatsFunctionMap.hasOwnProperty(rankingName)) {
            return readCountryStatsFunctionMap[rankingName];
        }
        else {
            throw "Could not find the requested table.";
        }
    }
    catch (error) {
        throw error;
    }
});
exports.selectReadCountryStatsFunction = selectReadCountryStatsFunction;
//# sourceMappingURL=selectRankingTable.js.map