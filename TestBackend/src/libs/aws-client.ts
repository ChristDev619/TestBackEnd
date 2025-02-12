import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { SESClient } from "@aws-sdk/client-ses";

const { AWS_REGION } = process.env;

const cognitoClient = new CognitoIdentityProviderClient({
  region: AWS_REGION,
});

const sesClient = new SESClient({
  region: AWS_REGION,
});

export { cognitoClient, sesClient };
