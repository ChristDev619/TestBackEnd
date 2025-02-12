import { Router } from "express";

// CONTROLLERS
import * as AuthController from "../controllers/auth.controller";

// Initialize auth router
export const authRouter = Router();

// Login Route
authRouter.post("/login", AuthController.login);
authRouter.post("/refresh", AuthController.refreshToken);
