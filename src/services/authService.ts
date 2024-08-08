// src/services/authService.ts
import { Auth } from 'aws-amplify';

export const signUp = async (username: string, password: string, email: string) => {
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {
        email, // Optional - E.164 number convention
      },
    });
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const confirmSignUp = async (username: string, code: string) => {
  try {
    await Auth.confirmSignUp(username, code);
  } catch (error) {
    console.error('Error confirming sign up:', error);
    throw error;
  }
};

export const signIn = async (username: string, password: string) => {
  try {
    const user = await Auth.signIn(username, password);
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await Auth.signOut();
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export const currentUser = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    throw error;
  }
};
