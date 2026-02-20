import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IEmployee } from '@employee-manager/specs';
import { Employee, EmployeeDocument } from '../../../database/schemas/employee.schema';
import { EditEmployeeDto } from '../dto/edit-employee.dto';

@Injectable()
export class EditEmployeeUseCase {
  constructor(
    @InjectModel(Employee.name) private readonly model: Model<EmployeeDocument>,
  ) {}

  async execute(id: string, dto: EditEmployeeDto): Promise<IEmployee> {
    const employee = await this.model
      .findByIdAndUpdate(id, dto, { new: true })
      .lean();

    if (!employee) throw new NotFoundException(`Employee ${id} not found`);

    return employee as IEmployee;
  }
}
