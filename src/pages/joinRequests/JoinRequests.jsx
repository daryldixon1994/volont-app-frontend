import { Skeleton } from "primereact/skeleton";
import { baseAssoUrl, getToken } from "../../lib";
import useFetch from "../../lib/useFetch";
import { useRef, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { OverlayPanel } from "primereact/overlaypanel";
import { RiCheckboxCircleFill, RiCloseCircleFill } from "react-icons/ri";
import { ProgressSpinner } from "primereact/progressspinner";

import axios from "axios";

function JoinRequests() {
  const op = useRef(null);
  const [userData, setUserData] = useState({});
  const [actionState, setActionState] = useState(false);
  const token = getToken();
  const { data, loading } = useFetch(`${baseAssoUrl}/getRequests`, token);
  // console.log("data", data);
  const skeletonData = [1, 2, 3];
  const handleAcceptUser = (userId, actId, requestId) => {
    setActionState(true);
    axios
      .patch(
        `${baseAssoUrl}/acceptUser?userId=${userId}&actId=${actId}&requestId=${requestId}`,
        {},
        {
          headers: {
            token,
          },
        }
      )
      .then(() => {
        setActionState(false);
        window.location.reload();
      })
      .catch(() => {
        setActionState(false);
      });
  };
  const handleRejectUser = (userId, actId, requestId) => {
    setActionState(true);
    axios
      .patch(
        `${baseAssoUrl}/declineUser?userId=${userId}&actId=${actId}&requestId=${requestId}`,
        {},
        {
          headers: {
            token,
          },
        }
      )
      .then(() => {
        setActionState(false);
        window.location.reload();
      })
      .catch(() => {
        setActionState(false);
      });
  };
  return (
    <div className="account-outlet">
      <div id="join-requests-header">
        <h5>Act Name</h5>
        <h5>Act Date</h5>
        <h5>Act Location</h5>
        <h5>Username</h5>
        <h5>Action</h5>
        <h5>Status</h5>
      </div>
      <div className="request-data">
        {loading ? (
          // <div>loading...</div>
          skeletonData.length >= 1 ? (
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
          ) : (
            data.map((req) => (
              <div key={req._id} className="join-request">
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
                <h5>
                  {actionState ? (
                    <ProgressSpinner
                      style={{ width: "30px", height: "30px" }}
                    />
                  ) : (
                    <>
                      <RiCheckboxCircleFill
                        color={req.isPending ? "green" : "#559b7e"}
                        size={25}
                        className="action-btn-req"
                        onClick={() =>
                          handleAcceptUser(
                            req.userId._id,
                            req.actId._id,
                            req._id
                          )
                        }
                        style={
                          req.isPending
                            ? { cursor: "pointer" }
                            : { cursor: "not-allowed" }
                        }
                      />
                      <RiCloseCircleFill
                        color={req.isPending ? "red" : "#d16464"}
                        size={25}
                        className="action-btn-req"
                        style={
                          req.isPending
                            ? { cursor: "pointer" }
                            : { cursor: "not-allowed" }
                        }
                        onClick={() =>
                          handleRejectUser(
                            req.userId._id,
                            req.actId._id,
                            req._id
                          )
                        }
                      />
                    </>
                  )}
                </h5>
                <h5>
                  {req.isPending
                    ? "Pending"
                    : req.isAccepted
                    ? "Accepted"
                    : req.isDeclined && "Declined"}
                </h5>
              </div>
            ))
          )
        ) : (
          <h4>No requests yet.</h4>
        )}
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
