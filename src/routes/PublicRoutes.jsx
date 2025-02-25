/*eslint-disable */
import { Navigate } from "react-router-dom";
import { getToken } from "../lib";

function PublicRoutes({ children }) {
  const token = getToken();
  if (token) {
    return <Navigate to="/" />;
  } else {
    return <>{children}</>;
  }
}

export default PublicRoutes;
