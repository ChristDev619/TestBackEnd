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
exports.requireAuth = void 0;
// Cognito
const client_cognito_identity_provider_1 = require("@aws-sdk/client-cognito-identity-provider");
// LIBS
const aws_client_1 = require("../libs/aws-client");
// UTILS
const verifyToken_1 = require("../utils/token/verifyToken");
// Authentication middleware for route access control
const requireAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Verify authentication
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "Auth token required." });
    }
    const accessToken = authorization.split(" ")[1];
    try {
        // Verify access token validity
        yield (0, verifyToken_1.verifyToken)(accessToken, "access");
        const command = new client_cognito_identity_provider_1.GetUserCommand({
            AccessToken: accessToken,
        });
        // Get the user from the Cognito user pool
        const user = aws_client_1.cognitoClient.send(command);
        req.user = user;
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(401).json({ error: error.message });
        }
    }
});
exports.requireAuth = requireAuth;
//# sourceMappingURL=auth.middleware.js.map