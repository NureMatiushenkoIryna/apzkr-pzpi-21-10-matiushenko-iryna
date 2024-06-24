import { shallow } from "zustand/shallow";
import { useAuth } from "../stores/use-auth";
import { Navigate, Outlet } from "react-router-dom";

export const AuthGuard = () => {
  const { accessToken, authReady } = useAuth(
    ({ accessToken, authReady }) => ({
      accessToken,
      authReady,
    }),
    shallow
  );
  console.log(authReady);
  if (authReady) {
    return null;
  }

  return accessToken ? <Outlet /> : <Navigate to={"/auth/sign-in"} />;
};
