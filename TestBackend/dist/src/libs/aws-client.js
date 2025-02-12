"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sesClient = exports.cognitoClient = void 0;
const client_cognito_identity_provider_1 = require("@aws-sdk/client-cognito-identity-provider");
const client_ses_1 = require("@aws-sdk/client-ses");
const { AWS_REGION } = process.env;
const cognitoClient = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({
    region: AWS_REGION,
});
exports.cognitoClient = cognitoClient;
const sesClient = new client_ses_1.SESClient({
    region: AWS_REGION,
});
exports.sesClient = sesClient;
//# sourceMappingURL=aws-client.js.map