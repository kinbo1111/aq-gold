// src/services/authFunctions.ts

import { AuthenticationDetails, CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { userPool } from '../config/cognitoConfig';

export function signUp(username: string, password: string, email: string, birthday: string, gender: string, callback: (err: Error | null, result?: any) => void) {
  const attributeList = [
    new CognitoUserAttribute({
      Name: 'email',
      Value: email,
    }),
    new CognitoUserAttribute({
      Name: 'birthdate',
      Value: birthday,
    }),
    new CognitoUserAttribute({
      Name: 'gender',
      Value: gender,
    }),
  ];

  userPool.signUp(username, password, attributeList, [], (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, result);
  });
}

export function signIn(username: string, password: string, callback: (err: Error | null, accessToken?: string) => void) {
  const authenticationDetails = new AuthenticationDetails({
    Username: username,
    Password: password,
  });

  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      const accessToken = result.getAccessToken().getJwtToken();
      callback(null, accessToken);
    },

    onFailure: (err) => {
      callback(err);
    },
  });
}

export function confirmSignUp(username: string, code: string, callback: (err: Error | null, result?: any) => void) {
  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  cognitoUser.confirmRegistration(code, true, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, result);
  });
}

export function resendConfirmationCode(username: string, callback: (err: Error | null, result?: any) => void) {
  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  cognitoUser.resendConfirmationCode((err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, result);
  });
}