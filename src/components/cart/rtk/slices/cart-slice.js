// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2';

export const cartSlice = createSlice({
    initialState: [],
    name: "cartSlice",
    reducers: {
        addToCart: (state, action) => {
            state.push(action.payload);
            Swal.fire({
                text: 'Added successfully',
                icon: 'success',
            });
        },
        deleteFromCart: (state, action) =>  {   
            return state.filter((p) => p.product.id !== action.payload.product.id);
        },
        clear: (state, action) => {
            return [];
        },
    }
});

export const { addToCart, deleteFromCart, clear } = cartSlice.actions;
export default cartSlice.reducer;
