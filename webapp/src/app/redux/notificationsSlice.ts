import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addEmployee, editEmployee, deleteEmployee, fetchEmployees, refreshEmployees } from "./employeesSlice";

type Severity = "error" | "warning" | "info" | "success";

interface Notification {
  message: string;
  severity: Severity;
}

interface NotificationsState {
  current: Notification | null;
}

const initialState: NotificationsState = {
  current: null,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    showNotification(state, action: PayloadAction<Notification>) {
      state.current = action.payload;
    },
    clearNotification(state) {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.current = { message: action.error.message ?? "Failed to fetch employees", severity: "error" };
      })
      .addCase(refreshEmployees.rejected, (state, action) => {
        state.current = { message: action.error.message ?? "Failed to refresh employees", severity: "error" };
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.current = { message: action.error.message ?? "Failed to add employee", severity: "error" };
      })
      .addCase(editEmployee.rejected, (state, action) => {
        state.current = { message: action.error.message ?? "Failed to update employee", severity: "error" };
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.current = { message: action.error.message ?? "Failed to delete employee", severity: "error" };
      });
  },
});

export const { showNotification, clearNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
