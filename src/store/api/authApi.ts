import { createApi } from "@reduxjs/toolkit/query/react";
import { ILoginOutput, IUser, IUserLogin } from "../../types/user.types";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import axiosInstance from "../../http";
import { setUser } from "../user/user.slice";

const authApiHeaders = {
    "Content-Type": "application/json"
};

const baseUrl = import.meta.env.VITE_SERVER_URL;

const token: string = localStorage.getItem("token") || "";

type AvatarPayloadType = {
    avatar_url: string;
    user_id: string;
};

const getAuthorizedRequest = (url: string) => ({ url, headers: { ...authApiHeaders, Authorization: `Bearer ${token}` } });

const postRequest = (url: string, method: string, payload: object) => ({ url, method, data: payload, headers: { ...authApiHeaders } });

const postAuthorizedRequest = (url: string, method: string, payload: object) => ({
    url,
    method,
    body: payload,
    headers: { ...authApiHeaders, Authorization: `Bearer ${JSON.parse(token)}` }
});

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
        } catch (axiosError: unknown) {
            const err = axiosError as AxiosError;
            return {
                error: {
                    status: err.response?.status || 500,
                    data: err.response?.data || err.message
                }
            };
        }
    };

export const authApi = createApi({
    reducerPath: "authApi",
    tagTypes: ["UserAvatar", "Me"],
    baseQuery: axiosBaseQuery({
        baseUrl
    }),
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (user_id) => getAuthorizedRequest(`/auth/avatar/${user_id}`),
            providesTags: ["UserAvatar"]
        }),
        getMe: builder.query({
            query: () => getAuthorizedRequest("/auth/me"),
            providesTags: ["Me"],
            onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data)); // Store the response data in Redux state
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        }),
        login: builder.mutation<ILoginOutput, IUserLogin>({
            query: (payload) => {
                return postRequest("/auth/login", "POST", payload);
            },
            async onQueryStarted(payload, { dispatch, queryFulfilled }) {
                try {
                    console.log("AFTER LOGIN");

                    const { data } = await queryFulfilled;
                    localStorage.setItem("token", data.accessToken); // Save token after login
                    // Optionally invalidate "Me" tag to refresh user info after login
                    dispatch(authApi.util.invalidateTags(["Me"]));
                } catch (error) {
                    console.error("Login failed:", error);
                }
            }
        }),
        registration: builder.mutation<IUser, IUserLogin>({
            query: (payload) => postRequest("/auth/registration", "POST", payload)
        }),
        updateAvatar: builder.mutation<null, AvatarPayloadType>({
            query: (payload) => postAuthorizedRequest(`/auth/user/${payload.user_id}/updateAvatar`, "POST", { avatar_url: payload.avatar_url }),
            invalidatesTags: ["UserAvatar"]
        })
    })
});

export const { useRegistrationMutation, useUpdateAvatarMutation, useGetUserQuery, useGetMeQuery, useLoginMutation } = authApi;
