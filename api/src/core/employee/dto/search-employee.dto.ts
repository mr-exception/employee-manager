export type SortOrder = 'asc' | 'desc';
export type SortBy = 'name' | 'email' | 'position' | 'salary' | 'updatedAt';

export class SearchEmployeeDto {
  search?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
}
