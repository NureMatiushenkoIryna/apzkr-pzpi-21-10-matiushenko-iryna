import { ApiProperty } from '@nestjs/swagger';

export class CreateChargingDto {
  @ApiProperty()
  startPercent: number;

  @ApiProperty()
  stationId: string;
}
