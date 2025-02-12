"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sesClient = exports.cognitoClient = void 0;
var client_cognito_identity_provider_1 = require("@aws-sdk/client-cognito-identity-provider");
var client_ses_1 = require("@aws-sdk/client-ses");
var AWS_REGION = process.env.AWS_REGION;
var cognitoClient = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({
    region: AWS_REGION,
});
exports.cognitoClient = cognitoClient;
var sesClient = new client_ses_1.SESClient({
    region: AWS_REGION,
});
exports.sesClient = sesClient;
//# sourceMappingURL=aws-client.js.map