import { Router } from "express";

// CONTROLLERS
import * as RankingController from "../controllers/ranking.controller";
import * as DisciplineController from "../controllers/discipline.controller";
import * as SportController from "../controllers/sport.controller";
import * as CountryController from "../controllers/country.controller";
import * as ContinentController from "../controllers/continent.controller";
import * as UserController from "../controllers/user.controller";
import * as ContactController from "../controllers/contact.controller";
import * as YearController from "../controllers/year.controller";
import * as DiscoverySourceController from "../controllers/discoverySource.controller";

// Initialize base router
export const baseRouter = Router();

// GET Rankings
baseRouter.get("/rankings", RankingController.getRankings);

// GET Disciplines
baseRouter.get("/disciplines", DisciplineController.getDiscplines);

// GET Sports
baseRouter.get("/sports", SportController.getSports);

// GET Countries
baseRouter.get("/countries", CountryController.getCountries);
baseRouter.get(
  "/countries/:country/country_stats",
  CountryController.getCountryStats
);

// GET Continents
baseRouter.get("/continents", ContinentController.getContinents);

// GET Users
baseRouter.get("/users", UserController.getUser);
baseRouter.post("/users", UserController.addUser);

// POST Contact
baseRouter.post("/contact", ContactController.sendContactMessage);

// GET Years
baseRouter.get("/years", YearController.getYears);

// GET Discovery Sources
baseRouter.get(
  "/discovery-sources",
  DiscoverySourceController.getDiscoverySources
);
