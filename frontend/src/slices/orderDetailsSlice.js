import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: true,
};
const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,

  reducers: {
    orderDetailsRequest: (
      state = { loading: true, ordetItems: [], shippingAddress: {} },
      action
    ) => {
      state.loading = true;
    },
    orderDetailsSuccess: (
      state = { loading: true, ordetItems: [], shippingAddress: {} },
      action
    ) => {
      state.loading = false;

      state.order = action.payload.data;
    },
    orderDetailsFailed: (
      state = { loading: true, ordetItems: [], shippingAddress: {} },
      action
    ) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});

export const getOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch(orderDetailsRequest());
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `http://localhost:5000/api/orders/${id}`,
      config
    );
    dispatch(orderDetailsSuccess({ data }));
  } catch (error) {
    console.log(error);
    dispatch(orderDetailsFailed(error));
  }
};

export default orderDetailsSlice.reducer;
export const { orderDetailsSuccess, orderDetailsRequest, orderDetailsFailed } =
  orderDetailsSlice.actions;
