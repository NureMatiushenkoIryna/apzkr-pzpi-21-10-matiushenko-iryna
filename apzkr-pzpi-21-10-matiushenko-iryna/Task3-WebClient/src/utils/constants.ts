import { ComboboxData } from "@mantine/core";
import { MaintenanceStatus, UserRole } from "../types/enums";

export const APP_LANGUAGES = [
  {
    label: "Українська",
    value: "uk",
  },
  {
    label: "English",
    value: "en",
  },
];

export const DASHBOARD_ROUTES = [
  {
    labelKey: "maintenanceRequests",
    value: "dashboard/maintenance-requests",
    access: [UserRole.Admin, UserRole.Employee, UserRole.Customer],
  },
  {
    labelKey: "employees",
    value: "dashboard/employees",
    access: [UserRole.Admin],
  },
  {
    labelKey: "stations",
    value: "dashboard/stations",
    access: [UserRole.Admin],
  },
];

export const MAINTENANCE_STATUS_COLORS = {
  [MaintenanceStatus.Accepted]: "#27ae60",
  [MaintenanceStatus.ClientUpdated]: "#f1c40f",
  [MaintenanceStatus.Done]: "#2ecc71",
  [MaintenanceStatus.Pending]: "#95a5a6",
  [MaintenanceStatus.Rejected]: "#e74c3c",
  [MaintenanceStatus.Canceled]: "#e74c3c",
  [MaintenanceStatus.ServiceUpdated]: "#3498db"
};

export const USER_ROLE_COLORS = {
  [UserRole.Admin]: "#000000",
  [UserRole.Customer]: "#2ecc71",
  [UserRole.Employee]: "#3498db",
};

export const RESULTS_PER_PAGE = 8;

export const EMPLOYEE_STATUS_OPTIONS: ComboboxData = [
  {
    disabled: true,
    value: MaintenanceStatus.Pending,
    label: MaintenanceStatus.Pending,
  },
  {
    value: MaintenanceStatus.Accepted,
    label: MaintenanceStatus.Accepted,
  },
  {
    value: MaintenanceStatus.ServiceUpdated,
    label: MaintenanceStatus.ServiceUpdated,
  },
  {
    value: MaintenanceStatus.Done,
    label: MaintenanceStatus.Done,
  },
  {
    value: MaintenanceStatus.Rejected,
    label: MaintenanceStatus.Rejected,
  },
  {
    disabled: true,
    value: MaintenanceStatus.ClientUpdated,
    label: MaintenanceStatus.ClientUpdated,
  },
];

export const CUSTOMER_STATUS_OPTIONS: ComboboxData = [
  {
    disabled: true,
    value: MaintenanceStatus.Pending,
    label: MaintenanceStatus.Pending,
  },
  {
    value: MaintenanceStatus.Accepted,
    label: MaintenanceStatus.Accepted,
  },
  {
    value: MaintenanceStatus.ClientUpdated,
    label: MaintenanceStatus.ClientUpdated,
  },
  {
    value: MaintenanceStatus.Canceled,
    label: MaintenanceStatus.Canceled,
  },
  {
    disabled: true,
    value: MaintenanceStatus.ServiceUpdated,
    label: MaintenanceStatus.ServiceUpdated,
  },
];
