import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//@ts-ignore
const user = JSON.parse(localStorage.getItem("user"));
const token = user?.token;

const serverApiHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
    'ngrok-skip-browser-warning': 'true' 
};

const baseUrl = import.meta.env.VITE_SERVER_URL;

const getRequest = (url: string) => ({ url, headers: serverApiHeaders });
const deleteRequest = (url: string) => ({ url, method: "DELETE", headers: serverApiHeaders });

const postRequest = (url: string, method: string, payload: object) => ({ url, method, body: payload, headers: serverApiHeaders });

export const serverApi = createApi({
    reducerPath: "serverApi",
    baseQuery: fetchBaseQuery({
        baseUrl
    }),
    endpoints: (builder) => ({
        transaction: builder.mutation({
            query: (payload) => postRequest("/transactions", "POST", payload)
        }),
        getHistory: builder.query<null, null>({
            query: () => getRequest(`/user/${user?.id}/history`)
        }),
        deleteHistory: builder.mutation<string, null>({
            query: (transaction_id) => deleteRequest(`/transactions/${transaction_id}`)
        }),
        addWatchitem: builder.mutation<null, object>({
            query: (payload) => postRequest("/watchlist ", "POST", payload)
        }),
        getWatchList: builder.query({
            query: () => getRequest(`/user/${user?.id}/watchlist`)
        }),
        deleteWatchItem: builder.mutation<string, null>({
            query: (watch_item_id) => deleteRequest(`/watchlist/${watch_item_id}`)
        })
    }),
});

export const { useTransactionMutation, useGetHistoryQuery, useDeleteHistoryMutation, useAddWatchitemMutation, useDeleteWatchItemMutation, useGetWatchListQuery } = serverApi;
