import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token:
    typeof window !== "undefined" &&
    localStorage.getItem("token") &&
    localStorage.getItem("token") != ""
      ? localStorage.getItem("token")
      : null,
  firstname: typeof window !== "undefined" && localStorage.getItem("firstname"),
  lastname: typeof window !== "undefined" && localStorage.getItem("lastname"),
  email: typeof window !== "undefined" && localStorage.getItem("email"),
  userId: typeof window !== "undefined" && localStorage.getItem("userId"),
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.userId = action.payload.userId;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.email = action.payload.email;
      state.token = action.payload.token;
      if (typeof window !== "undefined") {
        localStorage.setItem("userId", state.userId || "");
        localStorage.setItem("firstname", state.firstname || "");
        localStorage.setItem("lastname", state.lastname || "");
        localStorage.setItem("email", state.email || "");
        localStorage.setItem("token", state.token || "");
      }
    },
    destroyAuth(state) {
      state.userId = null;
      state.firstname = null;
      state.lastname = null;
      state.email = null;
      state.token = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("firstname");
        localStorage.removeItem("lastname");
        localStorage.removeItem("email");
      }
    },
  },
});

export const { setAuth, destroyAuth } = authSlice.actions;
export default authSlice.reducer;
