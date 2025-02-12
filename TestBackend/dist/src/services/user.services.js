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
exports.deleteUser = exports.updateUser = exports.createUser = exports.readUser = void 0;
// DB Instance
const db_server_1 = require("../config/db.server");
// READ User
const readUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.prisma.user.findUnique({
        where: {
            email,
        },
    });
});
exports.readUser = readUser;
// CREATE User
const createUser = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.prisma.user.create({
        data: {
            email: newUser.email,
            isEmployee: false,
            name: newUser.name ? newUser.name : null,
            phone: newUser.phone ? newUser.phone : null,
            discoverySource: newUser.discoverySource ? newUser.discoverySource : null,
            emailOptIn: newUser.emailOptIn ? newUser.emailOptIn : false,
        },
    });
});
exports.createUser = createUser;
// UPDATE User
const updateUser = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    const existingEntry = yield db_server_1.prisma.user.findUnique({
        where: {
            email: newUser.email,
        },
    });
    if (existingEntry) {
        return yield db_server_1.prisma.user.update({
            where: {
                email: existingEntry.email,
            },
            data: {
                name: newUser.name ? newUser.name : existingEntry.name,
                phone: newUser.phone ? newUser.phone : existingEntry.phone,
                discoverySource: newUser.discoverySource
                    ? newUser.discoverySource
                    : existingEntry.discoverySource,
            },
        });
    }
    else {
        return yield (0, exports.createUser)(newUser);
    }
});
exports.updateUser = updateUser;
// DELETE User
const deleteUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.prisma.user.delete({
        where: {
            email,
        },
    });
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.services.js.map