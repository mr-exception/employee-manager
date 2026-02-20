import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmployee } from "@employee-manager/specs";

const INITIAL_EMPLOYEES: IEmployee[] = [
  { _id: "1", name: "Alice Johnson", email: "alice.johnson@company.com", position: "Senior Engineer", salary: 120000, createdAt: 1609459200000, updatedAt: 1609459200000 },
  { _id: "2", name: "Bob Martinez", email: "bob.martinez@company.com", position: "UX Designer", salary: 95000, createdAt: 1625097600000, updatedAt: 1625097600000 },
  { _id: "3", name: "Carol Smith", email: "carol.smith@company.com", position: "HR Manager", salary: 88000, createdAt: 1574208000000, updatedAt: 1574208000000 },
  { _id: "4", name: "David Lee", email: "david.lee@company.com", position: "Junior Engineer", salary: 72000, createdAt: 1704672000000, updatedAt: 1704672000000 },
  { _id: "5", name: "Eva Chen", email: "eva.chen@company.com", position: "Marketing Lead", salary: 98000, createdAt: 1590796800000, updatedAt: 1590796800000 },
  { _id: "6", name: "Frank Nguyen", email: "frank.nguyen@company.com", position: "Account Executive", salary: 84000, createdAt: 1536710400000, updatedAt: 1536710400000 },
  { _id: "7", name: "Grace Patel", email: "grace.patel@company.com", position: "Staff Engineer", salary: 145000, createdAt: 1492819200000, updatedAt: 1492819200000 },
  { _id: "8", name: "Henry Brown", email: "henry.brown@company.com", position: "Financial Analyst", salary: 91000, createdAt: 1676332800000, updatedAt: 1676332800000 },
  { _id: "9", name: "Isabella Torres", email: "isabella.torres@company.com", position: "Product Manager", salary: 115000, createdAt: 1546300800000, updatedAt: 1546300800000 },
  { _id: "10", name: "James Wilson", email: "james.wilson@company.com", position: "DevOps Engineer", salary: 110000, createdAt: 1560816000000, updatedAt: 1560816000000 },
  { _id: "11", name: "Karen Adams", email: "karen.adams@company.com", position: "QA Engineer", salary: 82000, createdAt: 1638316800000, updatedAt: 1638316800000 },
  { _id: "12", name: "Liam Scott", email: "liam.scott@company.com", position: "Data Scientist", salary: 128000, createdAt: 1651363200000, updatedAt: 1651363200000 },
];

const employeesSlice = createSlice({
  name: "employees",
  initialState: INITIAL_EMPLOYEES as IEmployee[],
  reducers: {
    addEmployee(state, action: PayloadAction<Omit<IEmployee, "_id" | "createdAt" | "updatedAt">>) {
      const now = Date.now();
      state.push({ ...action.payload, _id: String(now), createdAt: now, updatedAt: now });
    },
    editEmployee(state, action: PayloadAction<IEmployee>) {
      const idx = state.findIndex((e) => e._id === action.payload._id);
      if (idx !== -1) state[idx] = action.payload;
    },
    deleteEmployee(state, action: PayloadAction<string>) {
      return state.filter((e) => e._id !== action.payload);
    },
  },
});

export const { addEmployee, editEmployee, deleteEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
