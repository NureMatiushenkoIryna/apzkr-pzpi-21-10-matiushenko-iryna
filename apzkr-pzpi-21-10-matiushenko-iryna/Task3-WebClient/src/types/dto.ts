import { UserRole } from "./enums";

export type SignUpDto = {
  email: string;
  name: string;
  surname: string;
  dateOfBirth: Date;
  password: string;
};

export type CreateUserDto = SignUpDto & {
  role: UserRole;
  statiodId?: string;
};

export type UpdateUserDto = Partial<Omit<CreateUserDto, "password" | "email">>;
