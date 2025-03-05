/*eslint-disable */
import { Navigate, useNavigate } from "react-router-dom";
import { baseUrl, getToken } from "../lib";
import { use, useEffect, useState } from "react";
import axios from "axios";

function UserRoutes({ children }) {
  const [checkUser, setCkeckUser] = useState(false);
  // console.log("checkUser:", checkUser);
  let token = getToken();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${baseUrl}/check-user/${token}`)
      .then((res) => {
        if (res.data.isUserLoggedIn) {
          setCkeckUser(true);
        }
      })
      .catch((err) => {
        if (err) {
          localStorage.clear();
          return navigate("/login");
        }
      });
  }, []);

  if (checkUser && token) {
    return <> {children} </>;
  }
}

export default UserRoutes;
