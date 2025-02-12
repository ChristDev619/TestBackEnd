import { sesClient } from "../libs/aws-client";
import { SendEmailCommand } from "@aws-sdk/client-ses";

export const sendContanctMessageService = async (
  htmlBody: string,
  sendersName: string,
  RECEIVING_EMAIL: string,
  SOURCE_EMAIL: string
) => {
  const sendEmailCommand = new SendEmailCommand({
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

  const sendEmail = await sesClient.send(sendEmailCommand);
  return sendEmail;
};
