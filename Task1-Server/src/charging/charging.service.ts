import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateChargingDto } from './dto/create-charging.dto';
import { UpdateChargingDto } from './dto/update-charging.dto';
import { Charging } from './entities/charging.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StationService } from 'src/station/station.service';
import { CarService } from 'src/car/car.service';
import { ChargingStatus } from './enum/chargin-status.enum';

@Injectable()
export class ChargingService {
  constructor(
    @InjectRepository(Charging)
    private readonly chargingRepository: Repository<Charging>,
    private readonly carService: CarService,
    private readonly stationService: StationService,
  ) {}

  async create(userId: string, createChargingDto: CreateChargingDto) {
    const { stationId, ...rest } = createChargingDto;
    const car = await this.carService.findActive(userId);
    if (!car) {
      throw new ConflictException(
        'No active car selected. Please choose it in the app',
      );
    }
    const newCharging = this.chargingRepository.create(rest);
    const station = await this.stationService.findOne(stationId, true);
    newCharging.car = car;
    newCharging.station = station;
    newCharging.date = new Date();
    newCharging.status = ChargingStatus.InProgress;
    return this.chargingRepository.save(newCharging);
  }

  async findAll(carId?: string, stationId?: string) {
    return this.chargingRepository.find({
      where: {
        car: {
          id: carId,
        },
        station: {
          id: stationId,
        },
      },
    });
  }

  findOne(id: string, throwOnNull?: boolean) {
    const car = this.chargingRepository.findOne({
      where: {
        id,
      },
      relations: ['incidents'],
    });
    if (!car && throwOnNull) {
      throw new NotFoundException(`No charging ${id} found`);
    }
    return car;
  }

  async update(id: string, updateChargingDto: UpdateChargingDto) {
    await this.chargingRepository.update(id, updateChargingDto);
    return this.findOne(id, true);
  }

  async remove(id: string) {
    const car = await this.findOne(id, true);
    return this.chargingRepository.remove(car);
  }
}
