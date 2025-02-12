"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = decodeToken;
var jwt_decode_1 = require("jwt-decode");
// Decode the JWT encoded token and return the payload
function decodeToken(token) {
    if (token === undefined) {
        throw new Error("Error decoding token: Token is undefined");
    }
    var decodedToken = (0, jwt_decode_1.default)(token);
    return decodedToken;
}
//# sourceMappingURL=decodeToken.js.map