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
exports.removeUser = exports.modifyUser = exports.addUser = exports.getUser = void 0;
// SERVICES
const user_services_1 = require("../services/user.services");
// GET User
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    if (!email) {
        return res.status(400).json("Missing email");
    }
    try {
        const user = yield (0, user_services_1.readUser)(email);
        return res.status(200).json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return res.status(500).json(error.message);
        }
    }
});
exports.getUser = getUser;
// ADD User
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const emailOptIn = true;
    if (!email) {
        return res.status(400).json("Missing email");
    }
    const existingUser = yield (0, user_services_1.readUser)(email);
    if (existingUser)
        return res.status(409).json("Email already in use");
    const newUser = {
        email,
        emailOptIn,
    };
    try {
        const createdUser = yield (0, user_services_1.createUser)(newUser);
        return res.status(201).json(createdUser);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return res.status(500).json(error.message);
        }
    }
});
exports.addUser = addUser;
// MODIFY User
const modifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    const emailOptIn = req.body.emailOptIn;
    if (!email) {
        return res.status(400).json("Missing user email");
    }
    const user = {
        email,
        emailOptIn,
    };
    try {
        const modifiedUser = yield (0, user_services_1.updateUser)(user);
        return res.status(201).json(modifiedUser);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return res.status(500).json(error.message);
        }
    }
});
exports.modifyUser = modifyUser;
// REMOVE User
const removeUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.query.email;
    if (!userEmail) {
        return res.status(400).json("Missing user email");
    }
    try {
        const deletedUser = yield (0, user_services_1.deleteUser)(userEmail);
        return res.status(202).json(deletedUser);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return res.status(500).json(error.message);
        }
    }
});
exports.removeUser = removeUser;
//# sourceMappingURL=user.controller.js.map