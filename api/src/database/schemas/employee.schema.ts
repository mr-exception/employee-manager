import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { randomUUID } from 'crypto';
import { IEmployee } from '@employee-manager/specs';

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema({
  collection: 'employees',
  timestamps: { currentTime: () => Date.now() },
})
export class Employee implements IEmployee {
  @Prop({ type: String, default: () => randomUUID() })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  position: string;

  @Prop({ required: true })
  salary: number;

  @Prop({ default: Date.now })
  createdAt: number;

  @Prop({ default: Date.now })
  updatedAt: number;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
