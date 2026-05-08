import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchProducts } from "../components/thunk/fetchProduct";
import { fetchProductById } from "../components/thunk/fetchProductById";
import { fetchProductCategories } from "../components/thunk/fetchProductCategories";

export type ProductType = {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
        rate: number
        count: number
    }
}
type ProductState = {
    products: ProductType[]
    selectedProduct: ProductType | null
    isLoading: boolean
    error: string | null
    categories: string[]
}

const initialState: ProductState = {
    products: [],
    selectedProduct: null,
    isLoading: false,
    error: null,
    categories: []
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
                state.error = null
            })

            .addCase(
                fetchProducts.fulfilled,
                (state, action: PayloadAction<ProductType[]>) => {
                    state.isLoading = false
                    state.products = action.payload
                }
            )

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

        // category
        builder
            .addCase(fetchProductCategories.pending, (state) => {
                state.isLoading = true
                state.error = null
            })

            .addCase(
                fetchProductCategories.fulfilled,
                (state, action: PayloadAction<string[]>) => {
                    state.isLoading = false
                    state.categories = action.payload
                }
            )

            .addCase(fetchProductCategories.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message || "Error"
            })

    }
})

export const { clearSelectedProduct } = productSlice.actions
export default productSlice.reducer