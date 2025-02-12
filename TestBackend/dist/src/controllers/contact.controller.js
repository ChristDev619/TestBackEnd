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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendContactMessage = void 0;
// SERVICES
const user_services_1 = require("../services/user.services");
const contact_services_1 = require("../services/contact.services");
const RECEIVING_EMAIL = (_a = process.env.CONTACT_EMAIL) !== null && _a !== void 0 ? _a : "";
const SOURCE_EMAIL = (_b = process.env.CONTACT_EMAIL) !== null && _b !== void 0 ? _b : "";
const sendContactMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, message, discoverySource } = req.body;
    const htmlBody = `<h2>Sender's email:</h2>
                    <p>${email}</h2>
                    <h2>Sender's phone:</h2>
                    <p>${phone}</p>
                    <h2>Sender's name:</h2>
                    <p>${name}</p>
                    <h2>Sender's message</h2>
                    <p>${message}</p>`;
    try {
        yield (0, user_services_1.updateUser)({ name, email, phone, discoverySource });
        const sendEmail = yield (0, contact_services_1.sendContanctMessageService)(htmlBody, name, RECEIVING_EMAIL, SOURCE_EMAIL);
        return res.status(200).json(sendEmail);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.sendContactMessage = sendContactMessage;
//# sourceMappingURL=contact.controller.js.map