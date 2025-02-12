import { Request, Response } from "express";

// SERVICES
import {
  initiateAuth,
  refreshTokenService,
  respondToChallenge,
} from "../services/auth.services";

// UTILS
import { verifyToken } from "../utils/token/verifyToken";
import { decodeToken } from "../utils/token/decodeToken";

// TYPES
import type { IdToken } from "../utils/types/token.types";

// Reads user details from req.body
// Assigns the clientId
// Returns a JSON Web Token (jwt) to the frontend after validation
export const login = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  // Validates that all fields are filled
  if (!email || !password) {
    return res.status(400).json("All fields are required");
  }

  const clientId = process.env.COGNITO_CLIENT_ID;

  // Check if Client ID is missing
  if (!clientId) {
    return res.status(400).json("Cognito Client ID not found");
  }

  // Stores token returned from Cognito
  let token;

  try {
    // JSON Web Token (jwt) is returned from loginService
    token = await initiateAuth(email, password, clientId);

    // Required during first-time login
    // Satisfies the "NEW_PASSOWRD_REQUIRED" auth challenge
    if (token.ChallengeName === "NEW_PASSWORD_REQUIRED") {
      token = await respondToChallenge(
        email,
        password,
        clientId,
        token.Session!
      );
    }

    const { AccessToken, IdToken, RefreshToken, ExpiresIn } =
      token.AuthenticationResult!;

    //Verify the access token
    await verifyToken(AccessToken, "access");

    // Verify the id token
    await verifyToken(IdToken, "id");

    const decodedIdTokenPayload = decodeToken(IdToken) as IdToken;

    // Create user object sent to the client
    const cognitoUser = {
      email: decodedIdTokenPayload.email,
      role: decodedIdTokenPayload["custom:role"],
    };

    // Valid token return email and access token
    return res.status(200).json({
      cognitoUser,
      accessToken: AccessToken,
      refreshToken: RefreshToken,
      expiresIn: ExpiresIn,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(401).json(error.message);
    }
  }
};

// Refresh the Access Token
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.headers.authorization?.split(" ")[1];

    const clientId = process.env.COGNITO_CLIENT_ID!;

    // Check if refresh token is missing
    if (!refreshToken) {
      return res.status(401).json("Unauthorized");
    }

    const newTokens = await refreshTokenService(refreshToken, clientId);

    const { AccessToken, IdToken, ExpiresIn } = newTokens.AuthenticationResult!;

    //Verify the access token
    await verifyToken(AccessToken, "access");

    // Verify the id token
    await verifyToken(IdToken, "id");

    const decodedIdTokenPayload = decodeToken(IdToken) as IdToken;

    // Create user object sent to the client
    const cognitoUser = {
      email: decodedIdTokenPayload.email,
      role: decodedIdTokenPayload["custom:role"],
    };

    return res.status(200).json({
      cognitoUser,
      accessToken: AccessToken,
      expiresIn: ExpiresIn,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(401).json(error.message);
    }
  }
};
