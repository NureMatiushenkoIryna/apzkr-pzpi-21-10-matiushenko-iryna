import { ChargingStatus } from '../enum/chargin-status.enum';
import { CreateChargingDto } from './create-charging.dto';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class UpdateChargingDto extends PartialType(
  OmitType(CreateChargingDto, ['stationId', 'startPercent']),
) {
  @ApiProperty()
  endPercent: number;

  @ApiProperty()
  status: ChargingStatus;
}
