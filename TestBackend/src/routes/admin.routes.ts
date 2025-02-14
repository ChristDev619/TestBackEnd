import { Router } from "express";
import multer from "multer";

// CONTROLLERS
import * as RankingController from "../controllers/ranking.controller";
import * as DisciplineController from "../controllers/discipline.controller";
import * as SportController from "../controllers/sport.controller";
import * as CountryController from "../controllers/country.controller";
import * as ContinentController from "../controllers/continent.controller";
import * as UserController from "../controllers/user.controller";

// MIDDLEWARE
import { requireAuth } from "../middleware/auth.middleware";

// Initialize admin router
export const adminRouter = Router();

// Auth Middleware
adminRouter.use(requireAuth);

// Multer file upload setup.
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Ranking Routes
adminRouter.post(
  "/rankings",
  upload.single("uploadRankingFile"),
  RankingController.addRankings
);
adminRouter.patch(
  "/rankings",
  upload.single("updateRankingFile"),
  RankingController.modifyRankings
);
adminRouter.delete("/rankings", RankingController.removeOneRanking);

// Discipline Routes
adminRouter.post(
  "/disciplines",
  upload.single("uploadDisciplineFile"),
  DisciplineController.addDisciplines
);
adminRouter.patch(
  "/disciplines",
  upload.single("updateDisciplineFile"),
  DisciplineController.modifyDisciplines
);
adminRouter.delete("/disciplines", DisciplineController.removeOneDiscipline);

// Sport Routes
adminRouter.post(
  "/sports",
  upload.single("uploadSportFile"),
  SportController.addSports
);
adminRouter.patch(
  "/sports",
  upload.single("updateSportFile"),
  SportController.modifySport
);
adminRouter.delete("/sports", SportController.removeOneSport);

// Country Routes
adminRouter.post(
  "/countries",
  upload.single("uploadCountryFile"),
  CountryController.addCountries
);
adminRouter.patch(
  "/countries",
  upload.single("updateCountryFile"),
  CountryController.modifyCountries
);
adminRouter.patch(
  "/countries/:code", // ✅ Route for updating a single country
  CountryController.modifyOneCountry
);
adminRouter.delete("/countries", CountryController.removeOneCountry);
// Continent Routes
adminRouter.post(
  "/continents",
  upload.single("uploadContinentFile"),
  ContinentController.addContinents
);
adminRouter.patch(
  "/continents",
  upload.single("updateContinentFile"),
  ContinentController.modifyContinents
);
adminRouter.delete("/continents", ContinentController.removeOneContinent);

// User Routes
adminRouter.get("/users", UserController.getUser);
adminRouter.post("/users", UserController.addUser);
adminRouter.patch("/users", UserController.modifyUser);
adminRouter.delete("/users", UserController.removeUser);
