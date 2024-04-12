import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/user.types";
import { checkAuth, logoutUser, userLogin } from "./user.actions";

type InitialStateType = {
    isLoading: boolean;
    error: null;
    userData: IUser | null;
    isAuth: boolean
};
// const user = localStorage.getItem("user") ? localStorage.getItem("user") : null;

const initialState: InitialStateType = {
    isLoading: false,
    error: null,
    userData: null,
    isAuth: false
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(userLogin.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.isLoading = false;
                state.isAuth = true;
                state.userData = action.payload;
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .addCase(userLogin.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.error = action.payload.error;
                state.userData = null;
            });


            builder
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
                state.isAuth = false;
            })
            .addCase(checkAuth.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.isLoading = false;
                state.isAuth = true;
                state.userData = action.payload;
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .addCase(checkAuth.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isAuth = false;
                state.error = action.payload.error;
                state.userData = null;
            });

            builder
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.isAuth = false;
                state.userData = null;
            })
    }
});

export const { actions } = userSlice;

export default userSlice.reducer;
