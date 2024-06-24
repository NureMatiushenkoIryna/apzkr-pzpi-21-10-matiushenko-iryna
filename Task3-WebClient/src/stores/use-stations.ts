import { createWithEqualityFn } from "zustand/traditional";
import { Station } from "../types/models";
import { RESULTS_PER_PAGE } from "../utils/constants";
import { axiosIntance } from "../utils/axios";
import { PaginationResponse } from "../types/response";

type StationStore = {
  paginatedStations: Station[];
  allStations: Station[];
  selectedStation: Station | null;
  loading: boolean;
  error: Error | null;
  total: number;
  page: number;
  getPaginatedStations: (page: number) => Promise<void>;
  getAllStations: () => Promise<void>;
  setSelectedStation: (station: Station | null) => void;
  createStation: (station: Omit<Station, "id">) => Promise<void>;
  updateStation: (id: string, station: Partial<Station>) => Promise<void>;
};

export const useStations = createWithEqualityFn<StationStore>((set, get) => ({
  paginatedStations: [],
  allStations: [],
  selectedStation: null,
  loading: true,
  error: null,
  total: 0,
  page: 1,
  getPaginatedStations: async (page: number) => {
    set({ loading: true, page: page });
    try {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        perPage: RESULTS_PER_PAGE.toString(),
      });
      const response = await axiosIntance.get<PaginationResponse<Station>>(
        `/stations?${searchParams.toString()}`
      );
      set({
        paginatedStations: response.data.items,
        loading: false,
        error: null,
        total: response.data.total,
      });
    } catch (e: unknown) {
      set({
        error: e as Error,
        loading: false,
        paginatedStations: [],
        page: 1,
      });
    }
  },
  getAllStations: async () => {
    set({ loading: true });
    const response = await axiosIntance.get<PaginationResponse<Station>>(
      `/stations`
    );
    set({
      allStations: response.data.items,
      loading: false,
    });
  },
  setSelectedStation: (station) => {
    set({
      selectedStation: station,
    });
  },
  createStation: async (station: Omit<Station, "id">) => {
    await axiosIntance.post("/stations", station);
    await get().getPaginatedStations(get().page);
  },
  updateStation: async (id: string, station: Partial<Station>) => {
    await axiosIntance.patch(`/stations/${id}`, station);
    await get().getPaginatedStations(get().page);
  },
}));
