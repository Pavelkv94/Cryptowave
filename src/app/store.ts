import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/cryptoApi";
import { cryptoNewsApi } from "../services/cryptoNewsApi";
import { cryptoExchangesApi } from "../services/cryptoExchangesAPI";
import { authApi } from "../services/authApi";
import { serverApi } from "../services/serverApi";
import userSlice from "../Slices/userSlice";

export const store =  configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
        [cryptoExchangesApi.reducerPath]: cryptoExchangesApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [serverApi.reducerPath]: serverApi.reducer,
        user: userSlice

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(cryptoApi.middleware)
            .concat(cryptoNewsApi.middleware)
            .concat(cryptoExchangesApi.middleware)
            .concat(authApi.middleware)
            .concat(serverApi.middleware)

});

export type RootState = ReturnType<typeof store.getState>
