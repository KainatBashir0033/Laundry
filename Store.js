import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartReducer";
import ProductReducer from "./ProductReducer";

import pickupDetailsReducer from './pickupDetailsSlice';

export default configureStore({
    reducer:{
        cart:CartReducer,
        product:ProductReducer,
         pickupDetails: pickupDetailsReducer,
    }
})