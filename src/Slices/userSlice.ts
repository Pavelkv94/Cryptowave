// userSlice.js

import { createSlice } from "@reduxjs/toolkit";

type UserStateType = {
    user: any;
    isLoggedIn: boolean;
};
const initialState: UserStateType = {
    user: null, // Initially user is null
    isLoggedIn: false // Initially user is not logged in
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        clearUser: (state) => {
            state.user = null;
            state.isLoggedIn = false;
        }
    }
});

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = (state: UserStateType) => state.user.user;

export const selectIsLoggedIn = (state: UserStateType) => state.user.isLoggedIn;

export default userSlice.reducer;
