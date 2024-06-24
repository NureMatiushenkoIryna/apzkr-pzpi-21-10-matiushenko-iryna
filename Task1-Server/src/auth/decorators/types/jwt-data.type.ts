import { UserRole } from 'src/auth/enums/user-role.enum';

export interface JwtData {
  userId: string;
  user: {
    name: string;
    surname: string;
    role: UserRole;
    dateOfBirth: string;
    email: string;
    registratonDate: Date;
    stationId?: string;
  };
}
