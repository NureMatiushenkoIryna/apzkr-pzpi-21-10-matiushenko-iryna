import { Controller, useForm } from "react-hook-form";
import { UserRole } from "../../types/enums";
import {
  Button,
  ComboboxData,
  Container,
  PasswordInput,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { DateInput } from "@mantine/dates";
import { useEmployees } from "../../stores/use-employees";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useStations } from "../../stores/use-stations";

type FormState = {
  email: string;
  name: string;
  surname: string;
  dateOfBirth: Date;
  password: string;
  role: UserRole;
  stationId?: string;
};
export const Employee = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register, handleSubmit, control, reset, watch } = useForm<FormState>({
    mode: "onBlur",
  });
  const { selectedUser, setSelectedUser, createUser, updateUser } =
    useEmployees(
      ({ selectedUser, setSelectedUser, createUser, updateUser }) => ({
        selectedUser,
        setSelectedUser,
        createUser,
        updateUser,
      })
    );
  const { allStations, getAllStations } = useStations(
    ({ allStations, getAllStations }) => ({ allStations, getAllStations })
  );

  useEffect(() => {
    if (selectedUser) {
      reset(selectedUser);
    }
  }, []);

  const showStations = watch("role") === UserRole.Employee;
  const editing = !!selectedUser;

  const onSubmit = async (data: FormState) => {
    if (data.role !== UserRole.Employee && data.stationId) {
      delete data.stationId;
    }
    if (selectedUser) {
      await updateUser(selectedUser.id, data);
      setSelectedUser(null);
    } else {
      await createUser(data);
    }
    navigate("../");
  };

  useEffect(() => {
    if (!allStations.length) {
      getAllStations();
    }
  }, []);

  const stationSelectValues: ComboboxData = allStations.map((station) => {
    return {
      label: `${station.name} - ${station.address}`,
      value: station.id,
    };
  });

  const roleSelectValues: ComboboxData = Object.values(UserRole).map((role) => {
    return {
      label: t(role),
      value: role,
    };
  });

  return (
    <Container size="xs" w={"100%"} h={"100%"}>
      <Stack
        component={"form"}
        gap={12}
        h={"100%"}
        w={"100%"}
        justify="center"
        align="stretch"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          label={t("name")}
          placeholder={t("yourName")}
          {...register("name")}
          size="md"
        />
        <TextInput
          label={t("surname")}
          placeholder={t("yourSurname")}
          {...register("surname")}
          size="md"
        />
        {!editing && (
          <>
            <TextInput
              label={t("email")}
              placeholder="hello@gmail.com"
              {...register("email")}
              size="md"
            />
            <PasswordInput
              label={t("password")}
              placeholder={t("yourPassword")}
              {...register("password")}
              size="md"
            />
          </>
        )}
        <Controller
          control={control}
          name="role"
          render={({ field: { value, onChange } }) => (
            <Select
              data={roleSelectValues}
              value={value}
              onChange={onChange}
              size="md"
              label={t("role")}
            />
          )}
        />
        {showStations && (
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
        )}
        <Controller
          control={control}
          name="dateOfBirth"
          render={({ field: { value, onChange } }) => (
            <DateInput
              maxDate={new Date()}
              label={t("dateOfBirth")}
              placeholder={t("dateOfBirth")}
              size="md"
              value={value}
              onChange={onChange}
            />
          )}
        />
        <Button color="green" mt={12} type="submit" fullWidth size="md">
          {t("save")}
        </Button>
      </Stack>
    </Container>
  );
};
