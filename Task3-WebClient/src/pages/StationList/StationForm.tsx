import { useForm } from "react-hook-form";
import { useStations } from "../../stores/use-stations";
import { Button, Group, TextInput } from "@mantine/core";
import { useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { shallow } from "zustand/shallow";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type FormState = {
  name: string;
  address: string;
};

const defaultValues: FormState = {
  name: "",
  address: "",
};

const schema = z.object({
  name: z.string().min(1, "notEmpty"),
  address: z.string().min(1, "notEmpty"),
});

export const StationForm = () => {
  const { t } = useTranslation();
  const { selectedStation, setSelectedStation, createStation, updateStation, getAllStations } =
    useStations(
      ({
        selectedStation,
        setSelectedStation,
        createStation,
        updateStation,
        getAllStations
      }) => ({
        selectedStation,
        setSelectedStation,
        createStation,
        getAllStations,
        updateStation,
      }),
      shallow
    );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    trigger,
  } = useForm<FormState>({
    mode: "onBlur",
    defaultValues,
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    reset(selectedStation ?? defaultValues);
    trigger();
  }, [selectedStation]);

  const onSubmit = async (data: FormState) => {
    if (selectedStation) {
      await updateStation(selectedStation.id, data);
      setSelectedStation(null);
      trigger();
    } else {
      await createStation(data);
    }
    await getAllStations()
  };

  return (
    <Group
      gap={32}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      justify="center"
      align={isValid ? "flex-end" : "center"}
    >
      <TextInput
        {...register("name")}
        label={t("station")}
        size="md"
        error={errors.name?.message && t(errors.name?.message)}
      />
      <TextInput
        {...register("address")}
        label={t("address")}
        size="md"
        error={errors.address?.message && t(errors.address?.message)}
      />
      <Button type="submit" size="md">
        {!!selectedStation ? t("save") : t("add")}
      </Button>
      {!!selectedStation && (
        <Button
          rightSection={<MdCancel />}
          onClick={() => setSelectedStation(null)}
          ml={8}
          size="md"
        >
          Cancel editing
        </Button>
      )}
    </Group>
  );
};
