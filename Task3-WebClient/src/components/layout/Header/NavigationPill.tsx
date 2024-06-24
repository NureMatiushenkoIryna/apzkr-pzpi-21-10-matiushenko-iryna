import { Button } from "@mantine/core";
import { NavLink, useMatch } from "react-router-dom";

type Props = {
  to: string;
  label: string;
};

export const NavigationPill = ({ to, label }: Props) => {
  const match = useMatch({
    path: to,
    end: false,
  });

  return (
    <Button component={NavLink} to={to} variant={match ? "filled" : "outline"}>
      {label}
    </Button>
  );
};
