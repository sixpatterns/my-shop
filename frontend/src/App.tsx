import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { ComponentProps } from "react";
import { BrowserRouter } from "react-router";

import { Routes } from "./pages/Routes";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const theme: ComponentProps<typeof ConfigProvider>["theme"] = {
  token: {
    colorPrimary: "#00b96b",
  },
};

const App = () => {
  return (
    <ConfigProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </QueryClientProvider>
    </ConfigProvider>
  );
};

export default App;
