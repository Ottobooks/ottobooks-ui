"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import breadcrumbReducer from "./slices/breadcrumbSlice";
import automationsReducer from "./slices/automationsSlice";
import integrationReducer from "./slices/integrationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    breadcrumb: breadcrumbReducer,
    automations: automationsReducer,
    integration: integrationReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
