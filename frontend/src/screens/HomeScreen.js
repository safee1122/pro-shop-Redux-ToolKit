import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";
import { fetchProducts } from "./../slices/productSlice";
import { allProducts } from "./../slices/productSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";

import { io } from "socket.io-client";
function HomeScreen() {
  const dispatch = useDispatch();
  const socket = io.connect("http://localhost:9000/");

  const { products, loading, error } = useSelector(allProducts);
  useEffect(() => {
    dispatch(fetchProducts());
    socket.emit("msg", { message: "hello" });
  }, [dispatch]);
  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message varient="danger">
          <h3>error</h3>
        </Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

export default HomeScreen;
