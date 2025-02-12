"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
var client_1 = require("@prisma/client");
// Initialize Prisma Client Instance
// If the instance already exists, return the existing instance
// Else create a new one and return it
var prisma;
if (!global.__prisma) {
    global.__prisma = new client_1.PrismaClient();
}
exports.prisma = prisma = global.__prisma;
//# sourceMappingURL=db.server.js.map