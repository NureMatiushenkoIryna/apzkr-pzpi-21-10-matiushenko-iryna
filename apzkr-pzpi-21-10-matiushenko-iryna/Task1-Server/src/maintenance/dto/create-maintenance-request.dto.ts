import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateMaintenanceRequestDto {
  @ApiProperty()
  carId: string;

  @ApiProperty()
  stationId: string;

  @ApiProperty()
  description: string;

  @ApiProperty({
    required: false,
  })
  price: number;

  @ApiProperty({
    format: 'date',
    default: new Date().toISOString(),
  })
  @Type(() => Date)
  completeBy: Date;
}
