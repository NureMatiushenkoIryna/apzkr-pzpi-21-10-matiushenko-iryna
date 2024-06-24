import { Module } from '@nestjs/common';
import { ChargingService } from './charging.service';
import { ChargingController } from './charging.controller';
import { Charging } from './entities/charging.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModule } from 'src/car/car.module';
import { StationModule } from 'src/station/station.module';

@Module({
  imports: [TypeOrmModule.forFeature([Charging]), CarModule, StationModule],
  controllers: [ChargingController],
  providers: [ChargingService],
  exports: [ChargingService],
})
export class ChargingModule {}
