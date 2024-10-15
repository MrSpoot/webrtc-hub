import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren } from "react";
import { Toaster } from "../components/ui/toaster";

function AppProviders({ children }: PropsWithChildren) {
  return (
    <TanstackQueryProvider>
      {children}
      <Toaster />
    </TanstackQueryProvider>
  );
}

const queryClient = new QueryClient();
function TanstackQueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
    </QueryClientProvider>
  );
}

export default AppProviders;
