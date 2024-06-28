import { ApiProperty } from '@nestjs/swagger';

export class CreateStationDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;
}
