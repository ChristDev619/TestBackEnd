import { Request, Response, NextFunction } from "express";

// Cognito
import {
  GetUserCommand,
  GetUserCommandOutput,
} from "@aws-sdk/client-cognito-identity-provider";

// LIBS
import { cognitoClient } from "../libs/aws-client";

// UTILS
import { verifyToken } from "../utils/token/verifyToken";

// Extending the Request interface
declare global {
  namespace Express {
    interface Request {
      user: Promise<GetUserCommandOutput>;
    }
  }
}

// Authentication middleware for route access control
export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Auth token required." });
  }

  const accessToken = (<string>authorization).split(" ")[1];
  try {
    // Verify access token validity
    await verifyToken(accessToken, "access");

    const command = new GetUserCommand({
      AccessToken: accessToken,
    });

    // Get the user from the Cognito user pool
    const user = cognitoClient.send(command);

    req.user = user;

    next();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(401).json({ error: error.message });
    }
  }
};
