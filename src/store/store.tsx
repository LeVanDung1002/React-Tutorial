import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../reducer/UserSlice"

export const store = configureStore({
    reducer: {
        user: userSlice
    }
})