import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { SearchEmployeeDto } from './dto/search-employee.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EditEmployeeDto } from './dto/edit-employee.dto';
import { SearchEmployeesUseCase } from './usecases/search-employees.usecase';
import { CreateEmployeeUseCase } from './usecases/create-employee.usecase';
import { EditEmployeeUseCase } from './usecases/edit-employee.usecase';
import { DeleteEmployeeUseCase } from './usecases/delete-employee.usecase';

@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly searchUseCase: SearchEmployeesUseCase,
    private readonly createUseCase: CreateEmployeeUseCase,
    private readonly editUseCase: EditEmployeeUseCase,
    private readonly deleteUseCase: DeleteEmployeeUseCase,
  ) {}

  @Get()
  search(@Query() dto: SearchEmployeeDto) {
    return this.searchUseCase.execute(dto);
  }

  @Post()
  create(@Body() dto: CreateEmployeeDto) {
    return this.createUseCase.execute(dto);
  }

  @Patch(':id')
  edit(@Param('id') id: string, @Body() dto: EditEmployeeDto) {
    return this.editUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.deleteUseCase.execute(id);
  }
}
