import { Request, Response } from "express";

// SERVICES
import { updateUser } from "../services/user.services";
import { sendContanctMessageService } from "../services/contact.services";

const RECEIVING_EMAIL = process.env.CONTACT_EMAIL ?? "";
const SOURCE_EMAIL = process.env.CONTACT_EMAIL ?? "";

export const sendContactMessage = async (req: Request, res: Response) => {
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
    await updateUser({ name, email, phone, discoverySource });

    const sendEmail = await sendContanctMessageService(
      htmlBody,
      name,
      RECEIVING_EMAIL,
      SOURCE_EMAIL
    );

    return res.status(200).json(sendEmail);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json({ message: error.message });
    }
  }
};
