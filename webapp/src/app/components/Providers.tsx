"use client";

import { useMemo, useState } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../redux";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return (
    <ReduxProvider store={store}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar position="fixed" elevation={1}>
            <Toolbar>
              <Typography variant="h6" fontWeight={700} sx={{ flexGrow: 1 }}>
                Employee Manager
              </Typography>
              <IconButton color="inherit" onClick={() => setMode((m) => (m === "light" ? "dark" : "light"))} aria-label="toggle theme">
                {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box component="main" sx={{ mt: "64px" }}>
            {children}
          </Box>
          <div id="modal-root" />
        </ThemeProvider>
      </AppRouterCacheProvider>
    </ReduxProvider>
  );
}
