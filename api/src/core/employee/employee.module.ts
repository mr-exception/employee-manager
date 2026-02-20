import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from '../../database/schemas/employee.schema';
import { EmployeeController } from './employee.controller';
import { SearchEmployeesUseCase } from './usecases/search-employees.usecase';
import { CreateEmployeeUseCase } from './usecases/create-employee.usecase';
import { EditEmployeeUseCase } from './usecases/edit-employee.usecase';
import { DeleteEmployeeUseCase } from './usecases/delete-employee.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeSchema }]),
  ],
  controllers: [EmployeeController],
  providers: [
    SearchEmployeesUseCase,
    CreateEmployeeUseCase,
    EditEmployeeUseCase,
    DeleteEmployeeUseCase,
  ],
})
export class EmployeeModule {}
