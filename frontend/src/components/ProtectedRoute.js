import React from "react";

import { Route, Navigate } from "react-router-dom";

function ProtectedRoute({ children, redirectPath, userInfo }) {
  if (!userInfo) {
    return <Navigate to={redirectPath} replace />;
  } else return children;
}

export default ProtectedRoute;
