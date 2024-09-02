import React, { useContext } from "react";
import { context } from "../context/context";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ element }) => {
  const { isLogin } = useContext(context);
  return isLogin ? element : <Navigate to="/" />;
};

export const LoginPrivateRoute = ({ element }) => {
  const { isLogin } = useContext(context);
  return isLogin ? <Navigate to="/" /> : element;
};
