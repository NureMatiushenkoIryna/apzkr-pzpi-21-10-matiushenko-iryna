import { Module } from '@nestjs/common';
import { IncidentService } from './incident.service';
import { IncidentController } from './incident.controller';
import { Incident } from './entities/incident.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChargingModule } from 'src/charging/charging.module';

@Module({
  imports: [TypeOrmModule.forFeature([Incident]), ChargingModule],
  controllers: [IncidentController],
  providers: [IncidentService],
})
export class IncidentModule {}
