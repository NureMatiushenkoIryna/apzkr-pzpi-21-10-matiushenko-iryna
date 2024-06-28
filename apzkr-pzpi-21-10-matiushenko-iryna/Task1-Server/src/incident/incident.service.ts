import { Injectable } from '@nestjs/common';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Incident } from './entities/incident.entity';
import { ChargingService } from 'src/charging/charging.service';
import { Repository } from 'typeorm';

@Injectable()
export class IncidentService {
  constructor(
    @InjectRepository(Incident)
    private readonly incidentRepository: Repository<Incident>,
    private readonly charingService: ChargingService,
  ) {}

  async create(createIncidentDto: CreateIncidentDto) {
    const { chargingId, ...rest } = createIncidentDto;
    const charging = await this.charingService.findOne(chargingId, true);
    const newIncident = this.incidentRepository.create(rest);
    newIncident.charging = charging;
    newIncident.date = new Date();
    return this.incidentRepository.save(newIncident);
  }

  findAll(chargingId: string) {
    return this.incidentRepository.find({
      where: {
        charging: {
          id: chargingId,
        },
      },
    });
  }
}
