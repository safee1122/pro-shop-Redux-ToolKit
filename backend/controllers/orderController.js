import asyncHandler from "express-async-handler";
import Order from "./../models/orderModel.js";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51LPQqCBzjsuGY5RngaWp89qLgYNkFnkUH9uezMhmZ3ehtAeXMJhj0D9w6S5LUQTzm0D97oIc20FnkqBwA9OxaIgf00UwRnfJxc"
);

const addOrderItems = asyncHandler(async (req, res) => {
  console.log(req.body);
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("no order items");
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
  }
});
const payOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    console.log(order.totalPrice);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.floor(order.totalPrice),
      currency: "gbp",
      payment_method: "pm_card_visa",
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(404);
  }
});
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
  }
});
export { addOrderItems, getOrderById, updateOrderToPaid, payOrder };
