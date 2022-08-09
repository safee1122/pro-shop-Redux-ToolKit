import React from "react";
import { userLogout } from "../slices/userLoginSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import jwt from "jwt-decode";
function tokenExpired(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  const { exp } = JSON.parse(jsonPayload);
  const expired = Date.now() >= exp * 1000;
  return expired;
}

export default tokenExpired;
