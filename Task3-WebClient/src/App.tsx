import "@mantine/core/styles.css";
import '@mantine/dates/styles.css';
import "./App.css";
import { PropsWithChildren } from "react";
import { MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router-dom";
import { router } from "./utils/router";

function App({}: PropsWithChildren) {
  return (
    <MantineProvider defaultColorScheme="dark">
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
