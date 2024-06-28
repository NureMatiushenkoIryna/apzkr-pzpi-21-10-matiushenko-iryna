import {
  Button,
  ComboboxData,
  Container,
  Grid,
  NumberInput,
  Select,
  Stack,
  Textarea,
} from "@mantine/core";
import { useMaintenanceRequests } from "../../stores/use-maintenance-requests";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DateInput } from "@mantine/dates";
import { useStations } from "../../stores/use-stations";
import { useEffect } from "react";
import { useCars } from "../../stores/use-cars";

type FormState = {
  description: string;
  completeBy: Date;
  price?: number;
  carId: string;
  stationId: string;
};

export const AddMaintenanceRequest = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const createMaintenanceRequest = useMaintenanceRequests(state => state.createMaintenanceRequest);
  const { cars, getCars } = useCars(({ cars, getCars }) => ({ cars, getCars }));
  const {
    register,
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<FormState>({
    mode: "onBlur",
  });
  const { allStations, getAllStations } = useStations(
    ({ allStations, getAllStations }) => ({
      allStations,
      getAllStations,
    })
  );

  const onSubmit = async (data: FormState) => {
    await createMaintenanceRequest(data)
    navigate("../");
  };

  useEffect(() => {
    if (!allStations.length) {
      getAllStations();
    }
  }, []);

  useEffect(() => {
    if (!cars.length) {
      getCars();
    }
  }, []);

  const stationSelectValues: ComboboxData = allStations.map((station) => {
    return {
      label: `${station.name} - ${station.address}`,
      value: station.id,
    };
  });

  const carSelectValues: ComboboxData = cars.map((car) => {
    return {
      label: car.model,
      value: car.id,
    };
  });
  console.log(t("car"));
  return (
    // @ts-ignore
    <Container component={Stack} justify="center" size="md" h={"100%"}>
      <Grid component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Grid.Col span={6}>
          <Stack gap={12}>
            <Controller
              control={control}
              name="price"
              render={({ field: { value, onChange } }) => (
                <NumberInput
                  min={1}
                  size="md"
                  label={t("price")}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="carId"
              render={({ field: { value, onChange } }) => (
                <Select
                  data={carSelectValues}
                  value={value}
                  onChange={onChange}
                  size="md"
                  label={t("car")}
                />
              )}
            />
          </Stack>
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack gap={12}>
            <Controller
              control={control}
              name="completeBy"
              render={({ field: { value, onChange } }) => (
                <DateInput
                  minDate={new Date()}
                  label={t("completeBy")}
                  placeholder={t("completeBy")}
                  size="md"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="stationId"
              render={({ field: { value, onChange } }) => (
                <Select
                  data={stationSelectValues}
                  value={value}
                  onChange={onChange}
                  size="md"
                  label={t("station")}
                />
              )}
            />
          </Stack>
        </Grid.Col>
        <Grid.Col span={12} mt={8}>
          <Textarea
            color="green"
            label={t("description")}
            placeholder={t("description")}
            description={t("detailedDescription")}
            resize="vertical"
            size="md"
            {...register("description")}
          />
        </Grid.Col>
        <Grid.Col span={12} mt={20}>
          <Button color="green" type="submit" disabled={!isDirty} fullWidth>
            {t("add")}
          </Button>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
