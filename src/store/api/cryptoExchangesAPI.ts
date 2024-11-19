import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IExchanges } from "../../types/coins.types";

const baseUrl = import.meta.env.VITE_SERVER_URL;

export const cryptoExchangesApi = createApi({
    reducerPath: "cryptoExchangesApi",
    baseQuery: fetchBaseQuery({
        baseUrl
    }),
    endpoints: (builder) => ({
        getCryptosExchanges: builder.query<IExchanges[], null>({
            query: () => baseUrl + "/external/exchanges"
        })
    })
});

export const { useGetCryptosExchangesQuery } = cryptoExchangesApi;
