/*eslint-disable */
import { Navigate, useNavigate } from "react-router-dom";
import { baseUrl, getToken } from "../lib";
import { use, useEffect, useState } from "react";
import axios from "axios";

function AssociationRoutes({ children }) {
  const [checkAssociation, setCkeckAssociation] = useState(false);
  let token = getToken();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${baseUrl}/check-association/${token}`)
      .then((res) => {
        if (res.data.isAssoLoggedIn) {
            setCkeckAssociation(true);
        }
      })
      .catch((err) => {
        if (err) {
          localStorage.clear();
          return navigate("/login");
        }
      });
  }, []);

  if (checkAssociation && token) {
    return <> {children} </>;
  }
}

export default AssociationRoutes;
