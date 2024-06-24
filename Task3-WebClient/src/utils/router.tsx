import { Navigate, createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { AuthGuard } from "../components/AuthGuard";
import { MaintenanceRequestList } from "../pages/MaintenanceRequestList";
import {
  AddMaintenanceRequest,
  EditMaintenanceRequest,
} from "../pages/MaintenanceRequest";
import { StationList } from "../pages/StationList";
import { EmployeeList } from "../pages/EmployeeList";
import { SignIn } from "../pages/SignIn";
import { AuthLayout } from "../components/layout/AuthLayout";
import { SignUp } from "../pages/SignUp";
import { RolesGuard } from "../components/RolesGuard";
import { UserRole } from "../types/enums";
import { Employee } from "../pages/Employee";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={"dashboard"} />,
      },
      {
        path: "dashboard",
        element: <AuthGuard />,
        children: [
          {
            index: true,
            element: <Navigate to={"maintenance-requests"} />,
          },
          {
            path: "maintenance-requests",
            element: <MaintenanceRequestList />,
          },
          {
            path: "maintenance-requests/new",
            element: <AddMaintenanceRequest />,
          },
          {
            path: "maintenance-requests/:id",
            element: <EditMaintenanceRequest />,
          },
          {
            path: "employees",
            element: (
              <RolesGuard roles={[UserRole.Admin]}>
                <EmployeeList />
              </RolesGuard>
            ),
          },
          {
            path: "employees/new",
            element: (
              <RolesGuard roles={[UserRole.Admin]}>
                <Employee />
              </RolesGuard>
            ),
          },
          {
            path: "employees/:id",
            element: (
              <RolesGuard roles={[UserRole.Admin]}>
                <Employee />
              </RolesGuard>
            ),
          },
          {
            path: "stations",
            element: (
              <RolesGuard roles={[UserRole.Admin, UserRole.Employee]}>
                <StationList />
              </RolesGuard>
            ),
          },
        ],
      },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          {
            path: "sign-in",
            element: <SignIn />,
          },
          {
            path: "sign-up",
            element: <SignUp />,
          },
        ],
      },
    ],
  },
]);
