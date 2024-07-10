import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk<
  { token: string },
  { username: string; password: string }
>('auth/login', async ({ username, password }) => {
  // Implement your login logic here
  if (username === 'admin' && password === 'password') {
    return { token: 'some_token' };
  } else {
    throw new Error('Invalid username or password');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ token: string }>) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to login';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;