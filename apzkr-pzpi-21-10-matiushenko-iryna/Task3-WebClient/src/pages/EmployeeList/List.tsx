import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { Button, LoadingOverlay, Table, Text } from "@mantine/core";
import { useEmployees } from "../../stores/use-employees";
import { Mark } from "../../components/Mark";
import { USER_ROLE_COLORS } from "../../utils/constants";

export const List = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { employees, loading, getEmployees, page, setSelectedUser } =
    useEmployees(
      ({ employees, loading, getEmployees, page, setSelectedUser }) => ({
        employees,
        loading,
        getEmployees,
        page,
        setSelectedUser,
      }),
      shallow
    );
  console.log(loading);
  return (
    <Table pos="relative" withTableBorder flex={Number(loading)}>
      <Table.Thead>
        <Table.Tr>
          <Table.Td>ID</Table.Td>
          <Table.Td>{t("email")}</Table.Td>
          <Table.Td>{t("nameAndSurname")}</Table.Td>
          <Table.Td>{t("role")}</Table.Td>
          <Table.Td>
            <Button onClick={() => getEmployees(page)} color="black">
              {t("refresh")}
            </Button>
          </Table.Td>
        </Table.Tr>
      </Table.Thead>
      {!loading && (
        <Table.Tbody>
          {employees.map((item) => (
            <Table.Tr>
              <Table.Td>
                <Text truncate maw={"16ch"}>
                  {item.email}
                </Text>
              </Table.Td>
              <Table.Td>
                <Text truncate maw={"14ch"}>
                  {item.id}
                </Text>
              </Table.Td>
              <Table.Td>
                <Text size="md" fw="bold">
                  {`${item.name} ${item.surname}`}
                </Text>
              </Table.Td>
              <Table.Td>
                <Mark value={item.role} colorMap={USER_ROLE_COLORS} />
              </Table.Td>
              <Table.Td>
                <Button
                  onClick={() => {
                    console.log(item);
                    setSelectedUser(item);
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
