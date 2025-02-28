/*eslint-disable */
import { Navigate } from "react-router-dom";
import { baseUrl, getToken } from "../lib";
import { useEffect } from "react";
import axios from "axios";

function PrivateRoutes({ children }) {
  let token = getToken();
  useEffect(() => {
    axios.get(`${baseUrl}/check-user/`)
  }, [third])
  
  if (token) {
    return <> {children} </>;
  } else {
    return <Navigate to="/login" />;
  }
}

export default PrivateRoutes;
