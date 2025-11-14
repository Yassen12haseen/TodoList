import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { ToastProvider } from "./contexts/ToastProvider.jsx";
const theme = createTheme({
  palette: {
    primary: {
      main: "#A78BFA", // اللون الأساسي
      // اللون الأساسي
    },
    secondary: {
      main: "#a78bfa", // اللون الثانوي
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <ToastProvider>
          <App />
        </ToastProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </StrictMode>
);
