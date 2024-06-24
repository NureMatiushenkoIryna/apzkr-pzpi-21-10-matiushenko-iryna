import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateMaintenanceRequestDto } from './create-maintenance-request.dto';
import { MaintenanceStatus } from '../enums/maintenance-status.enum';

export class UpdateMaintenanceRequestDto extends PartialType(
  OmitType(CreateMaintenanceRequestDto, ['carId', 'stationId']),
) {
  @ApiProperty()
  description: string;

  @ApiProperty()
  status: MaintenanceStatus;

  @ApiProperty()
  rejectionReason: string;
}
