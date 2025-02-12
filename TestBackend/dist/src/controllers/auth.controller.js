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
exports.refreshToken = exports.login = void 0;
// SERVICES
const auth_services_1 = require("../services/auth.services");
// UTILS
const verifyToken_1 = require("../utils/token/verifyToken");
const decodeToken_1 = require("../utils/token/decodeToken");
// Reads user details from req.body
// Assigns the clientId
// Returns a JSON Web Token (jwt) to the frontend after validation
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    // Validates that all fields are filled
    if (!email || !password) {
        return res.status(400).json("All fields are required");
    }
    const clientId = process.env.COGNITO_CLIENT_ID;
    // Check if Client ID is missing
    if (!clientId) {
        return res.status(400).json("Cognito Client ID not found");
    }
    // Stores token returned from Cognito
    let token;
    try {
        // JSON Web Token (jwt) is returned from loginService
        token = yield (0, auth_services_1.initiateAuth)(email, password, clientId);
        // Required during first-time login
        // Satisfies the "NEW_PASSOWRD_REQUIRED" auth challenge
        if (token.ChallengeName === "NEW_PASSWORD_REQUIRED") {
            token = yield (0, auth_services_1.respondToChallenge)(email, password, clientId, token.Session);
        }
        const { AccessToken, IdToken, RefreshToken, ExpiresIn } = token.AuthenticationResult;
        //Verify the access token
        yield (0, verifyToken_1.verifyToken)(AccessToken, "access");
        // Verify the id token
        yield (0, verifyToken_1.verifyToken)(IdToken, "id");
        const decodedIdTokenPayload = (0, decodeToken_1.decodeToken)(IdToken);
        // Create user object sent to the client
        const cognitoUser = {
            email: decodedIdTokenPayload.email,
            role: decodedIdTokenPayload["custom:role"],
        };
        // Valid token return email and access token
        return res.status(200).json({
            cognitoUser,
            accessToken: AccessToken,
            refreshToken: RefreshToken,
            expiresIn: ExpiresIn,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return res.status(401).json(error.message);
        }
    }
});
exports.login = login;
// Refresh the Access Token
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const refreshToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        const clientId = process.env.COGNITO_CLIENT_ID;
        // Check if refresh token is missing
        if (!refreshToken) {
            return res.status(401).json("Unauthorized");
        }
        const newTokens = yield (0, auth_services_1.refreshTokenService)(refreshToken, clientId);
        const { AccessToken, IdToken, ExpiresIn } = newTokens.AuthenticationResult;
        //Verify the access token
        yield (0, verifyToken_1.verifyToken)(AccessToken, "access");
        // Verify the id token
        yield (0, verifyToken_1.verifyToken)(IdToken, "id");
        const decodedIdTokenPayload = (0, decodeToken_1.decodeToken)(IdToken);
        // Create user object sent to the client
        const cognitoUser = {
            email: decodedIdTokenPayload.email,
            role: decodedIdTokenPayload["custom:role"],
        };
        return res.status(200).json({
            cognitoUser,
            accessToken: AccessToken,
            expiresIn: ExpiresIn,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return res.status(401).json(error.message);
        }
    }
});
exports.refreshToken = refreshToken;
//# sourceMappingURL=auth.controller.js.map