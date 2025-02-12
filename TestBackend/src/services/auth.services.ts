// Cognito
import {
  AuthFlowType,
  ChallengeNameType,
  InitiateAuthCommand,
  RespondToAuthChallengeCommand,
} from "@aws-sdk/client-cognito-identity-provider";

// LIBS
import { cognitoClient } from "../libs/aws-client";

// Sends user details and clientId to Cognito
// Returns a JSON Web Token (jwt)
export const initiateAuth = async (
  email: string,
  password: string,
  clientId: string
) => {
  const command = new InitiateAuthCommand({
    AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },

    ClientId: clientId,
  });

  // Get access token, id token, and refresh token from Cognito
  const token = cognitoClient.send(command);

  return token;
};

// Respond to the "NEW_PASSWORD_REQUIRED" challeng
export const respondToChallenge = async (
  email: string,
  newPassword: string,
  clientId: string,
  session: string
) => {
  const command = new RespondToAuthChallengeCommand({
    ChallengeName: ChallengeNameType.NEW_PASSWORD_REQUIRED,
    ClientId: clientId,
    ChallengeResponses: {
      USERNAME: email,
      NEW_PASSWORD: newPassword,
    },
    Session: session,
  });

  const token = cognitoClient.send(command);

  return token;
};

// // Refresh the Access Token
export const refreshTokenService = async (
  refreshToken: string,
  clientId: string
) => {
  const command = new InitiateAuthCommand({
    AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
    AuthParameters: {
      REFRESH_TOKEN: refreshToken,
    },

    ClientId: clientId,
  });

  // Get access token, id token, and refresh token from Cognito
  const token = cognitoClient.send(command);

  return token;
};
