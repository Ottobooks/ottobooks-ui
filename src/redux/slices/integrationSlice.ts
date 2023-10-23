import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: null,
};

const integrationSlice = createSlice({
  name: "integration",
  initialState,
  reducers: {
    setIntegration(state, action) {
      state.type = action.payload;
      return state;
    },
  },
});

export const { setIntegration } = integrationSlice.actions;
export default integrationSlice.reducer;
