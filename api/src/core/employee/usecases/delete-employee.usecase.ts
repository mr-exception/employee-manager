import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from '../../../database/schemas/employee.schema';

@Injectable()
export class DeleteEmployeeUseCase {
  constructor(
    @InjectModel(Employee.name) private readonly model: Model<EmployeeDocument>,
  ) {}

  async execute(id: string): Promise<void> {
    const result = await this.model.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`Employee ${id} not found`);
  }
}
