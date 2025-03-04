import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl, getToken } from ".";
import { useNavigate } from "react-router-dom";

function useCheckAssociation() {
  let token = getToken();
  const navigate = useNavigate();
  const [checkAssociation, setCheckAssociation] = useState(false);
  useEffect(() => {
    axios
      .get(`${baseUrl}/check-association/${token}`)
      .then((res) => {
        if (res.data.isAssoLoggedIn) {
          setCheckAssociation(true);
        }
      })
      .catch();
  }, [navigate, token]);
  return checkAssociation;
}
export default useCheckAssociation;
