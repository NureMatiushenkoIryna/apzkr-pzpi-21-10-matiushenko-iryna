import { Module } from '@nestjs/common';
import { MaintenanceRequestService } from './maintenance-request.service';
import { MaintenanceRequestController } from './maintenance-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaintenanceRequest } from './entities/maintenance-request.entity';
import { CarModule } from 'src/car/car.module';
import { StationModule } from 'src/station/station.module';

@Module({
  imports: [TypeOrmModule.forFeature([MaintenanceRequest]), CarModule, StationModule],
  controllers: [MaintenanceRequestController],
  providers: [MaintenanceRequestService],
})
export class MaintenanceRequestModule {}
