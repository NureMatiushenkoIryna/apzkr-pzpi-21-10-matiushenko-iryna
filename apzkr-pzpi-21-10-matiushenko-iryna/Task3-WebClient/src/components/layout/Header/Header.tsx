import { Button, Container, Group, Title } from "@mantine/core";
import { useAuth } from "../../../stores/use-auth";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";
import { LanguageSelector } from "./LanguageSelector";
import { HeaderNavigation } from "./HeaderNavigation";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const { accessToken, logout } = useAuth(
    ({ accessToken, logout }) => ({ accessToken, logout }),
    shallow
  );

  const signedIn = !!accessToken;

  const { t } = useTranslation();

  return (
    <Container
      h={"100%"}
      size={1520}
      renderRoot={(props) => <Group justify="space-between" {...props} />}
    >
      <HeaderNavigation />
      <Title
        ta="center"
        style={{
          fontFamily: "Smooch Sans",
        }}
        flex="0 1 fit-content"
      >
        EV Friend
      </Title>
      <Group gap={20} flex={1} justify="space-evenly">
        <LanguageSelector />
        {signedIn && (
          <Button
            variant="danger"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            {t("signOut")}
          </Button>
        )}
      </Group>
    </Container>
  );
};
