// src/config/cognitoConfig.ts

import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'ap-northeast-1_CPTbx5xuY', // Your user pool id here
  ClientId: '59vr413pnhn71c2og8mr3s69ri', // Your client id here
};

export const userPool = new CognitoUserPool(poolData);
