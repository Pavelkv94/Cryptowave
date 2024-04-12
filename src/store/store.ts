import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { createLogger } from "redux-logger";
import { useSelector } from "react-redux";
import { cryptoApi } from "./api/cryptoApi";
import { cryptoNewsApi } from "./api/cryptoNewsApi";
import { cryptoExchangesApi } from "./api/cryptoExchangesAPI";
import { authApi } from "./api/authApi";
import { serverApi } from "./api/serverApi";
import userSlice from "./user/user.slice";

const logger = createLogger();
const reducers = combineReducers({
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    [cryptoExchangesApi.reducerPath]: cryptoExchangesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [serverApi.reducerPath]: serverApi.reducer,
    user: userSlice,

});

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(cryptoApi.middleware)
            .concat(cryptoNewsApi.middleware)
            .concat(cryptoExchangesApi.middleware)
            .concat(authApi.middleware)
            .concat(serverApi.middleware)
            .concat(logger)
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector = useSelector.withTypes<RootState>();
