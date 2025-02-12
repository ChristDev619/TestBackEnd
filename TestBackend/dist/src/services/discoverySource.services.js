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
exports.readDiscoverySources = void 0;
const db_server_1 = require("../config/db.server");
// READ discovery sources
const readDiscoverySources = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.prisma.discoverySource.findMany({
        orderBy: [
            {
                id: "asc",
            },
        ],
    });
});
exports.readDiscoverySources = readDiscoverySources;
//# sourceMappingURL=discoverySource.services.js.map