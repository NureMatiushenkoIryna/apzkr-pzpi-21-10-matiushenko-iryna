import { Injectable } from '@nestjs/common';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Station } from './entities/station.entity';
import { skip } from 'node:test';

@Injectable()
export class StationService {
  constructor(@InjectRepository(Station) private readonly stationRepository) {}

  async create(createStationDto: CreateStationDto) {
    const newStation = this.stationRepository.create(createStationDto);
    return this.stationRepository.save(newStation);
  }

  async findAll(page: number, perPage: number) {
    const [items, total] = await this.stationRepository.findAndCount({
      skip: page && perPage ? (page - 1) * perPage : undefined,
      take: perPage,
    });

    return {
      items,
      total,
    };
  }

  findOne(id: string, throwOnNull?: boolean) {
    const car = this.stationRepository.findOneBy({
      id,
    });
    if (!car && throwOnNull) {
      throw new Error(`No station ${id} found`);
    }
    return car;
  }

  async update(id: string, updateStationDto: UpdateStationDto) {
    await this.stationRepository.update(id, updateStationDto);
    return this.findOne(id, true);
  }

  async remove(id: string) {
    const car = await this.findOne(id, true);
    return this.stationRepository.remove(car);
  }
}
