import { Box, Group } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { DASHBOARD_ROUTES } from "../../../utils/constants";
import { NavigationPill } from "./NavigationPill";
import { useAuth } from "../../../stores/use-auth";

export const HeaderNavigation = () => {
  const { t } = useTranslation();
  const user = useAuth((state) => state.user);
  const role = user?.role;

  if (!user) {
    return <Box flex={1} />;
  }

  return (
    <Group gap={16} flex={1}>
      {!!role &&
        DASHBOARD_ROUTES.filter((item) => item.access.includes(role)).map(
          (route) => (
            <NavigationPill to={route.value} label={t(route.labelKey)} />
          )
        )}
    </Group>
  );
};
