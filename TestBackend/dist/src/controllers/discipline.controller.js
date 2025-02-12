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
exports.removeOneDiscipline = exports.modifyDisciplines = exports.addDisciplines = exports.getDiscplines = void 0;
// DB SERVICE FUNCTIONS
const discipline_services_1 = require("../services/discipline.services");
// UTILS
const CSVToJSON_1 = require("../utils/CSVToJSON");
// GET Disciplines
const getDiscplines = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const disciplines = yield (0, discipline_services_1.readDisciplines)();
        if (!disciplines) {
            return res.status(404).json("Could not find the disciplines.");
        }
        return res.status(200).json(disciplines);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return res.status(500).json(error.message);
        }
    }
});
exports.getDiscplines = getDiscplines;
// POST Disciplines read from CSV file
const addDisciplines = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file || !req.file.buffer)
        return res.status(400).json("No file was provided.");
    const disciplineUploadCSVFileBuffer = req.file.buffer;
    try {
        const disciplineJSON = (yield (0, CSVToJSON_1.CSVToJSON)(disciplineUploadCSVFileBuffer, "discipline"));
        if (!disciplineJSON) {
            return res
                .status(400)
                .json("Could not read the data provided. Make sure you are using a CSV file.");
        }
        const disciplines = yield (0, discipline_services_1.createDisciplines)(disciplineJSON);
        return res.status(201).json(disciplines);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return res.status(500).json(error.message);
        }
    }
});
exports.addDisciplines = addDisciplines;
// PATCH Disciplines read from CSV file
const modifyDisciplines = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file || !req.file.buffer)
        return res.status(400).json("No file was provided.");
    const discpiplineUpdateCSVFileBuffer = req.file.buffer;
    try {
        const disciplineJSON = (yield (0, CSVToJSON_1.CSVToJSON)(discpiplineUpdateCSVFileBuffer, "discipline"));
        if (!disciplineJSON) {
            return res
                .status(400)
                .json("Could not read the data provided. Make sure you are using a CSV file.");
        }
        const disciplines = yield (0, discipline_services_1.updateDisciplines)(disciplineJSON);
        return res.status(201).json(disciplines);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return res.status(500).json(error.message);
        }
    }
});
exports.modifyDisciplines = modifyDisciplines;
// DELETE Discipline by name
const removeOneDiscipline = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const disciplineName = req.query.discipline;
    if (!disciplineName || typeof disciplineName !== "string")
        return res.status(400).json("Invalid or missing discipline.");
    try {
        const discipline = yield (0, discipline_services_1.deleteOneDiscipline)(disciplineName);
        return res.status(202).json(discipline);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return res.status(500).json(error.message);
        }
    }
});
exports.removeOneDiscipline = removeOneDiscipline;
//# sourceMappingURL=discipline.controller.js.map