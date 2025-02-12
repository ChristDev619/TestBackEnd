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
exports.getDiscoverySources = void 0;
// SERVICES
const discoverySource_services_1 = require("../services/discoverySource.services");
const getDiscoverySources = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const discoverySources = yield (0, discoverySource_services_1.readDiscoverySources)();
        return res.status(200).json(discoverySources);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return res.status(500).json(error);
        }
    }
});
exports.getDiscoverySources = getDiscoverySources;
//# sourceMappingURL=discoverySource.controller.js.map