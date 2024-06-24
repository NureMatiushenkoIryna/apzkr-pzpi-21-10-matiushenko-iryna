import { UserRole } from '../enums/user-role.enum';

interface JwtData {
  userId: string;
  user: {
    name: string;
    surname: string;
    role: UserRole;
    dateOfBirth: string;
    email: string;
    registratonDate: Date;
  };
}
