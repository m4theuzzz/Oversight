import { ThemeProvider } from "@mui/material";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { theme } from "../styles/theme";
import MainLayout from "../components/MainLayout";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRouter } from "next/router";
import AuthGuard from "../components/auth/AuthGuard";
import { AuthProvider } from "../context/AuthContext";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const { pathname } = useRouter();

  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <AuthProvider guard={Component.guard ?? true}>
            <AuthGuard guard={Component.guard ?? true}>
              <MainLayout
                hideNav={pathname === "/login" || pathname === "/emailbridge"}
              >
                <Component {...pageProps} />
                <Toaster position={"top-right"} toastOptions={{style: {marginTop: 80, marginRight: 70}}}/>
              </MainLayout>
            </AuthGuard>
          </AuthProvider>

         
        </ThemeProvider>
      </QueryClientProvider>
    </main>
  );
}

export default MyApp;
