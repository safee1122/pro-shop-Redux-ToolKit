import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};
const orderSlice = createSlice({
  name: "order",
  initialState,

  reducers: {
    orderCreateRequest: (state, action) => {
      state.loading = true;
    },
    orderCreateSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.order = action.payload.data;
    },
    orderCreateFailed: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    console.log(dispatch);
    dispatch(orderCreateRequest());
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `http://localhost:5000/api/orders`,
      order,
      config
    );
    dispatch(orderCreateSuccess({ data }));
  } catch (error) {
    console.log(error);
    dispatch(orderCreateFailed(error));
  }
};

export default orderSlice.reducer;
export const { orderCreateSuccess, orderCreateRequest, orderCreateFailed } =
  orderSlice.actions;
