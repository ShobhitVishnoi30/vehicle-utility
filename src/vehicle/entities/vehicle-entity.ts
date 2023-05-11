import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { VehicleType } from '../enum/typeEnum';

export type VehicleDocument = HydratedDocument<Vehicle>;

@Schema()
export class Vehicle {
  @Prop()
  id: string;

  @Prop({ enum: VehicleType })
  type: string;

  @Prop()
  price: number;

  @Prop()
  name: string;

  @Prop()
  productionDate: number;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
