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

export function searchEmployees(params?: SearchEmployeesParams): Promise<ICollection<IEmployee>> {
  return client.get("/employee", { params }).then((res) => res.data);
}

export function createEmployee(payload: CreateEmployeePayload): Promise<IEmployee> {
  return client.post("/employee", payload).then((res) => res.data);
}

export function updateEmployee(id: string, payload: UpdateEmployeePayload): Promise<IEmployee> {
  return client.post(`/employee/${id}`, payload).then((res) => res.data);
}

export function deleteEmployee(id: string): Promise<void> {
  return client.delete(`/employee/${id}`).then((res) => res.data);
}
