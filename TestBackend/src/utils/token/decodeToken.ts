import jwt_decode from "jwt-decode";

// Decode the JWT encoded token and return the payload
export function decodeToken(token: string | undefined) {
  if (token === undefined) {
    throw new Error("Error decoding token: Token is undefined");
  }
  const decodedToken = jwt_decode(token);

  return decodedToken;
}
