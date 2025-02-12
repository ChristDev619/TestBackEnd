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
exports.verifyToken = verifyToken;
const aws_jwt_verify_1 = require("aws-jwt-verify");
// Verifies the validity of the token based on its type
// Possible types: id, access
function verifyToken(token, tokenUse) {
    return __awaiter(this, void 0, void 0, function* () {
        if (token === undefined) {
            throw new Error(`${tokenUse} is undefined`);
        }
        const verifier = aws_jwt_verify_1.CognitoJwtVerifier.create({
            userPoolId: process.env.COGNITO_USER_POOL_ID,
            tokenUse: tokenUse,
            clientId: process.env.COGNITO_CLIENT_ID,
        });
        try {
            const payload = yield verifier.verify(token);
        }
        catch (_a) {
            throw new Error("Unauthorized");
        }
    });
}
//# sourceMappingURL=verifyToken.js.map