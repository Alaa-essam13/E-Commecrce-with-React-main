import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export const Payments = createSlice({
    initialState: [],
    name: "cartSlice",
    reducers: {
        addPay: (state, action) => {
            state.push(state.payload)
            console.log(state)
        },
        Pays: (state, action) =>  {   
           return state
        }
    }
})

export const { addPay, Pays } = Payments.actions;
export default Payments.reducer;








