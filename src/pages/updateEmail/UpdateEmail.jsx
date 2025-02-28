import { useState } from "react";
import "./style.css";
import axios from "axios";
import { baseUserUrl, getToken } from "../../lib";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(Swal);
function UpdateEmail() {
  const token = getToken();
  const navigate = useNavigate();
  const [newEmailData, setNewEmailData] = useState({});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setNewEmailData({ ...newEmailData, [e.target.name]: e.target.value });
  };
  const handleClick = () => {
    axios
      .patch(`${baseUserUrl}/updateEmail`, newEmailData, {
        headers: {
          token,
        },
      })
      .then(() => {
        MySwal.fire({
          title: "Success!",
          text: "Email verification needed, please check your mailbox",
          icon: "sucess",
          confirmButtonText: "Finish",
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.clear();
            navigate("/login");
          }
        });
      })
      .catch((err) => {
        setError(err.response.data.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      });
  };
  return (
    <div className="update-email-page">
      <form
        onChange={(e) => handleChange(e)}
        className="register-form form-update"
      >
        <input type="email" placeholder="New email" name="newEmail" />
        <input type="password" placeholder="Password" name="password" />
        <button onClick={handleClick} className="auth-btn" type="button">
          Update
        </button>
      </form>
      {error && <span style={{ color: "red" }}> {error} </span>}
    </div>
  );
}

export default UpdateEmail;
