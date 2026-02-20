import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICollection, IEmployee } from '@employee-manager/specs';
import { Employee, EmployeeDocument } from '../../../database/schemas/employee.schema';
import { SearchEmployeeDto } from '../dto/search-employee.dto';

@Injectable()
export class SearchEmployeesUseCase {
  constructor(
    @InjectModel(Employee.name) private readonly model: Model<EmployeeDocument>,
  ) {}

  async execute(dto: SearchEmployeeDto): Promise<ICollection<IEmployee>> {
    const { page = 1, pageSize = 10, search } = dto;
    const filter = search
      ? { $or: [{ name: new RegExp(search, 'i') }, { email: new RegExp(search, 'i') }] }
      : {};

    const [data, totalRecords] = await Promise.all([
      this.model.find(filter).skip((page - 1) * pageSize).limit(pageSize).lean(),
      this.model.countDocuments(filter),
    ]);

    return { data: data as IEmployee[], page, pageSize, totalRecords };
  }
}
