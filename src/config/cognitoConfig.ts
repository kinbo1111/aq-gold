// src/config/cognitoConfig.ts

import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'ap-northeast-1_Uo1rSXc5l', // Your user pool id here
  ClientId: '4o38hkhm8ppqnmkm5u6cpk9aj9', // Your client id here
};

export const userPool = new CognitoUserPool(poolData);
