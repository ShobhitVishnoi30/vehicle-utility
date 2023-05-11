import { ParseUUIDPipe } from '@nestjs/common';
import { VehicleType } from '../enum/typeEnum';

export class CreateVehicleDto {
  type: VehicleType;
  price: number;
  name: string;
  productionDate: number;
}
