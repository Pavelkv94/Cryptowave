import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApiHeaders = {
    "Content-Type": "application/json"
};

const baseUrl = import.meta.env.VITE_SERVER_URL;

const user = localStorage.getItem("user");
//@ts-ignore
const token = JSON.parse(user)?.token;
//@ts-ignore
const user_id = JSON.parse(user)?.id;

    //@ts-ignore
const getRequest = (url: string) => ({ url, headers: authApiHeaders });
const getAuthorizedRequest = (url: string) => ({ url, headers: {...authApiHeaders, "Authorization": `Bearer ${token}`} });

const postRequest = (url: string, method: string, payload: object) => ({ url, method, body: payload, headers: authApiHeaders });

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl
    }),
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (user_id) => getAuthorizedRequest(`/me/${user_id}`)
        }),
        registration: builder.mutation({
            query: (payload) => postRequest("/registration", "POST", payload)
        }),
        login: builder.mutation({
            query: (payload) => postRequest("/login", "POST", payload)
        }),
        updateAvatar: builder.mutation({
            query: (payload) => postRequest(`/user/${user_id}/updateAvatar`, "POST", payload)
        }),
    }),
});

export const { useGetUserQuery, useRegistrationMutation, useLoginMutation, useUpdateAvatarMutation } = authApi;
