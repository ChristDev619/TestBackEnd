"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
var express_1 = require("express");
// CONTROLLERS
var AuthController = require("../controllers/auth.controller");
// Initialize auth router
exports.authRouter = (0, express_1.Router)();
// Login Route
exports.authRouter.post("/login", AuthController.login);
exports.authRouter.post("/refresh", AuthController.refreshToken);
//# sourceMappingURL=auth.routes.js.map