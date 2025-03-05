import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl, getToken } from ".";
import { useNavigate } from "react-router-dom";

function useCheckUser() {
  let token = getToken();
  const navigate = useNavigate();
  const [checkUser, setCheckUser] = useState(false);
  useEffect(() => {
    axios
      .get(`${baseUrl}/check-user/${token}`)
      .then((res) => {
        // console.log("res:", res);
        if (res.data.isUserLoggedIn) {
          setCheckUser(true);
        }
      })
      .catch((err) => {
        if (err) {
          return;
        }
      });
  }, [navigate, token]);
  return checkUser;
}
export default useCheckUser;
