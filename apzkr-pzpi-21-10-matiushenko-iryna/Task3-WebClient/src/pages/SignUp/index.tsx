import {
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
  Stack,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import styles from "./SignUp.module.css";
import { Trans, useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "../../stores/use-auth";

type FormState = {
  email: string;
  name: string;
  surname: string;
  dateOfBirth: Date;
  password: string;
};

export const SignUp = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const signUp = useAuth((state) => state.register);
  const { register, handleSubmit, control } = useForm<FormState>({
    mode: "onBlur",
  });

  const onSubmit = async (data: FormState) => {
    await signUp(data);
    navigate("/");
  };

  return (
    <Stack gap={32}>
      <Title order={2} className={styles.title} ta="center" mt="md">
        {t("welcome")}
      </Title>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
        <Button fullWidth mt="xl" size="md" type="submit">
          {t("signIn")}
        </Button>

        <Text ta="center" mt="md">
          <Trans
            t={t}
            i18nKey={"haveAccount"}
            components={{
              1: <Anchor component={NavLink} to={"../sign-in"} fw={700} />,
            }}
          />
        </Text>
      </form>
    </Stack>
  );
};
