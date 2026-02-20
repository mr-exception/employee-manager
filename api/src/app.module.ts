import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { EmployeeModule } from './core/employee/employee.module';

@Module({
  imports: [ConfigModule, DatabaseModule, EmployeeModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
