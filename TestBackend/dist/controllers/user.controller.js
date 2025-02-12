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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUser = exports.modifyUser = exports.addUser = exports.getUser = void 0;
// SERVICES
var user_services_1 = require("../services/user.services");
// GET User
var getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.query.email;
                if (!email) {
                    return [2 /*return*/, res.status(400).json("Missing email")];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, user_services_1.readUser)(email)];
            case 2:
                user = _a.sent();
                return [2 /*return*/, res.status(200).json(user)];
            case 3:
                error_1 = _a.sent();
                if (error_1 instanceof Error) {
                    console.error(error_1.message);
                    return [2 /*return*/, res.status(500).json(error_1.message)];
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUser = getUser;
// ADD User
var addUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, emailOptIn, existingUser, newUser, createdUser, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                emailOptIn = true;
                if (!email) {
                    return [2 /*return*/, res.status(400).json("Missing email")];
                }
                return [4 /*yield*/, (0, user_services_1.readUser)(email)];
            case 1:
                existingUser = _a.sent();
                if (existingUser)
                    return [2 /*return*/, res.status(409).json("Email already in use")];
                newUser = {
                    email: email,
                    emailOptIn: emailOptIn,
                };
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, (0, user_services_1.createUser)(newUser)];
            case 3:
                createdUser = _a.sent();
                return [2 /*return*/, res.status(201).json(createdUser)];
            case 4:
                error_2 = _a.sent();
                if (error_2 instanceof Error) {
                    console.error(error_2.message);
                    return [2 /*return*/, res.status(500).json(error_2.message)];
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.addUser = addUser;
// MODIFY User
var modifyUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, emailOptIn, user, modifiedUser, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.query.email;
                emailOptIn = req.body.emailOptIn;
                if (!email) {
                    return [2 /*return*/, res.status(400).json("Missing user email")];
                }
                user = {
                    email: email,
                    emailOptIn: emailOptIn,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, user_services_1.updateUser)(user)];
            case 2:
                modifiedUser = _a.sent();
                return [2 /*return*/, res.status(201).json(modifiedUser)];
            case 3:
                error_3 = _a.sent();
                if (error_3 instanceof Error) {
                    console.error(error_3.message);
                    return [2 /*return*/, res.status(500).json(error_3.message)];
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.modifyUser = modifyUser;
// REMOVE User
var removeUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userEmail, deletedUser, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userEmail = req.query.email;
                if (!userEmail) {
                    return [2 /*return*/, res.status(400).json("Missing user email")];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, user_services_1.deleteUser)(userEmail)];
            case 2:
                deletedUser = _a.sent();
                return [2 /*return*/, res.status(202).json(deletedUser)];
            case 3:
                error_4 = _a.sent();
                if (error_4 instanceof Error) {
                    console.error(error_4.message);
                    return [2 /*return*/, res.status(500).json(error_4.message)];
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.removeUser = removeUser;
//# sourceMappingURL=user.controller.js.map