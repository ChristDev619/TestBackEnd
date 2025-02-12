import { Request, Response } from "express";

// SERVICES
import {
  readUser,
  createUser,
  deleteUser,
  updateUser,
} from "../services/user.services";

// GET User
export const getUser = async (req: Request, res: Response) => {
  const email = req.query.email as string;

  if (!email) {
    return res.status(400).json("Missing email");
  }

  try {
    const user = await readUser(email);

    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json(error.message);
    }
  }
};

// ADD User
export const addUser = async (req: Request, res: Response) => {
  const email = req.body.email;
  const emailOptIn = true;

  if (!email) {
    return res.status(400).json("Missing email");
  }

  const existingUser = await readUser(email);

  if (existingUser) return res.status(409).json("Email already in use");

  const newUser = {
    email,
    emailOptIn,
  };

  try {
    const createdUser = await createUser(newUser);
    return res.status(201).json(createdUser);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json(error.message);
    }
  }
};

// MODIFY User
export const modifyUser = async (req: Request, res: Response) => {
  const email = req.query.email as string;
  const emailOptIn = req.body.emailOptIn;

  if (!email) {
    return res.status(400).json("Missing user email");
  }

  const user = {
    email,
    emailOptIn,
  };

  try {
    const modifiedUser = await updateUser(user);

    return res.status(201).json(modifiedUser);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json(error.message);
    }
  }
};

// REMOVE User
export const removeUser = async (req: Request, res: Response) => {
  const userEmail = req.query.email as string;

  if (!userEmail) {
    return res.status(400).json("Missing user email");
  }

  try {
    const deletedUser = await deleteUser(userEmail);

    return res.status(202).json(deletedUser);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json(error.message);
    }
  }
};
