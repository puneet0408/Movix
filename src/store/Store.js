import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./HomeSlice";
import UserSlice from "./UserAuth";
export const store = configureStore({
    reducer: {
        home: homeSlice,
        user: UserSlice
    }
});