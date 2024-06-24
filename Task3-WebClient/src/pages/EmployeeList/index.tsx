import { shallow } from "zustand/shallow";
import { RESULTS_PER_PAGE } from "../../utils/constants";
import { Button, Group, Pagination, Stack } from "@mantine/core";
import { useEffect } from "react";
import { List } from "./List";
import { useEmployees } from "../../stores/use-employees";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const EmployeeList = () => {
  const { getEmployees, total, page, setSelectedUser } = useEmployees(
    ({ getEmployees, total, page, setSelectedUser }) => ({
      getEmployees,
      total,
      page,
      setSelectedUser,
    }),
    shallow
  );
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    getEmployees(page);
    setSelectedUser(null);
  }, []);

  return (
    <Stack gap={32} align="stretch" flex={1} mb={64}>
      <List />
      <Button mx={24} onClick={() => navigate("new")}>
        {t("add")}
      </Button>
      <Group justify="center" mt={"auto"}>
        <Pagination
          size="lg"
          value={page}
          total={Math.ceil(total / RESULTS_PER_PAGE)}
          onChange={getEmployees}
        />
      </Group>
    </Stack>
  );
};
