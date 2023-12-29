import { configureStore } from '@reduxjs/toolkit'
import productsSlice from './slices/products-slice'
import cartSlice from './slices/cart-slice'
import searchSlice from './slices/searchSlice'
import Payments from './slices/paymnet'

export const store = configureStore({
  reducer: {
    products : productsSlice,
    search : searchSlice,
    pays:Payments,
    cart : cartSlice,
  }
}) 