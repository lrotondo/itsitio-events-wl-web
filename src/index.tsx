import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import theme from "./utils/theme";
import "@fontsource/raleway/500.css";
import "@fontsource/roboto/400.css";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

const queryClient = new QueryClient();

root.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <App />
                    {process.env.NODE_ENV === "development" && (
                        <ReactQueryDevtools />
                    )}
                </BrowserRouter>
            </QueryClientProvider>
        </ChakraProvider>
    </React.StrictMode>
);
