import { AuthAction, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/authActions';

interface AuthState {
  isLoggedIn: boolean;
  username: string;
  password: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  username: '',
  password: '',
  isLoading: false,
  error: null,
};

const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isLoading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, isLoggedIn: true, username: action.payload.username, password: action.payload.password, isLoading: false, error: null };
    case LOGIN_FAILURE:
      return { ...state, isLoggedIn: false, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default authReducer;