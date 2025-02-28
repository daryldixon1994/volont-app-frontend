/*eslint-disable */
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { baseUserUrl, getId, getToken } from "../../lib";

const MySwal = withReactContent(Swal);
export default function ActItem({
  _id,
  img,
  actName,
  associationId,
  description,
  pendingUsers,
}) {
  const token = getToken();
  const id = getId();
  const navigate = useNavigate();
  const joinAct = () => {
    MySwal.fire({
      title: "Are you sure to join this act?",
      showCancelButton: true,
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `${baseUserUrl}/sendRequest?actId=${_id}&associationId=${associationId._id}&userId=${id}`,
            {},
            {
              headers: {
                token,
              },
            }
          )
          .then((res) => {
            if (res.status === 204) {
              MySwal.fire({
                title: "Your request has been sent successfully",
                icon: "success",
                confirmButtonText: "Ok",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            }
          })
          .catch((err) => {
            if (err.status === 400 || err.status === 401) {
              return MySwal.fire({
                title: "You need to Login first",
                html: "<a href='/register' >Register</a>",
                confirmButtonText: "Login",
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/login");
                }
              });
            }
            if (err.status === 405) {
              localStorage.clear();
              navigate("/login");
            }
          });
        // Swal.fire("Saved!", "", "success");
      }
    });
  };
  const linkStyle = {
    color: "#4C566A",
    boxSizing: "border-box",
  };
  const header = (
    <Link style={linkStyle}>
      <img alt="Card" id="act-img" src={img} />
    </Link>
  );
  const subTitleElt = (
    <Link
    to={`/associations/${associationId._id}`}
      style={{
        all: "unset",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        textDecoration: "underline",
      }}
      id="act-asso-link"
    >
      <img src={associationId.logo} width={40} alt="" />{" "}
      {associationId.associationName}
    </Link>
  );
  const footer = (
    <>
      <Button
        disabled={pendingUsers?.includes(id)}
        onClick={joinAct}
        label={pendingUsers?.includes(id) ? "Pending" : "Join"}
        style={pendingUsers?.includes(id) ? { cursor: "not-allowed" } : {}}
      />
    </>
  );

  return (
    <div className="card">
      <Card
        title={
          <Link to={`/acts/${_id}`} style={linkStyle}>
            {actName}
          </Link>
        }
        subTitle={subTitleElt}
        footer={footer}
        header={header}
      >
        <p className="m-0">
          {description?.substr(0, 25)}...{" "}
          <Link to={`/acts/${_id}`}>see more</Link>{" "}
        </p>
      </Card>
    </div>
  );
}
