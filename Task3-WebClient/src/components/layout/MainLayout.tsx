import { AppShell, Container, Stack } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { Header } from "./Header/Header";

export const MainLayout = () => {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main display="flex">
        <Container size="xl" component={Stack} w={"100%"}>
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};
