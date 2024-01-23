import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  signupData: null,
  loading: false,
  isGoogleAuth: false,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
    setIsGoogleAuth(state, value) {
      state.isGoogleAuth = value.payload;
    },
  },
});

export const { setSignupData, setLoading, setToken, setIsGoogleAuth } =
  authSlice.actions;
export default authSlice.reducer;
