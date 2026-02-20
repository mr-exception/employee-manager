import axios from "axios";
import { IEmployee, ICollection } from "@employee-manager/specs";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000",
});

export interface SearchEmployeesParams {
  search?: string;
  page?: number;
  pageSize?: number;
}

export type CreateEmployeePayload = Omit<IEmployee, "_id" | "createdAt" | "updatedAt">;
export type UpdateEmployeePayload = Omit<IEmployee, "_id" | "createdAt" | "updatedAt">;

export const searchEmployees = (params?: SearchEmployeesParams): Promise<ICollection<IEmployee>> =>
  client.get("/employees", { params }).then((res) => res.data);

export const createEmployee = (payload: CreateEmployeePayload): Promise<IEmployee> =>
  client.post("/employees", payload).then((res) => res.data);

export const updateEmployee = (id: string, payload: UpdateEmployeePayload): Promise<IEmployee> =>
  client.put(`/employees/${id}`, payload).then((res) => res.data);

export const deleteEmployee = (id: string): Promise<void> =>
  client.delete(`/employees/${id}`).then((res) => res.data);
