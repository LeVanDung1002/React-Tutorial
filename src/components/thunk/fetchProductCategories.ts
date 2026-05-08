import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProductCategories = createAsyncThunk(
    "products/fetchProductCategories",
    async () => {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        return await res.json();
    }
);