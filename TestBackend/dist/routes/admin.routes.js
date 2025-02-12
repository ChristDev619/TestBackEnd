"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
var express_1 = require("express");
var multer_1 = require("multer");
// CONTROLLERS
var RankingController = require("../controllers/ranking.controller");
var DisciplineController = require("../controllers/discipline.controller");
var SportController = require("../controllers/sport.controller");
var CountryController = require("../controllers/country.controller");
var ContinentController = require("../controllers/continent.controller");
var UserController = require("../controllers/user.controller");
// MIDDLEWARE
var auth_middleware_1 = require("../middleware/auth.middleware");
// Initialize admin router
exports.adminRouter = (0, express_1.Router)();
// Auth Middleware
exports.adminRouter.use(auth_middleware_1.requireAuth);
// Multer file upload setup.
var storage = multer_1.default.memoryStorage();
var upload = (0, multer_1.default)({ storage: storage });
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