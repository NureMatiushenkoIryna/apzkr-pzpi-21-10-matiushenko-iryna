import { axiosIntance } from "../utils/axios";
import { User } from "../types/models";
import { JwtPayload, SignInResponse } from "../types/response";
import { jwtDecode } from "jwt-decode";
import { createWithEqualityFn } from "zustand/traditional";
import { SignUpDto } from "../types/dto";

type AuthStore = {
  user: User | null;
  loading: boolean;
  accessToken: string;
  authReady: boolean;
  register: (dto: SignUpDto) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
};

export const useAuth = createWithEqualityFn<AuthStore>((set) => ({
  user: null,
  loading: false,
  accessToken: "",
  authReady: false,
  register: async (dto: SignUpDto) => {
    const { data } = await axiosIntance.post<SignInResponse>(
      "/auth/sign-up",
      dto
    );
    const jwtPayload = jwtDecode<JwtPayload>(data.accessToken);
    set({
      accessToken: data.accessToken,
      user: {
        id: jwtPayload.sub,
        ...jwtPayload.data,
      },
    });
  },
  login: async (email: string, password: string) => {
    const { data } = await axiosIntance.post<SignInResponse>("/auth/sign-in", {
      email,
      password,
    });
    const jwtPayload = jwtDecode<JwtPayload>(data.accessToken);
    set({
      accessToken: data.accessToken,
      user: {
        id: jwtPayload.sub,
        ...jwtPayload.data,
      },
    });
  },
  logout: () => {
    set({
      accessToken: "",
      user: null,
    });
  },
}));
