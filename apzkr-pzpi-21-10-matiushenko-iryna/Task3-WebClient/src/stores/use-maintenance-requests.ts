import { createWithEqualityFn } from "zustand/traditional";
import { axiosIntance } from "../utils/axios";
import { MaintenanceRequest } from "../types/models";
import { PaginationResponse } from "../types/response";
import { RESULTS_PER_PAGE } from "../utils/constants";
import { parseDates } from "../utils/date";

type MaintenanceRequestStore = {
  maintenanceRequests: MaintenanceRequest[];
  selectedMaintenanceRequest: MaintenanceRequest | null;
  total: number;
  page: number;
  loading: boolean;
  error: Error | null;
  setSelectedMaintenanceRequest: (request: MaintenanceRequest | null) => void;
  getMaintenanceRequests: (page: number) => Promise<void>;
  createMaintenanceRequest: (
    request: Omit<
      MaintenanceRequest,
      | "id"
      | "createdAt"
      | "updatedAt"
      | "rejectionReason"
      | "status"
      | "car"
      | "station"
    >
  ) => Promise<void>;
  updateMaintenanceRequest: (
    id: string,
    maintenanceRequest: Omit<
      MaintenanceRequest,
      "id" | "createdAt" | "updatedAt" | "car" | "station"
    >
  ) => Promise<void>;
};

export const useMaintenanceRequests =
  createWithEqualityFn<MaintenanceRequestStore>((set, get) => ({
    maintenanceRequests: [],
    selectedMaintenanceRequest: null,
    total: 0,
    page: 1,
    loading: true,
    error: null,
    getMaintenanceRequests: async (page: number) => {
      set({ loading: true, page: page });
      try {
        const searchParams = new URLSearchParams({
          page: page.toString(),
          perPage: RESULTS_PER_PAGE.toString(),
        });
        const response = await axiosIntance.get<
          PaginationResponse<MaintenanceRequest>
        >(`/maintenance-requests?${searchParams.toString()}`);
        set({
          maintenanceRequests: response.data.items.map((item) =>
            parseDates(item)
          ),
          loading: false,
          error: null,
          total: response.data.total,
        });
      } catch (e: unknown) {
        set({
          error: e as Error,
          loading: false,
          maintenanceRequests: [],
          page: 1,
        });
      }
    },
    setSelectedMaintenanceRequest: (request) => {
      set({
        selectedMaintenanceRequest: request,
      });
    },
    createMaintenanceRequest: async (maintenanceRequest) => {
      await axiosIntance.post("/maintenance-requests", maintenanceRequest);
      await get().getMaintenanceRequests(get().page);
    },
    updateMaintenanceRequest: async (id, maintenanceRequest) => {
      await axiosIntance.patch(
        `/maintenance-requests/${id}`,
        maintenanceRequest
      );
      await get().getMaintenanceRequests(get().page);
    },
  }));
