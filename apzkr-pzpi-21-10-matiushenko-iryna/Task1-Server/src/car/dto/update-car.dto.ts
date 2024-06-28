import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCarDto } from './create-car.dto';

export class UpdateCarDto extends PartialType(CreateCarDto) {
  @ApiProperty()
  userId: string;
}
