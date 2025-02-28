import { useState } from "react";
import "./style.css";
import axios from "axios";
import { baseUserUrl, getToken } from "../../lib";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);


function UpdateEmail() {
  const token = getToken();
  const [newPasswordData, setNewPasswordData] = useState({});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setNewPasswordData({ ...newPasswordData, [e.target.name]: e.target.value });
  };
  const handleClick = () => {
    axios
      .patch(`${baseUserUrl}/updatePassword`, newPasswordData, {
        headers: {
          token,
        },
      })
      .then(() => {
        MySwal.fire({
          title: "Success!",
          text: "Passwred was updated!",
          icon: "sucess",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
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
        <input type="password" placeholder="Old password" name="password" />
        <input type="password" placeholder="New password" name="newPassword" />
        <button onClick={handleClick} className="auth-btn" type="button">
          Update
        </button>
      </form>
      {error && <span style={{ color: "red" }}> {error} </span>}
    </div>
  );
}

export default UpdateEmail;
