import { ParseUUIDPipe } from '@nestjs/common';
import { VehicleType } from '../enum/typeEnum';

export class UpdateVehicleDto {
  name: string;
}
