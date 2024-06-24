import { createWithEqualityFn } from "zustand/traditional";
import { Car } from "../types/models";
import { axiosIntance } from "../utils/axios";

type CarStore = {
  cars: Car[];
  loading: boolean;
  error: Error | null;
  getCars: () => Promise<void>;
};

export const useCars = createWithEqualityFn<CarStore>((set) => ({
  cars: [],
  loading: true,
  error: null,
  total: 0,
  page: 1,
  getCars: async () => {
    set({ loading: true });
    try {
      const response = await axiosIntance.get<Car[]>(`/cars`);
      set({
        cars: response.data,
        loading: false,
        error: null,
      });
    } catch (e: unknown) {
      set({
        error: e as Error,
        loading: false,
        cars: [],
      });
    }
  },
}));
