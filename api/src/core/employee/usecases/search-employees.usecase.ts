import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryFilter, QueryOptions, SortOrder } from 'mongoose';
import { ICollection, IEmployee } from '@employee-manager/specs';
import {
  Employee,
  EmployeeDocument,
} from '../../../database/schemas/employee.schema';
import { SearchEmployeeDto } from '../dto/search-employee.dto';

@Injectable()
export class SearchEmployeesUseCase {
  constructor(
    @InjectModel(Employee.name) private readonly model: Model<EmployeeDocument>,
  ) {}

  async execute(dto: SearchEmployeeDto): Promise<ICollection<IEmployee>> {
    const { page = 1, pageSize = 10, search, sortBy, sortOrder = 'asc' } = dto;

    const query: QueryFilter<EmployeeDocument> = {};
    if (search) {
      query['$or'] = [
        { name: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
        { position: new RegExp(search, 'i') },
      ];
    }

    const sort: Record<string, SortOrder> = sortBy
      ? { [sortBy]: sortOrder === 'asc' ? 1 : -1 }
      : {};

    const data = await this.model
      .find(query)
      .sort(sort)
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    const totalRecords = await this.model.countDocuments(query);

    return { data, page, pageSize, totalRecords };
  }
}
