import { Skeleton } from "primereact/skeleton";
import { baseAssoUrl, getToken } from "../../lib";
import useFetch from "../../lib/useFetch";
import { useRef, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { OverlayPanel } from "primereact/overlaypanel";
function JoinRequests() {
  const op = useRef(null);
  const [userData, setUserData] = useState({});
  const token = getToken();
  const { data, loading } = useFetch(`${baseAssoUrl}/getRequests`, token);
  // console.log("userData", userData);
  const skeletonData = [1, 2, 3];
  return (
    <div className="account-outlet">
      <div id="join-requests-header">
        <h5>Act Name</h5>
        <h5>Act Date</h5>
        <h5>Act Location</h5>
        <h5>Username</h5>
        <h5>Action</h5>
      </div>
      <div className="acts-data">
        {loading
          ? // <div>loading...</div>
            skeletonData.map((elt, i) => (
              // <Skeleton height="2rem" className="mb-2"></Skeleton>
              <div key={i} className="act">
                <Skeleton height="2rem" className="mb-2"></Skeleton>
                <Skeleton height="2rem" className="mb-2"></Skeleton>
                <Skeleton height="2rem" className="mb-2"></Skeleton>
                <Skeleton height="2rem" className="mb-2"></Skeleton>
                <Skeleton height="2rem" className="mb-2"></Skeleton>
                <Skeleton height="2rem" className="mb-2"></Skeleton>
              </div>
            ))
          : data.map((req) => (
              <div key={req._id} className="act">
                <h5>{req.actId.actName}</h5>
                <h5>
                  {req.actId.actDate &&
                    new Date(req.actId.actDate).toLocaleDateString()}
                </h5>
                <h5>{req.actId.location}</h5>
                <h5>
                  <Link
                    onClick={(e) => {
                      setUserData(req.userId);
                      op.current.toggle(e);
                    }}
                  >
                    {req.userId.fullName}
                  </Link>
                </h5>
                <h5>{req.category}</h5>
                <h5>{req.volonteersNbr}</h5>
              </div>
            ))}
      </div>
      <OverlayPanel ref={op}>
        <img width={80} src={userData.img} alt="Bamboo Watch"></img>
        <h4> {userData.fullName} </h4>
        <h4> {userData.address} </h4>
        <h4> {userData.phone} </h4>

      </OverlayPanel>
    </div>
  );
}

export default JoinRequests;
