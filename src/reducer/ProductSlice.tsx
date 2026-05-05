import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchProducts } from "../components/thunk/fetchProduct";
import { fetchProductById } from "../components/thunk/fetchProductById";

type ProductType = {
    id: string,
    image: string,
    desc: string,
    price: number
}

type ProductState = {
    products: ProductType[]
    selectedProduct: ProductType | null
    isLoading: boolean
    error: string | null
}

const initialState: ProductState = {
    products: [],
    selectedProduct: null,
    isLoading: false,
    error: null
}

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        clearSelectedProduct: (state) => {
            state.selectedProduct = null
        }
    },
    extraReducers: (builder) => {
        // list
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductType[]>) => {
                state.isLoading = false
                state.products = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message || "Error"
            })

        // detail
        builder
            .addCase(fetchProductById.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<ProductType>) => {
                state.isLoading = false
                state.selectedProduct = action.payload
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message || "Error"
            })
    }
})

export const { clearSelectedProduct } = productSlice.actions
export default productSlice.reducer