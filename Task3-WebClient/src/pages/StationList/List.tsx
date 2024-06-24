import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";
import { Button, LoadingOverlay, Table, Text } from "@mantine/core";
import { useStations } from "../../stores/use-stations";

export const List = () => {
  const { t } = useTranslation();
  const {
    paginatedStations,
    loading,
    setSelectedStation,
    getPaginatedStations,
    page,
  } = useStations(
    ({
      paginatedStations,
      loading,
      setSelectedStation,
      getPaginatedStations,
      page,
    }) => ({
      paginatedStations,
      loading,
      setSelectedStation,
      getPaginatedStations,
      page,
    }),
    shallow
  );

  return (
    <Table pos="relative" withTableBorder flex={Number(loading)}>
      <Table.Thead>
        <Table.Tr>
          <Table.Td>ID</Table.Td>
          <Table.Td>{t("stationName")}</Table.Td>
          <Table.Td>{t("address")}</Table.Td>
          <Table.Td>
            <Button onClick={() => getPaginatedStations(page)} color="black">
              {t("refresh")}
            </Button>
          </Table.Td>
        </Table.Tr>
      </Table.Thead>
      {!loading && (
        <Table.Tbody>
          {paginatedStations.map((item) => (
            <Table.Tr>
              <Table.Td>
                <Text truncate maw={"14ch"}>
                  {item.id}
                </Text>
              </Table.Td>
              <Table.Td>
                <Text size="md" fw="bold">
                  {item.name}
                </Text>
              </Table.Td>
              <Table.Td>
                <Text size="sm">{item.address}</Text>
              </Table.Td>
              <Table.Td>
                <Button onClick={() => setSelectedStation(item)}>
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
