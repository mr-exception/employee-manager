"use client";

import { Alert, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector, clearNotification } from "../redux";

export default function Toast() {
  const dispatch = useAppDispatch();
  const notification = useAppSelector((state) => state.notifications.current);

  return (
    <Snackbar
      open={notification !== null}
      autoHideDuration={4000}
      onClose={() => dispatch(clearNotification())}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        severity={notification?.severity}
        variant="filled"
        onClose={() => dispatch(clearNotification())}
      >
        {notification?.message}
      </Alert>
    </Snackbar>
  );
}
