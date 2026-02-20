"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

interface ThemeContextValue {
  mode: "light" | "dark";
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({ mode: "light", toggle: () => {} });

export function useThemeContext() {
  return useContext(ThemeContext);
}

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "light" ? "#009688" : "#4DB6AC",
          },
        },
      }),
    [mode]
  );

  const toggle = () => setMode((m) => (m === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
    </ThemeContext.Provider>
  );
}
