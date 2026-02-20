import axios from "axios";
import { IEmployee, ICollection } from "@employee-manager/specs";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export interface SearchEmployeesParams {
  search?: string;
  page?: number;
  pageSize?: number;
}

export type CreateEmployeePayload = Omit<IEmployee, "_id" | "createdAt" | "updatedAt">;
export type UpdateEmployeePayload = Omit<IEmployee, "_id" | "createdAt" | "updatedAt">;

export const searchEmployees = (params?: SearchEmployeesParams): Promise<ICollection<IEmployee>> => client.get("/employee", { params }).then((res) => res.data);

export const createEmployee = (payload: CreateEmployeePayload): Promise<IEmployee> => client.post("/employee", payload).then((res) => res.data);

export const updateEmployee = (id: string, payload: UpdateEmployeePayload): Promise<IEmployee> => client.put(`/employee/${id}`, payload).then((res) => res.data);

export const deleteEmployee = (id: string): Promise<void> => client.delete(`/employee/${id}`).then((res) => res.data);
