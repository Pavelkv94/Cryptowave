import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store.ts";
import { ChakraProvider } from "@chakra-ui/react";


ReactDOM.createRoot(document.getElementById("root")!).render(
    <HashRouter>
        <Provider store={store}>
            <ChakraProvider>
                <App />
            </ChakraProvider>
        </Provider>
    </HashRouter>
);
