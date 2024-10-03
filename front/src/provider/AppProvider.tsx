"use client";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { PropsWithChildren } from "react";

function AppProviders({ children }: PropsWithChildren) {
  return (
    <TanstackQueryProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        {children}
        <Toaster />
      </ThemeProvider>
    </TanstackQueryProvider>
  );
}

const queryClient = new QueryClient();
function TanstackQueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-left" />
    </QueryClientProvider>
  );
}

function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export default AppProviders;
