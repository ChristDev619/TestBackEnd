"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseRouter = void 0;
var express_1 = require("express");
// CONTROLLERS
var RankingController = require("../controllers/ranking.controller");
var DisciplineController = require("../controllers/discipline.controller");
var SportController = require("../controllers/sport.controller");
var CountryController = require("../controllers/country.controller");
var ContinentController = require("../controllers/continent.controller");
var UserController = require("../controllers/user.controller");
var ContactController = require("../controllers/contact.controller");
var YearController = require("../controllers/year.controller");
var DiscoverySourceController = require("../controllers/discoverySource.controller");
// Initialize base router
exports.baseRouter = (0, express_1.Router)();
// GET Rankings
exports.baseRouter.get("/rankings", RankingController.getRankings);
// GET Disciplines
exports.baseRouter.get("/disciplines", DisciplineController.getDiscplines);
// GET Sports
exports.baseRouter.get("/sports", SportController.getSports);
// GET Countries
exports.baseRouter.get("/countries", CountryController.getCountries);
exports.baseRouter.get("/countries/:country/country_stats", CountryController.getCountryStats);
// GET Continents
exports.baseRouter.get("/continents", ContinentController.getContinents);
// GET Users
exports.baseRouter.get("/users", UserController.getUser);
exports.baseRouter.post("/users", UserController.addUser);
// POST Contact
exports.baseRouter.post("/contact", ContactController.sendContactMessage);
// GET Years
exports.baseRouter.get("/years", YearController.getYears);
// GET Discovery Sources
exports.baseRouter.get("/discovery-sources", DiscoverySourceController.getDiscoverySources);
//# sourceMappingURL=base.routes.js.map