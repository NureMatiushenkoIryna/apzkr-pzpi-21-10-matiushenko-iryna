export enum IncidentType {
  Overheat = "overheat",
}

export enum MaintenanceStatus {
  Pending = "pending",
  ServiceUpdated = "serviceUpdated",
  ClientUpdated = "clientUpdated",
  Rejected = "rejected",
  Accepted = "accepted",
  Done = "done",
  Canceled = "canceled",
}

export enum ChargingStatus {
  InProgress = "inProgress",
  Finished = "finished",
}

export enum UserRole {
  Customer = "customer",
  Employee = "employee",
  Admin = "admin",
}
