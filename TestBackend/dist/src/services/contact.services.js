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
exports.sendContanctMessageService = void 0;
const aws_client_1 = require("../libs/aws-client");
const client_ses_1 = require("@aws-sdk/client-ses");
const sendContanctMessageService = (htmlBody, sendersName, RECEIVING_EMAIL, SOURCE_EMAIL) => __awaiter(void 0, void 0, void 0, function* () {
    const sendEmailCommand = new client_ses_1.SendEmailCommand({
        Destination: {
            ToAddresses: [RECEIVING_EMAIL],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: htmlBody,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: `Contact Form Message from ${sendersName}`,
            },
        },
        Source: SOURCE_EMAIL,
    });
    const sendEmail = yield aws_client_1.sesClient.send(sendEmailCommand);
    return sendEmail;
});
exports.sendContanctMessageService = sendContanctMessageService;
//# sourceMappingURL=contact.services.js.map