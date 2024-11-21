import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/user.types";

interface UserState {
    userData: IUser | null;
    isAuth: boolean;
}

const initialState: UserState = {
    userData: null,
    isAuth: false
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser | null>) {
            state.userData = action.payload;
        },
        setIsAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload;
        },

        clearUser(state) {
            state.userData = null;
        }
    },
    extraReducers: (builder) => {
        builder;
        // .addCase(userLogin.pending, (state) => {
        //     state.isLoading = true;
        // })
        // .addCase(userLogin.fulfilled, (state, action: PayloadAction<IUser>) => {
        //     state.isLoading = false;
        //     state.isAuth = true;
        //     state.userData = action.payload;
        // })
        // // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // .addCase(userLogin.rejected, (state, action: PayloadAction<any>) => {
        //     state.isLoading = false;
        //     state.error = action.payload.error;
        //     state.userData = null;
        // });

        // builder
        // .addCase(getMe.pending, (state) => {
        //     state.isLoading = true;
        // })
        // .addCase(getMe.fulfilled, (state, action: PayloadAction<IUser>) => {
        //     state.isLoading = false;
        //     state.isAuth = true;
        //     state.userData = action.payload;
        // })
        // // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // .addCase(getMe.rejected, (state, action: PayloadAction<any>) => {
        //     state.isLoading = false;
        //     state.error = action.payload.error;
        //     state.userData = null;
        // });

        // builder
        // .addCase(checkAuth.pending, (state) => {
        //     state.isLoading = true;
        //     state.isAuth = false;
        // })
        // .addCase(checkAuth.fulfilled, (state, action: PayloadAction<IUser>) => {
        //     state.isLoading = false;
        //     state.isAuth = true;
        //     state.userData = action.payload;
        // })
        // // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // .addCase(checkAuth.rejected, (state, action: PayloadAction<any>) => {
        //     state.isLoading = false;
        //     state.isAuth = false;
        //     state.error = action.payload.error;
        //     state.userData = null;
        // });

        // builder.addCase(logoutUser.fulfilled, (state) => {
        //     state.isLoading = false;
        //     state.isAuth = false;
        //     state.userData = null;
        // });
    }
});

export const { setUser, setIsAuth, clearUser } = userSlice.actions;

export default userSlice.reducer;
