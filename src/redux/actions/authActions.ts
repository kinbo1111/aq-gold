import { Dispatch } from 'redux';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export interface AuthAction {
  type: string;
  payload?: any;
}

export const login = (username: string, password: string) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Successful login
      dispatch({ type: LOGIN_SUCCESS, payload: { username, password } });
    } catch (error) {
      // Login failed
      dispatch({ type: LOGIN_FAILURE, payload: 'Invalid username or password' });
    }
  };
};