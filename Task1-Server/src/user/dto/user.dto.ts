import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsUUID,
  IsDateString,
} from 'class-validator';
import { UserRole } from 'src/auth/enums/user-role.enum';

export class UserDto {
  @ApiProperty({ description: "User's unique id" })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: "User's name" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "User's surname name" })
  @IsString()
  @IsNotEmpty()
  surname: string;

  @ApiProperty({
    description: "User's date of birth",
    format: 'date',
    default: new Date().toISOString(),
  })
  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: string;

  @ApiProperty({ description: "User's email address" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: false,
  })
  role?: UserRole;
}
