import { colorHex } from "@/constants";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    // primary: {},
    secondary: {
      main: colorHex.RED,
    },
  },
});
