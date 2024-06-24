import { PropsWithChildren } from "react";
import { useAuth } from "../stores/use-auth";
import { UserRole } from "../types/enums";

type Props = {
  visibleFor: UserRole[];
};

export const VisibleByRole = ({
  visibleFor,
  children,
}: PropsWithChildren<Props>) => {
  const role = useAuth((state) => state.user?.role);

  return role && visibleFor.includes(role) ? children : null;
};
