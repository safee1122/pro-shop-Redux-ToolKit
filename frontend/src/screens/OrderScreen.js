import { useState, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { getOrder } from "../slices/orderDetailsSlice";
import { payOrder } from "../slices/orderPaySlice";
const stripePromise = loadStripe(
  "pk_test_51LPQqCBzjsuGY5RngYhTldob6x5SVRLYGuqFoWeXzt5oRAP1j177XobMSZmevCygoKUoz3HDO050jBFLt32nuwg0006wXafzDj"
);

function OrderScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("useEffect");
    dispatch(getOrder(id));
    dispatch(payOrder(id));
  }, [dispatch, id]);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { clientSecret } = useSelector((state) => state.orderPay);

  const { order, loading, error } = orderDetails;

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return loading ? (
    <Loader></Loader>
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>

      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default OrderScreen;
