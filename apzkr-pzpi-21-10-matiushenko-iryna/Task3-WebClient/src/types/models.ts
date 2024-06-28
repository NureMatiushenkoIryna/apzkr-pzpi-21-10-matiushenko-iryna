import {
  ChargingStatus,
  IncidentType,
  MaintenanceStatus,
  UserRole,
} from "./enums";

export type User = {
  id: string;
  email: string;
  name: string;
  surname: string;
  dateOfBirth: Date;
  role: UserRole;
  registratonDate: Date;
  cars?: Car[];
};

export type Car = {
  id: string;
  owner: User;
  model: string;
  active: boolean;
  chargings: Charging[];
  maintenanceRequests: MaintenanceRequest[];
};

export type Charging = {
  id: string;
  startPercent: number;
  endPercent?: number;
  status: ChargingStatus;
  date: Date;
  car: Car;
  station: Station;
  incidents?: Incident[];
};

export type Station = {
  id: string;
  name: string;
  address: string;
};

export type MaintenanceRequest = {
  id: string;
  status: MaintenanceStatus;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  rejectionReason?: string;
  completeBy: Date;
  price?: number;
  car: Car;
  station: Station;
};

export type Incident = {
  date: Date;
  type: IncidentType;
  abnormalValue?: number;
  description?: string;
  charging: Charging;
};
