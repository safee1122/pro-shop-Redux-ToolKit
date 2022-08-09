import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Header";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/loginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreeen from "./screens/ShippingScreen";
import PaymentScreeen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import tokenExpired from "./Services/jwtRefresh";
import { useEffect, useState } from "react";
import { userLogout, userRefreshToken } from "./slices/userLoginSlice";
function App() {
  let location = useLocation();
  let dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  useEffect(() => {
    const interval = setInterval(() => {
      if (userInfo) {
        if (tokenExpired(userInfo.token)) {
          console.log("This will run every second!");
          dispatch(userRefreshToken());
        } else {
          return;
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [userInfo, location]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (userInfo) {
        if (tokenExpired(userInfo.refreshToken)) {
          console.log("This will run every second!");
          dispatch(userLogout());
        } else {
          return;
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [userInfo, location]);
  // useEffect(() => {
  //   if (userInfo) {
  //     if (tokenExpired(userInfo.token)) {
  //       console.log("This will run every second!");
  //       dispatch(userRefreshToken());
  //     }
  //   }
  // }, [location]);
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route
              path="/shipping"
              element={
                <ProtectedRoute redirectPath="/login" userInfo={userInfo}>
                  <ShippingScreeen />
                </ProtectedRoute>
              }
              exact
            />

            <Route
              path="/payment"
              element={
                <ProtectedRoute redirectPath="/login" userInfo={userInfo}>
                  <PaymentScreeen />
                </ProtectedRoute>
              }
              exact
            />
            <Route
              path="/placeorder"
              element={
                <ProtectedRoute redirectPath="/login" userInfo={userInfo}>
                  <PlaceOrderScreen />
                </ProtectedRoute>
              }
              exact
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute redirectPath="/login" userInfo={userInfo}>
                  <OrderScreen />
                </ProtectedRoute>
              }
              exact
            />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route
              path="/cart/:id"
              element={
                <ProtectedRoute redirectPath="/login" userInfo={userInfo}>
                  <CartScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute redirectPath="/login" userInfo={userInfo}>
                  <CartScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedRoute redirectPath="/" userInfo={!userInfo}>
                  <LoginScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute redirectPath="/" userInfo={!userInfo}>
                  <RegisterScreen />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
