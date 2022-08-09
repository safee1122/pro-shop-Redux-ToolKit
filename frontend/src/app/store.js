import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../slices/productSlice";
import productDetailReducer from "../slices/productDetailSlice";
import cartReducer from "../slices/cartSlice";
import userLoginSlice from "../slices/userLoginSlice";
import userRegisterSlice from "../slices/userRegisterSlice";
import orderSlice from "../slices/orderSlice";
import orderDetailsSlice from "../slices/orderDetailsSlice";
import orderPaySlice from "../slices/orderPaySlice";
export const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails: productDetailReducer,
    cart: cartReducer,
    user: userLoginSlice,
    userRegister: userRegisterSlice,
    orderCreate: orderSlice,
    orderDetails: orderDetailsSlice,
    orderPay: orderPaySlice,
  },
});
