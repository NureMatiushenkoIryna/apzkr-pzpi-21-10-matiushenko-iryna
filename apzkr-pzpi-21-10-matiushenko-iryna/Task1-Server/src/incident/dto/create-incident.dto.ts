import { ApiProperty } from '@nestjs/swagger';
import { IncidentType } from '../enums/incident-type.enum';

export class CreateIncidentDto {
  @ApiProperty()
  abnormalValue?: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  chargingId: string;

  @ApiProperty()
  type: IncidentType;
}
