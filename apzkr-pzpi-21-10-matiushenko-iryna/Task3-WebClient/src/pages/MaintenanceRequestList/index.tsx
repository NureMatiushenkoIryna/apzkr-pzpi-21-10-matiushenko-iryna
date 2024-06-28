import { Button, Group, Pagination, Stack } from "@mantine/core";
import { useMaintenanceRequests } from "../../stores/use-maintenance-requests";
import { shallow } from "zustand/shallow";
import { RESULTS_PER_PAGE } from "../../utils/constants";
import { List } from "./List";
import { useEffect } from "react";
import { VisibleByRole } from "../../components/VisibleByRoles";
import { UserRole } from "../../types/enums";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const MaintenanceRequestList = () => {
  const { getMaintenanceRequests, total, page, setSelectedMaintenanceRequest } =
    useMaintenanceRequests(
      ({
        getMaintenanceRequests,
        total,
        page,
        setSelectedMaintenanceRequest,
      }) => ({
        getMaintenanceRequests,
        total,
        page,
        setSelectedMaintenanceRequest,
      }),
      shallow
    );
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    getMaintenanceRequests(page);
    setSelectedMaintenanceRequest(null);
  }, []);

  return (
    <Stack gap={32} align="stretch" flex={1} mb={64}>
      <List />
      <VisibleByRole visibleFor={[UserRole.Customer]}>
        <Button mx={24} onClick={() => navigate("new")}>
          {t("add")}
        </Button>
      </VisibleByRole>
      <Group justify="center" mt={"auto"}>
        <Pagination
          size="lg"
          value={page}
          total={Math.ceil(total / RESULTS_PER_PAGE)}
          onChange={getMaintenanceRequests}
        />
      </Group>
    </Stack>
  );
};
