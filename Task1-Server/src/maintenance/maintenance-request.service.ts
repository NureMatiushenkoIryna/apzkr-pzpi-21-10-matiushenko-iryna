import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMaintenanceRequestDto } from './dto/create-maintenance-request.dto';
import { UpdateMaintenanceRequestDto } from './dto/update-maintenance-request.dto';
import { CarService } from 'src/car/car.service';
import { StationService } from 'src/station/station.service';
import { InjectRepository } from '@nestjs/typeorm';
import { MaintenanceRequest } from './entities/maintenance-request.entity';
import { Repository } from 'typeorm';
import { MaintenanceStatus } from './enums/maintenance-status.enum';
import { UserRole } from 'src/auth/enums/user-role.enum';

@Injectable()
export class MaintenanceRequestService {
  constructor(
    @InjectRepository(MaintenanceRequest)
    private readonly maintenanceRequestRepository: Repository<MaintenanceRequest>,
    private readonly carService: CarService,
    private readonly stationService: StationService,
  ) {}

  async create(createMaintenanceRequestDto: CreateMaintenanceRequestDto) {
    const { carId, stationId, ...rest } = createMaintenanceRequestDto;
    const car = await this.carService.findOne(carId, true);
    const station = await this.stationService.findOne(stationId, true);
    const newMaintenanceRequest =
      this.maintenanceRequestRepository.create(rest);
    newMaintenanceRequest.car = car;
    newMaintenanceRequest.station = station;
    newMaintenanceRequest.status = MaintenanceStatus.Pending;
    return this.maintenanceRequestRepository.save(newMaintenanceRequest);
  }

  async findAll(
    page: number,
    perPage: number,
    stationId?: string,
    carId?: string,
  ) {
    const [items, total] = await this.maintenanceRequestRepository.findAndCount(
      {
        where: {
          car: {
            id: carId,
          },
          station: {
            id: stationId,
          },
        },
        skip: page && perPage ? (page - 1) * perPage : undefined,
        take: perPage,
        relations: ['car', 'station'],
      },
    );
    return {
      items,
      total,
    };
  }

  async findAllRequestsByUser(page: number, perPage: number, userId: string) {
    const [items, total] = await this.maintenanceRequestRepository.findAndCount(
      {
        where: {
          car: {
            owner: {
              id: userId,
            },
          },
        },
        skip: (page - 1) * perPage,
        take: perPage,
        relations: ['car', 'station'],
      },
    );
    return {
      items,
      total,
    };
  }

  async findAllRequestsByStation(
    page: number,
    perPage: number,
    stationId: string,
  ) {
    const [items, total] = await this.maintenanceRequestRepository.findAndCount(
      {
        where: {
          station: {
            id: stationId,
          },
        },
        skip: (page - 1) * perPage,
        take: perPage,
        relations: ['car', 'station'],
      },
    );
    return {
      items,
      total,
    };
  }

  async findOne(id: string, throwOnNull?: boolean) {
    const maintenanceRequest =
      await this.maintenanceRequestRepository.findOneBy({
        id,
      });
    if (!maintenanceRequest && throwOnNull) {
      throw new NotFoundException(`No maintenance request ${id} found`);
    }
    return maintenanceRequest;
  }

  async update(
    id: string,
    updateMaintenanceRequestDto: UpdateMaintenanceRequestDto,
  ) {
    await this.maintenanceRequestRepository.update(
      id,
      updateMaintenanceRequestDto,
    );
    return this.findOne(id, true);
  }

  async remove(id: string) {
    const maintenanceRequest = await this.findOne(id, true);
    return this.maintenanceRequestRepository.remove(maintenanceRequest);
  }
}
