import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./homeSlice";
//import { combineReducers } from "@reduxjs/toolkit";


// const reducer = combineReducers({
//   home: homeSlice,
// })
export const store = configureStore({
    reducer: {
        home: homeSlice
    }
});