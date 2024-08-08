import { Auth } from 'aws-amplify';

export const updateProfile = async (attributes: { [key: string]: string }) => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user, attributes);
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};
