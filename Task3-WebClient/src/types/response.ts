import { User } from "./models";

export type SignInResponse = {
  accessToken: string;
};

export type JwtPayload = {
  sub: string;
  data: Omit<User, "id">
}

export type PaginationResponse<T> = {
  items: T[];
  total: number;
};
