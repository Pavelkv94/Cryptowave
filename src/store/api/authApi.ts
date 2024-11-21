import { createApi } from "@reduxjs/toolkit/query/react";
import { ILoginOutput, IUser, IUserLogin } from "../../types/user.types";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import axiosInstance from "../../http";
import { setIsAuth, setUser } from "../user/user.slice";

const authApiHeaders = {
    "Content-Type": "application/json"
};

const baseUrl = import.meta.env.VITE_SERVER_URL;

const getToken = (): string => localStorage.getItem("token") || "";

type AvatarPayloadType = {
    avatar_url: string;
};

const getAuthorizedRequest = (url: string) => ({ url, headers: { ...authApiHeaders, Authorization: `Bearer ${getToken()}` } });

const postRequest = (url: string, method: string, payload: object) => ({ url, method, data: payload, headers: { ...authApiHeaders } });

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
            onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
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
            async onQueryStarted(_payload, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    localStorage.setItem("token", data.accessToken); // Save token after login
                    dispatch(setIsAuth(true)); // Store the response data in Redux state
                } catch (error) {
                    console.error("Login failed:", error);
                }
            },
            invalidatesTags: ["Me"]
        }),
        registration: builder.mutation<IUser, IUserLogin>({
            query: (payload) => postRequest("/auth/registration", "POST", payload)
        }),
        registrationConfirmation: builder.mutation<null, { code: string | null }>({
            query: (payload) => postRequest("/auth/registration-confirmation", "POST", payload)
        }),
        updateAvatar: builder.mutation<null, AvatarPayloadType>({
            query: (payload) => ({ url: `/users/updateAvatar`, method: "POST", data: { avatar_url: payload.avatar_url }, withCredentials: true }),
            invalidatesTags: ["UserAvatar", "Me"]
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
                headers: { ...authApiHeaders } // No token needed for logout
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;

                    // Clear the token from localStorage
                    localStorage.removeItem("token");

                    // Optionally reset auth-related state
                    dispatch(setIsAuth(false));
                    dispatch(setUser(null)); // Reset user state
                } catch (error) {
                    console.error("Logout failed:", error);
                }
            }
        }),
        registrationEmailResending: builder.mutation<null, { email: string }>({
            query: (payload) => postRequest("/auth/registration-email-resending", "POST", payload)
        })
    })
});

export const {
    useRegistrationMutation,
    useUpdateAvatarMutation,
    useGetUserQuery,
    useGetMeQuery,
    useLoginMutation,
    useLogoutMutation,
    useRegistrationConfirmationMutation,
    useRegistrationEmailResendingMutation
} = authApi;
