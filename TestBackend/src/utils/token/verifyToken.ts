import { CognitoJwtVerifier } from "aws-jwt-verify";

// Verifies the validity of the token based on its type
// Possible types: id, access
export async function verifyToken(
  token: string | undefined,
  tokenUse: "id" | "access"
) {
  if (token === undefined) {
    throw new Error(`${tokenUse} is undefined`);
  }
  const verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.COGNITO_USER_POOL_ID!,
    tokenUse: tokenUse,
    clientId: process.env.COGNITO_CLIENT_ID!,
  });

  try {
    const payload = await verifier.verify(token);
  } catch {
    throw new Error("Unauthorized");
  }
}
