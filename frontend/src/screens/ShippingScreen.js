import { useState, useEffect } from "react";
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress, orderSummary } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingScreeen() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [city, setCity] = useState(shippingAddress.city);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, postalCode, city, country }));
    navigate("/payment");
  };

  return (
    <>
      <FormContainer>
        <CheckoutSteps step1 />
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
          <FormGroup controlId="address">
            <FormLabel>Address</FormLabel>
            <FormControl
              required
              type="text"
              placeholder="enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></FormControl>
          </FormGroup>
          <FormGroup controlId="address">
            <FormLabel>City</FormLabel>
            <FormControl
              required
              type="text"
              placeholder="enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></FormControl>
          </FormGroup>
          <FormGroup controlId="postalCode">
            <FormLabel>Postal Code</FormLabel>
            <FormControl
              required
              type="text"
              placeholder="enter postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            ></FormControl>
          </FormGroup>
          <FormGroup controlId="country">
            <FormLabel>Country</FormLabel>
            <FormControl
              required
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            ></FormControl>
          </FormGroup>
          <Button className="my-4" type="submit" variant="primary">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
}

export default ShippingScreeen;
