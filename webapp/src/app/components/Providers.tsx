"use client";

import { Provider as ReduxProvider } from "react-redux";
import { store } from "../redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ThemeRegistry, { useThemeContext } from "./ThemeRegistry";

function AppHeader() {
  const { mode, toggle } = useThemeContext();

  return (
    <AppBar position="fixed" elevation={1}>
      <Toolbar>
        <Typography variant="h6" fontWeight={700} sx={{ flexGrow: 1 }}>
          Employee Manager
        </Typography>
        <IconButton color="inherit" onClick={toggle} aria-label="toggle theme">
          {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <ThemeRegistry>
        <AppHeader />
        <Box component="main" sx={{ mt: "64px" }}>
          {children}
        </Box>
        <div id="modal-root" />
        <Toast />
      </ThemeRegistry>
    </ReduxProvider>
  );
}
