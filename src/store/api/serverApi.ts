import { createApi } from "@reduxjs/toolkit/query/react";
import axiosInstance from "../../http";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { IUserHistoryItem } from "../../types/user.types";
import { IWatchItem } from "../../types/coins.types";

const baseUrl = import.meta.env.VITE_SERVER_URL;

const axiosBaseQuery =
    ({ baseUrl } = { baseUrl: "" }) =>
    async ({ url, method, data, params, headers }: AxiosRequestConfig) => {
        try {
            const result: AxiosResponse = await axiosInstance({
                url: baseUrl + url,
                method,
                data,
                params,
                headers
            });
            return { data: result.data };
        } catch (err: unknown) {
            return {
                error: err
            };
        }
    };

export const serverApi = createApi({
    reducerPath: "serverApi",
    baseQuery: axiosBaseQuery({
        baseUrl
    }),
    tagTypes: ["Transactions", "WatchCoins"],
    endpoints: (builder) => ({
        addTransaction: builder.mutation({
            query: (payload) => ({ url: "/transactions", method: "POST", data: payload }),
            invalidatesTags: ["Transactions"]
        }),
        getHistory: builder.query<IUserHistoryItem[], null>({
            query: () => ({ url: `/transactions/history`, method: "GET" }),
            providesTags: ["Transactions"]
        }),
        deleteHistory: builder.mutation<null, string>({
            query: (transaction_id) => ({ url: `/transactions/${transaction_id}`, method: "DELETE" }),
            invalidatesTags: ["Transactions"]
        }),
        //===
        addWatchitem: builder.mutation<null, object>({
            query: (payload) => ({ url: "/watchlist", method: "POST", data: payload }),
            invalidatesTags: ["WatchCoins"]
        }),
        getWatchList: builder.query<IWatchItem[], null>({
            query: () => ({ url: `/watchlist`, method: "GET" }),
            providesTags: ["WatchCoins"]
        }),
        deleteWatchItem: builder.mutation<null, string>({
            query: (watch_item_id) => ({ url: `/watchlist/${watch_item_id}`, method: "DELETE" }),
            invalidatesTags: ["WatchCoins"]
        })
    })
});

export const {
    useAddTransactionMutation,
    useGetHistoryQuery,
    useDeleteHistoryMutation,
    useAddWatchitemMutation,
    useDeleteWatchItemMutation,
    useGetWatchListQuery
} = serverApi;
