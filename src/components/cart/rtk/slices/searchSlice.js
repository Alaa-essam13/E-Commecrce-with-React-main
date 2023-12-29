// categorySlice.js
import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'category',
  initialState: "", 
  reducers: {
    setStr: (state, action) => {
      console.log(action.payload)
      return action.payload
    },
  },
});

export const { setStr} = searchSlice.actions;
export default searchSlice.reducer;
