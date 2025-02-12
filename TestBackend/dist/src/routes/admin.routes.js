"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
// CONTROLLERS
const RankingController = __importStar(require("../controllers/ranking.controller"));
const DisciplineController = __importStar(require("../controllers/discipline.controller"));
const SportController = __importStar(require("../controllers/sport.controller"));
const CountryController = __importStar(require("../controllers/country.controller"));
const ContinentController = __importStar(require("../controllers/continent.controller"));
const UserController = __importStar(require("../controllers/user.controller"));
// MIDDLEWARE
const auth_middleware_1 = require("../middleware/auth.middleware");
// Initialize admin router
exports.adminRouter = (0, express_1.Router)();
// Auth Middleware
exports.adminRouter.use(auth_middleware_1.requireAuth);
// Multer file upload setup.
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
// Ranking Routes
exports.adminRouter.post("/rankings", upload.single("uploadRankingFile"), RankingController.addRankings);
exports.adminRouter.patch("/rankings", upload.single("updateRankingFile"), RankingController.modifyRankings);
exports.adminRouter.delete("/rankings", RankingController.removeOneRanking);
// Discipline Routes
exports.adminRouter.post("/disciplines", upload.single("uploadDisciplineFile"), DisciplineController.addDisciplines);
exports.adminRouter.patch("/disciplines", upload.single("updateDisciplineFile"), DisciplineController.modifyDisciplines);
exports.adminRouter.delete("/disciplines", DisciplineController.removeOneDiscipline);
// Sport Routes
exports.adminRouter.post("/sports", upload.single("uploadSportFile"), SportController.addSports);
exports.adminRouter.patch("/sports", upload.single("updateSportFile"), SportController.modifySport);
exports.adminRouter.delete("/sports", SportController.removeOneSport);
// Country Routes
exports.adminRouter.post("/countries", upload.single("uploadCountryFile"), CountryController.addCountries);
exports.adminRouter.patch("/countries", upload.single("updateCountryFile"), CountryController.modifyCountries);
exports.adminRouter.delete("/countries", CountryController.removeOneCountry);
// Continent Routes
exports.adminRouter.post("/continents", upload.single("uploadContinentFile"), ContinentController.addContinents);
exports.adminRouter.patch("/continents", upload.single("updateContinentFile"), ContinentController.modifyContinents);
exports.adminRouter.delete("/continents", ContinentController.removeOneContinent);
// User Routes
exports.adminRouter.get("/users", UserController.getUser);
exports.adminRouter.post("/users", UserController.addUser);
exports.adminRouter.patch("/users", UserController.modifyUser);
exports.adminRouter.delete("/users", UserController.removeUser);
//# sourceMappingURL=admin.routes.js.map