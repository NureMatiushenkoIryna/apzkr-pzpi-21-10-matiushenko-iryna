import { PartialType, OmitType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class UpdateUserDto extends PartialType(OmitType(UserDto, ['id'])) {}
