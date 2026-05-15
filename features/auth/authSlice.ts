import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  token: string | null;
  userEmail: string | null;
};

const initialState: AuthState = {
  token: null,
  userEmail: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ token: string; userEmail: string }>
    ) => {
      state.token = action.payload.token;
      state.userEmail = action.payload.userEmail;

      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.token);
      }
    },

    logout: (state) => {
      state.token = null;
      state.userEmail = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;