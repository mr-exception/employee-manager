import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IEmployee } from '@employee-manager/specs';
import { Employee, EmployeeDocument } from '../../../database/schemas/employee.schema';
import { CreateEmployeeDto } from '../dto/create-employee.dto';

@Injectable()
export class CreateEmployeeUseCase {
  constructor(
    @InjectModel(Employee.name) private readonly model: Model<EmployeeDocument>,
  ) {}

  async execute(dto: CreateEmployeeDto): Promise<IEmployee> {
    const employee = await this.model.create(dto);
    return employee.toObject();
  }
}
