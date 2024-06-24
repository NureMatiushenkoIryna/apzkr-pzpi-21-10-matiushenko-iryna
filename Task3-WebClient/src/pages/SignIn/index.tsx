import {
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
  Stack,
} from "@mantine/core";
import styles from "./SignIn.module.css";
import { Trans, useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../stores/use-auth";

type FormState = {
  email: string;
  password: string;
};

export const SignIn = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const login = useAuth((state) => state.login);
  const { register, handleSubmit } = useForm<FormState>({
    mode: "onBlur",
  });

  const onSubmit = async (data: FormState) => {
    await login(data.email, data.password);
    navigate("/");
  };

  return (
    <Stack gap={32}>
      <Title order={2} className={styles.title} ta="center" mt="md">
        {t("welcomeBack")}
      </Title>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <TextInput
          label={t("email")}
          placeholder="hello@gmail.com"
          size="md"
          {...register("email")}
        />
        <PasswordInput
          label={t("password")}
          placeholder={t("yourPassword")}
          mt="md"
          size="md"
          {...register("password")}
        />
        <Button fullWidth mt="xl" size="md" type="submit">
          {t("signIn")}
        </Button>

        <Text ta="center" mt="md">
          <Trans
            t={t}
            i18nKey={"dontHaveAccount"}
            components={{
              1: <Anchor component={NavLink} to={"../sign-up"} fw={700} />,
            }}
          />
        </Text>
      </form>
    </Stack>
  );
};
