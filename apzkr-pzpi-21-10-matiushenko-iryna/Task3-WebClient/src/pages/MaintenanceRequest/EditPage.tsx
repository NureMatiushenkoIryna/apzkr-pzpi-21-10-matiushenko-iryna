import {
  Button,
  ComboboxData,
  ComboboxItem,
  Container,
  Grid,
  NumberInput,
  Select,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useMaintenanceRequests } from "../../stores/use-maintenance-requests";
import { Controller, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DateInput } from "@mantine/dates";
import { MaintenanceStatus, UserRole } from "../../types/enums";
import { useAuth } from "../../stores/use-auth";
import {
  CUSTOMER_STATUS_OPTIONS,
  EMPLOYEE_STATUS_OPTIONS,
} from "../../utils/constants";
import { TFunction } from "i18next";
import { useEffect } from "react";

type FormState = {
  status: MaintenanceStatus;
  description: string;
  rejectionReason?: string;
  completeBy: Date;
  price?: number;
};

const getTranslatedStatusOptions = (t: TFunction, options: ComboboxData) => {
  return options.map((option) => {
    const comboboxItem = option as ComboboxItem;
    comboboxItem.label = t(comboboxItem.label);
    return comboboxItem;
  });
};

export const EditMaintenanceRequest = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const role = useAuth((state) => state.user?.role);
  const {
    selectedMaintenanceRequest,
    setSelectedMaintenanceRequest,
    updateMaintenanceRequest,
  } = useMaintenanceRequests(
    ({
      selectedMaintenanceRequest,
      setSelectedMaintenanceRequest,
      updateMaintenanceRequest,
    }) => ({
      selectedMaintenanceRequest,
      setSelectedMaintenanceRequest,
      updateMaintenanceRequest,
    })
  );

  const {
    register,
    control,
    handleSubmit,
    watch,
    resetField,
    formState: { isDirty },
  } = useForm<FormState>({
    mode: "onBlur",
    defaultValues: selectedMaintenanceRequest ?? undefined,
  });

  const onSubmit = async (data: FormState) => {
    if (selectedMaintenanceRequest) {
      await updateMaintenanceRequest(selectedMaintenanceRequest?.id, data);
      setSelectedMaintenanceRequest(null);
      navigate("../");
    }
  };

  const status = watch("status");

  const isEditable =
    selectedMaintenanceRequest?.status &&
    [
      MaintenanceStatus.ClientUpdated,
      MaintenanceStatus.ServiceUpdated,
      MaintenanceStatus.Pending,
    ].includes(selectedMaintenanceRequest?.status);

  const rejected = status === MaintenanceStatus.Rejected;
  const canceled = status === MaintenanceStatus.Canceled;

  const statusOptions = getTranslatedStatusOptions(
    t,
    role === UserRole.Customer
      ? CUSTOMER_STATUS_OPTIONS
      : EMPLOYEE_STATUS_OPTIONS
  );

  const defaultUpdatedStatus =
    role === UserRole.Customer
      ? MaintenanceStatus.ClientUpdated
      : MaintenanceStatus.ServiceUpdated;

  useEffect(() => {
    if (isDirty && status === selectedMaintenanceRequest?.status) {
      resetField("status", {
        defaultValue: defaultUpdatedStatus,
      });
    }
  }, [isDirty, status]);

  if (!selectedMaintenanceRequest) {
    return <Navigate to={"../"} />;
  }

  return (
    // @ts-ignore
    <Container component={Stack} justify="center" size="md" h={"100%"}>
      <Grid component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Grid.Col span={6}>
          <Stack gap={12}>
            <TextInput
              disabled
              value={selectedMaintenanceRequest.car.model}
              size="md"
              label={t("car")}
            />
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
          </Stack>
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack gap={12}>
            <TextInput
              disabled
              value={`${selectedMaintenanceRequest.station.name} - ${selectedMaintenanceRequest.station.address}`}
              size="md"
              label={t("station")}
            />
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
          </Stack>
        </Grid.Col>
        <Grid.Col span={12} mt={8}>
          <Textarea
            label={t("description")}
            placeholder={t("description")}
            description={t("detailedDescription")}
            resize="vertical"
            size="md"
            {...register("description")}
          />
        </Grid.Col>
        <Grid.Col span={12} mt={8}>
          <Controller
            control={control}
            name="status"
            render={({ field: { value, onChange } }) => (
              <Select
                data={statusOptions}
                value={value}
                onChange={onChange}
                size="md"
                label={t("status")}
              />
            )}
          />
        </Grid.Col>
        {(rejected || canceled) && (
          <Grid.Col span={12}>
            <Textarea
              label={t("rejectionReason")}
              placeholder={t("rejectionReason")}
              description={t(
                rejected ? "rejectionReasonDescription" : "canceledDescription"
              )}
              resize="vertical"
              size="md"
              {...register("rejectionReason")}
            />
          </Grid.Col>
        )}
        <Grid.Col span={12} mt={20}>
          <Button
            color="green"
            type="submit"
            fullWidth
            disabled={!isDirty || !isEditable}
          >
            {t("save")}
          </Button>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
