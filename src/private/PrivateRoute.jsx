import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="flex  justify-center py-8">
        <span className="loading loading-bars loading-lg text-green-500"></span>
      </div>
    );
  }
  if (user) {
    return <div>{children}</div>;
  }

  return <Navigate to="/join-us"></Navigate>;
};

export default PrivateRoute;
