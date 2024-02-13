import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const user = JSON.parse(localStorage.getItem("user"));
const token = user?.token;

const serverApiHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
};

const baseUrl = "http://localhost:5000";

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
        getHistory: builder.query({
            query: () => getRequest(`/user/${user?.id}/history`)
        }),
        deleteHistory: builder.mutation({
            query: (transaction_id) => deleteRequest(`/transactions/${transaction_id}`)
        })
    }),
});

export const { useTransactionMutation, useGetHistoryQuery, useDeleteHistoryMutation } = serverApi;
