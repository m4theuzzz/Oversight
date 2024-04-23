import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#38A3A5",
    },
    secondary: {
      main: "#1B8284",
    },
    background: {
      default: "#EFF2F5",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#696D73"
     
    },
  },
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Helvetica",
      "Arial",
      "sans-serif",
      "Apple Color Emoji",
      "Twemoji Mozilla",
      "Segoe UI Symbol",
      "Noto Color Emoji",
      "EmojiOne Color",
      "Android Emoji",
      "Segoe UI Emoji",
    ].join(","),
  },
});
