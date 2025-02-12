"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = decodeToken;
const jwt_decode_1 = __importDefault(require("jwt-decode"));
// Decode the JWT encoded token and return the payload
function decodeToken(token) {
    if (token === undefined) {
        throw new Error("Error decoding token: Token is undefined");
    }
    const decodedToken = (0, jwt_decode_1.default)(token);
    return decodedToken;
}
//# sourceMappingURL=decodeToken.js.map