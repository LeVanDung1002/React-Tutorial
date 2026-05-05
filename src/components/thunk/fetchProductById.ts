import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProductById = createAsyncThunk(
    "products/fetchById",
    async (id: string) => {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        return await res.json();
    }
);