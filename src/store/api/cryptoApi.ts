import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CoinHistoryDataType, ICoinStats, Icoin } from "../../types/coins.types";

const cryptoApiHeaders = {
    "X-RapidAPI-Key": import.meta.env.VITE_COINDESK_APIKEY,
    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    "ngrok-skip-browser-warning": "true"
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const getRequest = (url: string) => ({ url, headers: cryptoApiHeaders });

type CoinDataType = {
    data: {
        stats: ICoinStats;
        coins: Icoin[];
    };
    isLoading: boolean;
};

type CoinDetailsDataType = {
    data: {
        coin: Icoin;
    };
    isLoading: boolean;
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
            query: (count) => getRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query<CoinDetailsDataType, string>({
            query: (coinId) => getRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query<CoinHistoryType, CoinHistoryPayloadType>({
            query: ({ coinId, timePeriod }) => getRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`)
        })
    })
});

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } = cryptoApi;
