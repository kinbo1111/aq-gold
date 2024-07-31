// src/config/cognitoConfig.ts

import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'ap-northeast-1_MdS7ZKbn0', // Your user pool id here
  ClientId: '5iq3iatilp2admks7590pa6gqf', // Your client id here
};

export const userPool = new CognitoUserPool(poolData);
