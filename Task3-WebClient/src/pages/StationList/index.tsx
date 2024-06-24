import { shallow } from "zustand/shallow";
import { useStations } from "../../stores/use-stations";
import { RESULTS_PER_PAGE } from "../../utils/constants";
import { Group, Pagination, Stack } from "@mantine/core";
import { useEffect } from "react";
import { List } from "./List";
import { StationForm } from "./StationForm";

export const StationList = () => {
  const { getPaginatedStations, total, page } = useStations(
    ({ getPaginatedStations, total, page }) => ({
      getPaginatedStations,
      total,
      page,
    }),
    shallow
  );

  useEffect(() => {
    getPaginatedStations(page);
  }, []);

  return (
    <Stack gap={32} align="stretch" flex={1} mb={64} pt={8}>
      <StationForm />
      <List />
      <Group justify="center" mt={"auto"}>
        <Pagination
          size="lg"
          value={page}
          total={Math.ceil(total / RESULTS_PER_PAGE)}
          onChange={getPaginatedStations}
        />
      </Group>
    </Stack>
  );
};
