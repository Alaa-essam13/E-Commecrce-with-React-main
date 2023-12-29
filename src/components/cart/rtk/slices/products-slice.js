import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("productsSlice/fetchProducts", async () => {
    const res = await fetch("http://localhost:9000/products");
    const data = await res.json();
    return data;
})

const ProductsSlice = createSlice({
    initialState: [],
    name: "ProductsSlice",
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})

export const { } = ProductsSlice.actions;
export default ProductsSlice.reducer;