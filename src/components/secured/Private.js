import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import AuthContext from "../context/auth/authContext";
const Private = ({ children, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { user, token } = authContext;

  return user === null ? <Navigate to="/" /> : children;
};

export default Private;
