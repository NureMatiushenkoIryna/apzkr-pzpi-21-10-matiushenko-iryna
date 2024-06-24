import { Paper, Stack } from "@mantine/core";
import styles from "./AuthLayout.module.css";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className={styles.wrapper}>
      <Paper
        className={styles.form}
        component={Stack}
        justify="center"
        radius={0}
        p={30}
      >
        <Outlet />
      </Paper>
    </div>
  );
};
