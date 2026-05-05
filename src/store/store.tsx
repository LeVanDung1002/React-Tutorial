import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../reducer/UserSlice"
import productSlice from "../reducer/ProductSlice"
import todoSlice from "../reducer/TodoSlice"

export const store = configureStore({
    reducer: {
        user: userSlice,
        products: productSlice,
        todos: todoSlice
    }
})