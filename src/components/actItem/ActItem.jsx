/*eslint-disable */
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { baseUserUrl, getToken } from "../../lib";

const MySwal = withReactContent(Swal);
export default function ActItem({
  _id,
  img,
  actName,
  associationId,
  description,
}) {
  const token = getToken();
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
            `${baseUserUrl}/sendRequest?actId=${_id}&associationId=${associationId._id}`,
            {},
            {
              headers: {
                token,
              },
            }
          )
          .then((res) => console.log(res))
          .catch((err) => {
            if (err.status === 400 || err.status === 401) {
              MySwal.fire({
                title: "You need to Login first",
                html: "<a href='/register' >Register</a>",
                confirmButtonText: "Login",
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/login");
                }
              });
            }
          });
        // Swal.fire("Saved!", "", "success");
      }
    });
  };
  const linkStyle = {
    all: "unset",
    boxSizing: "border-box",
  };
  const header = (
    <Link style={linkStyle}>
      <img alt="Card" id="act-img" src={img} />
    </Link>
  );
  const subTitleElt = (
    <Link
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
      <Button onClick={joinAct} label="Join" />
    </>
  );

  return (
    <div className="card">
      <Card
        title={<Link style={linkStyle}>{actName}</Link>}
        subTitle={subTitleElt}
        footer={footer}
        header={header}
      >
        <p className="m-0">{description}</p>
      </Card>
    </div>
  );
}
