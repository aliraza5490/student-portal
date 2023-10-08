import theme from "@/config/theme";
import "@/styles/globals.css";
import { ThemeProvider } from "@mui/material";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
