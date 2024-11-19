// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { IUserLogin } from "../../types/user.types";
// import axios from "axios";

// const backendURL = import.meta.env.VITE_SERVER_URL;

// export const userLogin = createAsyncThunk("/auth/login", async ({ email, password }: IUserLogin, { rejectWithValue }) => {
//     try {
//         // configure header's Content-Type as JSON
//         const config = {
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             withCredentials: true
//         };
//         const { data } = await axios.post(`${backendURL}/auth/login`, { email, password }, config);
//         // store user's token in local storage
//         localStorage.setItem("token", JSON.stringify(data.accessToken));
//         return data;
//     } catch (error) {
//         return rejectWithValue({}); //для обработки ошибок
//     }
// });

// export const logoutUser = createAsyncThunk("/auth/logout", async (data, { rejectWithValue }) => {
//     try {
//         // remove user's token in local storage
//         localStorage.removeItem("token");

//         return data;
//     } catch (error) {
//         return rejectWithValue({}); //для обработки ошибок
//     }
// });
