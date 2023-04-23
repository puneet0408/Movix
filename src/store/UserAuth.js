import { createSlice } from '@reduxjs/toolkit'
export const UserSlice = createSlice(
    {
        name: "user",
        initialState: {
            user: localStorage.getItem('user') ? localStorage.getItem('user') : null,
        },
        reducers: {
            User: (state, action) => {
                state.user = action.payload;
            },

            Logout: (state) => {
                state.user = null;
            },
        },
    }
);
export const { Login, Logout, User } = UserSlice.actions;
export default UserSlice.reducer;