import { createWithEqualityFn } from "zustand/traditional";
import { User } from "../types/models";
import { RESULTS_PER_PAGE } from "../utils/constants";
import { axiosIntance } from "../utils/axios";
import { PaginationResponse } from "../types/response";
import { CreateUserDto, UpdateUserDto } from "../types/dto";
import { parseDates } from "../utils/date";

type EmployeeStore = {
  employees: User[];
  loading: boolean;
  error: Error | null;
  selectedUser: User | null;
  total: number;
  page: number;
  getEmployees: (page: number) => Promise<void>;
  setSelectedUser: (user: User | null) => void;
  createUser: (user: CreateUserDto) => Promise<void>;
  updateUser: (id: string, user: UpdateUserDto) => Promise<void>;
};

export const useEmployees = createWithEqualityFn<EmployeeStore>((set, get) => ({
  employees: [],
  loading: true,
  error: null,
  selectedUser: null,
  total: 0,
  page: 1,
  getEmployees: async (page: number) => {
    set({ loading: true, page: page });
    try {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        perPage: RESULTS_PER_PAGE.toString(),
      });
      const response = await axiosIntance.get<PaginationResponse<User>>(
        `/users?${searchParams.toString()}`
      );
      set({
        employees: response.data.items.map(parseDates),
        loading: false,
        error: null,
        total: response.data.total,
      });
    } catch (e: unknown) {
      set({
        error: e as Error,
        loading: false,
        employees: [],
        page: 1,
      });
    }
  },
  setSelectedUser: (user) => {
    set({
      selectedUser: user,
    });
  },
  createUser: async (user) => {
    await axiosIntance.post("/users", user);
    await get().getEmployees(get().page);
  },
  updateUser: async (id, user) => {
    await axiosIntance.patch(`/users/${id}`, user);
    await get().getEmployees(get().page);
  },
}));
