/*eslint-disable */
import { Navigate } from "react-router-dom";
import { getToken } from "../lib";

function PrivateRoutes({ children }) {
  let token = getToken();
  if (token) {
    return <> {children} </>;
  } else {
    return <Navigate to="/login" />;
  }
}

export default PrivateRoutes;
