import { createTheme, ThemeOptions } from "@mui/material/styles";

const theme: ThemeOptions = createTheme({
  palette: {
    primary: { main: "#f1f5fb" },
    secondary: { main: "#000000" },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

export default theme;
