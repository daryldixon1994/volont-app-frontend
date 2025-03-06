import { GridLoader } from "react-spinners";
import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseAssoUrl } from "../../lib";
import { useParams } from "react-router-dom";
import { MdVerifiedUser } from "react-icons/md";
import { BiSolidError } from "react-icons/bi";

function VerifyEmail() {
  const { id } = useParams();
  const [verify, setVerify] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    axios
      .patch(`${baseAssoUrl}/verifyEmail/${id}`)
      .then((res) => {
        if (res.status === 204) {
          setVerify(true);
          setTimeout(() => {
            window.location.assign("/login");
          }, 2500);
        }
      })
      .catch(() => {
        setError(true);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      });
  }, [id]);

  return (
    <div id="verify-email-page">
      {verify ? (
        <div className="verified-bloc">
          <MdVerifiedUser size={150} color="#009c5c" />

          <h1>Verified</h1>
        </div>
      ) : error ? (
        <div className="verified-bloc">
          <BiSolidError size={150} color="#d12525" />
          <h1 id="err">Error!</h1>
        </div>
      ) : (
        <GridLoader color="#d15757" size={50} width={20} />
      )}
    </div>
  );
}

export default VerifyEmail;
