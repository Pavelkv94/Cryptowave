import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CoinHistoryDataType, ICoinStats, Icoin } from "../../types/coins.types";

const baseUrl = import.meta.env.VITE_SERVER_URL;

type CoinDataType = {
    stats: ICoinStats;
    coins: Icoin[];
};

type CoinDetailsDataType = {
    coin: Icoin;
};

type CoinHistoryPayloadType = {
    coinId: string | undefined;
    timePeriod: string;
};

type CoinHistoryType = {
    data: CoinHistoryDataType;
    isLoading: boolean;
};

export const cryptoApi = createApi({
    reducerPath: "cryptoApi",
    baseQuery: fetchBaseQuery({
        baseUrl
    }),
    endpoints: (builder) => ({
        getCryptos: builder.query<CoinDataType, number>({
            query: (count) => `${baseUrl}/external/coins?count=${count}`
        }),
        getCryptoDetails: builder.query<CoinDetailsDataType, string>({
            query: (coinId) => `${baseUrl}/external/coin/${coinId}`
        }),
        getCryptoHistory: builder.query<CoinHistoryType, CoinHistoryPayloadType>({
            query: ({ coinId, timePeriod }) => `${baseUrl}/external/coin/${coinId}/history?timePeriod=${timePeriod}`
        })
    })
});

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } = cryptoApi;
