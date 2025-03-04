import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(url, token) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(url, {
        headers: {
          token,
        },
      })
      .then((res) => {
        setLoading(false);
        setData(res.data.data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response);
      });
  }, [token, url]);
  return { data, error, loading };
}

export default useFetch;
