import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, NavItem } from "react-bootstrap";
function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <>
      <Nav className="justify-content-center mb-4">
        <NavItem>
          {step1 ? (
            <LinkContainer to="/shipping">
              <Nav.Link>Shipping</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Shipping</Nav.Link>
          )}
        </NavItem>
        <NavItem>
          {step2 ? (
            <LinkContainer to="/payment">
              <Nav.Link>Payment</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>payment</Nav.Link>
          )}
        </NavItem>
        <NavItem>
          {step3 ? (
            <LinkContainer to="/placeorder">
              <Nav.Link>Place Order</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Place Order</Nav.Link>
          )}
        </NavItem>
      </Nav>
    </>
  );
}

export default CheckoutSteps;
