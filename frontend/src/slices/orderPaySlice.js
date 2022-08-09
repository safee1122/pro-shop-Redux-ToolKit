import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  clientSecret: "",
};
const orderPaySlice = createSlice({
  name: "orderPay",
  initialState,

  reducers: {
    orderPayRequest: (state = { loading: true }, action) => {
      state.loading = true;
    },
    orderPaySuccess: (state = { loading: false, success: true }, action) => {
      state.loading = false;

      state.clientSecret = action.payload.data.clientSecret;
    },
    orderPayFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    orderPayReset: (state, action) => {
      state = {};
    },
  },
});
export const payOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch(orderPayRequest());
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `http://localhost:5000/api/orders/${orderId}/pay`,
      config
    );
    dispatch(orderPaySuccess({ data }));
  } catch (error) {
    console.log(error);
    dispatch(orderPayFailed(error));
  }
};

export default orderPaySlice.reducer;
export const {
  orderPaySuccess,
  orderPayRequest,
  orderPayFailed,
  orderPayReset,
} = orderPaySlice.actions;
