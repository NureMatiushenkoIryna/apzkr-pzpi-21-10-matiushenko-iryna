import { ApiProperty } from '@nestjs/swagger';

export class SignUpDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  dateOfBirth: string;
}
