import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store.ts";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <ChakraProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ChakraProvider>
    </Provider>
);
