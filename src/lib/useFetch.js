import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(url, token) {
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);
  useEffect(() => {
    axios
      .get(url, {
        headers: {
          token,
        },
      })
      .then((res) => setData(res.data.data))
      .catch((err) => {
        
        setError(err.response);
      });
  }, [token, url]);
  return { data, error };
}

export default useFetch;
