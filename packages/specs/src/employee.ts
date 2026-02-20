import { IDBRecord } from "./common";

export interface IEmployee extends IDBRecord {
  name: string;
  email: string;
  position: string;
  salary: number;
}

export interface ICollection<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalRecords: number;
}
