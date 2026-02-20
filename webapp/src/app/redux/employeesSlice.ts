import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IEmployee } from "@employee-manager/specs";
import {
  searchEmployees,
  createEmployee as createEmployeeApi,
  updateEmployee as updateEmployeeApi,
  deleteEmployee as deleteEmployeeApi,
  CreateEmployeePayload,
  SearchEmployeesParams,
} from "../apis/employee";

interface EmployeesState {
  data: IEmployee[];
  totalRecords: number;
  loading: boolean;
  error: string | null;
}

const initialState: EmployeesState = {
  data: [],
  totalRecords: 0,
  loading: false,
  error: null,
};

export const fetchEmployees = createAsyncThunk("employees/fetch", (params?: SearchEmployeesParams) =>
  searchEmployees(params)
);

export const addEmployee = createAsyncThunk(
  "employees/add",
  (payload: CreateEmployeePayload) => createEmployeeApi(payload)
);

export const editEmployee = createAsyncThunk(
  "employees/edit",
  ({ _id, createdAt, updatedAt, ...payload }: IEmployee) =>
    updateEmployeeApi(_id, payload)
);

export const deleteEmployee = createAsyncThunk(
  "employees/delete",
  async (id: string) => {
    await deleteEmployeeApi(id);
    return id;
  }
);

export const refreshEmployees = createAsyncThunk("employees/refresh", (params?: SearchEmployeesParams) =>
  searchEmployees(params)
);

const addFetchCases = (builder: ActionReducerMapBuilder<EmployeesState>) => {
  builder
    .addCase(fetchEmployees.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchEmployees.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.totalRecords = action.payload.totalRecords;
    })
    .addCase(fetchEmployees.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to fetch employees";
    });
};

const addCreateCases = (builder: ActionReducerMapBuilder<EmployeesState>) => {
  builder.addCase(addEmployee.fulfilled, (state, action) => {
    state.data.push(action.payload);
  });
};

const addEditCases = (builder: ActionReducerMapBuilder<EmployeesState>) => {
  builder.addCase(editEmployee.fulfilled, (state, action) => {
    const idx = state.data.findIndex((e) => e._id === action.payload._id);
    if (idx !== -1) state.data[idx] = action.payload;
  });
};

const addDeleteCases = (builder: ActionReducerMapBuilder<EmployeesState>) => {
  builder.addCase(deleteEmployee.fulfilled, (state, action) => {
    state.data = state.data.filter((e) => e._id !== action.payload);
  });
};

const addRefreshCases = (builder: ActionReducerMapBuilder<EmployeesState>) => {
  builder.addCase(refreshEmployees.fulfilled, (state, action) => {
    state.data = action.payload.data;
    state.totalRecords = action.payload.totalRecords;
  });
};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addFetchCases(builder);
    addCreateCases(builder);
    addEditCases(builder);
    addDeleteCases(builder);
    addRefreshCases(builder);
  },
});

export default employeesSlice.reducer;
