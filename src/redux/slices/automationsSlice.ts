import { Automations, Automation } from "@/constants/script.constant";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Automations = {
  automationsList: [],
};

const automationsSlice = createSlice({
  name: "automations",
  initialState,
  reducers: {
    addAutomation(state, action) {
      const updatedAutomations: Automation[] = [...state.automationsList];
      updatedAutomations.push(action.payload);
      return { automationsList: updatedAutomations };
    },
    updateAutomation(state, action) {
      const updatedAutomations: Automation[] = [...state.automationsList];
      updatedAutomations.map((automation) => {
        if (automation.id === action.payload.id) return { ...action.payload };
        return automation;
      });
      return { automationsList: updatedAutomations };
    },
  },
});

export const { addAutomation, updateAutomation } = automationsSlice.actions;
export default automationsSlice.reducer;
