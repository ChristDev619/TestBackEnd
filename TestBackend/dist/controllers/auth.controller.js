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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.login = void 0;
// SERVICES
var auth_services_1 = require("../services/auth.services");
// UTILS
var verifyToken_1 = require("../utils/token/verifyToken");
var decodeToken_1 = require("../utils/token/decodeToken");
// Reads user details from req.body
// Assigns the clientId
// Returns a JSON Web Token (jwt) to the frontend after validation
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, clientId, token, _a, AccessToken, IdToken, RefreshToken, ExpiresIn, decodedIdTokenPayload, cognitoUser, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                email = req.body.email;
                password = req.body.password;
                // Validates that all fields are filled
                if (!email || !password) {
                    return [2 /*return*/, res.status(400).json("All fields are required")];
                }
                clientId = process.env.COGNITO_CLIENT_ID;
                // Check if Client ID is missing
                if (!clientId) {
                    return [2 /*return*/, res.status(400).json("Cognito Client ID not found")];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 7, , 8]);
                return [4 /*yield*/, (0, auth_services_1.initiateAuth)(email, password, clientId)];
            case 2:
                // JSON Web Token (jwt) is returned from loginService
                token = _b.sent();
                if (!(token.ChallengeName === "NEW_PASSWORD_REQUIRED")) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, auth_services_1.respondToChallenge)(email, password, clientId, token.Session)];
            case 3:
                token = _b.sent();
                _b.label = 4;
            case 4:
                _a = token.AuthenticationResult, AccessToken = _a.AccessToken, IdToken = _a.IdToken, RefreshToken = _a.RefreshToken, ExpiresIn = _a.ExpiresIn;
                //Verify the access token
                return [4 /*yield*/, (0, verifyToken_1.verifyToken)(AccessToken, "access")];
            case 5:
                //Verify the access token
                _b.sent();
                // Verify the id token
                return [4 /*yield*/, (0, verifyToken_1.verifyToken)(IdToken, "id")];
            case 6:
                // Verify the id token
                _b.sent();
                decodedIdTokenPayload = (0, decodeToken_1.decodeToken)(IdToken);
                cognitoUser = {
                    email: decodedIdTokenPayload.email,
                    role: decodedIdTokenPayload["custom:role"],
                };
                // Valid token return email and access token
                return [2 /*return*/, res.status(200).json({
                        cognitoUser: cognitoUser,
                        accessToken: AccessToken,
                        refreshToken: RefreshToken,
                        expiresIn: ExpiresIn,
                    })];
            case 7:
                error_1 = _b.sent();
                if (error_1 instanceof Error) {
                    console.error(error_1.message);
                    return [2 /*return*/, res.status(401).json(error_1.message)];
                }
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
// Refresh the Access Token
var refreshToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken_1, clientId, newTokens, _a, AccessToken, IdToken, ExpiresIn, decodedIdTokenPayload, cognitoUser, error_2;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                refreshToken_1 = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
                clientId = process.env.COGNITO_CLIENT_ID;
                // Check if refresh token is missing
                if (!refreshToken_1) {
                    return [2 /*return*/, res.status(401).json("Unauthorized")];
                }
                return [4 /*yield*/, (0, auth_services_1.refreshTokenService)(refreshToken_1, clientId)];
            case 1:
                newTokens = _c.sent();
                _a = newTokens.AuthenticationResult, AccessToken = _a.AccessToken, IdToken = _a.IdToken, ExpiresIn = _a.ExpiresIn;
                //Verify the access token
                return [4 /*yield*/, (0, verifyToken_1.verifyToken)(AccessToken, "access")];
            case 2:
                //Verify the access token
                _c.sent();
                // Verify the id token
                return [4 /*yield*/, (0, verifyToken_1.verifyToken)(IdToken, "id")];
            case 3:
                // Verify the id token
                _c.sent();
                decodedIdTokenPayload = (0, decodeToken_1.decodeToken)(IdToken);
                cognitoUser = {
                    email: decodedIdTokenPayload.email,
                    role: decodedIdTokenPayload["custom:role"],
                };
                return [2 /*return*/, res.status(200).json({
                        cognitoUser: cognitoUser,
                        accessToken: AccessToken,
                        expiresIn: ExpiresIn,
                    })];
            case 4:
                error_2 = _c.sent();
                if (error_2 instanceof Error) {
                    console.error(error_2.message);
                    return [2 /*return*/, res.status(401).json(error_2.message)];
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.refreshToken = refreshToken;
//# sourceMappingURL=auth.controller.js.map