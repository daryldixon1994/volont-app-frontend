import { baseUserUrl, getToken } from "../../lib";
import useFetch from "../../lib/useFetch";
import RequestItem from "../requestItem/RequestItem";
import "./style.css";
function MyRequests() {
  const token = getToken();
  const { data, error } = useFetch(`${baseUserUrl}/getOwnRequests`, token);
  if (error.status === 401) {
    localStorage.clear();
    return window.location.assign("/login");
  }
  console.log("data:", data);
  return (
    <div className="my-requests">
      <div className="my-requests-header">
        <span>Act:</span>
        <span>Association:</span>
        <span>Status:</span>
      </div>
      <div>
        {data.map((elt, i) => (
          <RequestItem key={i} {...elt} />
        ))}
      </div>
    </div>
  );
}

export default MyRequests;
