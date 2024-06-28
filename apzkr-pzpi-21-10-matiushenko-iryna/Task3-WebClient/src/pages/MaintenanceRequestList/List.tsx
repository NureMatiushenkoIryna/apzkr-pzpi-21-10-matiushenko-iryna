import { Button, LoadingOverlay, Table, Text } from "@mantine/core";
import { useMaintenanceRequests } from "../../stores/use-maintenance-requests";
import { shallow } from "zustand/shallow";
import { MAINTENANCE_STATUS_COLORS } from "../../utils/constants";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Mark } from "../../components/Mark";

export const List = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    maintenanceRequests,
    loading,
    setSelectedMaintenanceRequest,
    page,
    getMaintenanceRequests,
  } = useMaintenanceRequests(
    ({
      maintenanceRequests,
      loading,
      setSelectedMaintenanceRequest,
      page,
      getMaintenanceRequests,
    }) => ({
      maintenanceRequests,
      loading,
      setSelectedMaintenanceRequest,
      page,
      getMaintenanceRequests,
    }),
    shallow
  );

  return (
    <Table pos="relative" withTableBorder flex={Number(loading)}>
      <Table.Thead>
        <Table.Tr>
          <Table.Td>ID</Table.Td>
          <Table.Td>{t("status")}</Table.Td>
          <Table.Td>{t("station")}</Table.Td>
          <Table.Td>{t("price")}</Table.Td>
          <Table.Td>{t("completeBy")}</Table.Td>
          <Table.Td>
            <Button onClick={() => getMaintenanceRequests(page)} color="black">
              {t("refresh")}
            </Button>
          </Table.Td>
        </Table.Tr>
      </Table.Thead>
      {!loading && (
        <Table.Tbody>
          {maintenanceRequests.map((item) => (
            <Table.Tr>
              <Table.Td>
                <Text truncate maw={"14ch"}>
                  {item.id}
                </Text>
              </Table.Td>
              <Table.Td>
                <Mark
                  value={item.status}
                  colorMap={MAINTENANCE_STATUS_COLORS}
                />
              </Table.Td>
              <Table.Td>
                <Text size="md" fw="bold">
                  {item.station.name}
                </Text>
              </Table.Td>
              <Table.Td>
                <Text size="md" fw="bold">
                  {item.price}
                </Text>
              </Table.Td>
              <Table.Td>
                <Text size="md" fw="bold">
                  {new Date(item.completeBy).toLocaleString()}
                </Text>
              </Table.Td>
              <Table.Td>
                <Button
                  onClick={() => {
                    setSelectedMaintenanceRequest(item);
                    navigate(item.id);
                  }}
                >
                  {t("edit")}
                </Button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      )}
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "lg", blur: 2 }}
      />
    </Table>
  );
};
