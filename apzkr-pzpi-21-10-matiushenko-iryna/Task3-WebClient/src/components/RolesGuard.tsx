import { shallow } from "zustand/shallow";
import { useAuth } from "../stores/use-auth";
import { UserRole } from "../types/enums";
import { Navigate } from "react-router-dom";
import { PropsWithChildren } from "react";

type Props = {
  roles: UserRole[];
};

export const RolesGuard = ({ roles, children }: PropsWithChildren<Props>) => {
  const { user, authReady } = useAuth(
    ({ user, authReady }) => ({
      user,
      authReady,
    }),
    shallow
  );

  if (authReady) {
    return null;
  }

  const role = user?.role;

  return role && roles.includes(role) ? (
    children
  ) : (
    <Navigate to={"/not-found"} />
  );
};
