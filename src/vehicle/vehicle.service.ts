import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicle, VehicleDocument } from './entities/vehicle-entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>,
  ) {}

  async create(createCatDto: CreateVehicleDto): Promise<Vehicle> {
    const createdVehicle = new this.vehicleModel(createCatDto);
    return createdVehicle.save();
  }

  async findAll(): Promise<Vehicle[]> {
    return this.vehicleModel.find().exec();
  }

  async findOne(id: string): Promise<Vehicle> {
    return this.vehicleModel.findOne({ _id: id }).exec();
  }

  update(id: string, updateVehicleDto: UpdateVehicleDto) {
    this.vehicleModel.updateOne({ _id: id }, updateVehicleDto).exec();
    const vehicle = this.vehicleModel.findOne({ _id: id }).exec();
    return vehicle;
  }

  async remove(id: string): Promise<Vehicle> {
    const vehicle = await this.vehicleModel.findOneAndDelete({
      _id: id,
    });
    return vehicle;
  }

  async findAveragePrice() {
    console.log('hey');
    const allVehicles = await this.findAll();
    const length = allVehicles.length;
    var avgPrice = 0;
    for (var i = 0; i < length; i++) {
      avgPrice += allVehicles[i].price;
    }
    return avgPrice / length;
  }

  async findAllInLastTwoDays() {
    const allVehicles = await this.vehicleModel.find().exec();
    const length = allVehicles.length;
    var last2Days = [];
    for (var i = 0; i < length; i++) {
      if (allVehicles[i].productionDate - Date.now() < 2 * 24 * 60 * 60 * 1000)
        last2Days.push(allVehicles[i]);
    }
    return last2Days;
  }
}
