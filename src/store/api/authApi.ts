import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser, IUserLogin } from "../../types/user.types";
// import { checkAuth } from "../user/user.actions";

const authApiHeaders = {
    "Content-Type": "application/json"
};

const baseUrl = import.meta.env.VITE_SERVER_URL;

const token: string = localStorage.getItem("token") || "";

type AvatarPayloadType = {
    avatar_url: string;
    user_id: string;
};

const getAuthorizedRequest = (url: string) => ({ url, headers: { ...authApiHeaders, Authorization: `Bearer ${JSON.parse(token)}` } });

const postRequest = (url: string, method: string, payload: object) => ({ url, method, body: payload, headers: { ...authApiHeaders } });

const postAuthorizedRequest = (url: string, method: string, payload: object) => ({
    url,
    method,
    body: payload,
    headers: { ...authApiHeaders, Authorization: `Bearer ${JSON.parse(token)}` }
});

export const authApi = createApi({
    reducerPath: "authApi",
    tagTypes: ["UserAvatar"],
    baseQuery: fetchBaseQuery({
        baseUrl
    }),
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (user_id) => getAuthorizedRequest(`/api/auth/avatar/${user_id}`),
            providesTags: ["UserAvatar"]
        }),
        registration: builder.mutation<IUser, IUserLogin>({
            query: (payload) => postRequest("/api/auth/registration", "POST", payload)
        }),
        login: builder.mutation<IUser, IUserLogin>({
            query: (payload) => postRequest("/api/auth/login", "POST", payload),
        }),
        updateAvatar: builder.mutation<null, AvatarPayloadType>({
            query: (payload) => postAuthorizedRequest(`/api/auth/user/${payload.user_id}/updateAvatar`, "POST", { avatar_url: payload.avatar_url }),
            invalidatesTags: ["UserAvatar"],
            
        })
    })
});

export const { useRegistrationMutation, useLoginMutation, useUpdateAvatarMutation, useGetUserQuery } = authApi;
