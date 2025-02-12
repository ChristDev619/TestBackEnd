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
exports.refreshTokenService = exports.respondToChallenge = exports.initiateAuth = void 0;
// Cognito
const client_cognito_identity_provider_1 = require("@aws-sdk/client-cognito-identity-provider");
// LIBS
const aws_client_1 = require("../libs/aws-client");
// Sends user details and clientId to Cognito
// Returns a JSON Web Token (jwt)
const initiateAuth = (email, password, clientId) => __awaiter(void 0, void 0, void 0, function* () {
    const command = new client_cognito_identity_provider_1.InitiateAuthCommand({
        AuthFlow: client_cognito_identity_provider_1.AuthFlowType.USER_PASSWORD_AUTH,
        AuthParameters: {
            USERNAME: email,
            PASSWORD: password,
        },
        ClientId: clientId,
    });
    // Get access token, id token, and refresh token from Cognito
    const token = aws_client_1.cognitoClient.send(command);
    return token;
});
exports.initiateAuth = initiateAuth;
// Respond to the "NEW_PASSWORD_REQUIRED" challeng
const respondToChallenge = (email, newPassword, clientId, session) => __awaiter(void 0, void 0, void 0, function* () {
    const command = new client_cognito_identity_provider_1.RespondToAuthChallengeCommand({
        ChallengeName: client_cognito_identity_provider_1.ChallengeNameType.NEW_PASSWORD_REQUIRED,
        ClientId: clientId,
        ChallengeResponses: {
            USERNAME: email,
            NEW_PASSWORD: newPassword,
        },
        Session: session,
    });
    const token = aws_client_1.cognitoClient.send(command);
    return token;
});
exports.respondToChallenge = respondToChallenge;
// // Refresh the Access Token
const refreshTokenService = (refreshToken, clientId) => __awaiter(void 0, void 0, void 0, function* () {
    const command = new client_cognito_identity_provider_1.InitiateAuthCommand({
        AuthFlow: client_cognito_identity_provider_1.AuthFlowType.REFRESH_TOKEN_AUTH,
        AuthParameters: {
            REFRESH_TOKEN: refreshToken,
        },
        ClientId: clientId,
    });
    // Get access token, id token, and refresh token from Cognito
    const token = aws_client_1.cognitoClient.send(command);
    return token;
});
exports.refreshTokenService = refreshTokenService;
//# sourceMappingURL=auth.services.js.map