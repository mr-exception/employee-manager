import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./employeesSlice";
import notificationsReducer from "./notificationsSlice";

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    notifications: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
