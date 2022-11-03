import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ loggedin, children }) {
  if (!loggedin) {
    return <Navigate to="/login" replace />;
  }
  return children ? children : <Outlet />;
}

export default ProtectedRoute;
