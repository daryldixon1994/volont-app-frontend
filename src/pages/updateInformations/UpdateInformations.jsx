import "./style.css";
import axios from "axios";
import { baseUserUrl, getToken } from "../../lib";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useState } from "react";
const MySwal = withReactContent(Swal);
function UpdateInformations() {
  const token = getToken();
  const [newData, setNewData] = useState({});
  const [error, setError] = useState("");
  console.log(newData)
  const handleChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };
  const handleClick = () => {
    for (const element in newData) {
      if (newData[element] === "") {
        delete newData[element];
      }
    }
    axios
      .patch(`${baseUserUrl}/updateInfos`, newData, {
        headers: {
          token,
        },
      })
      .then(() => {
        MySwal.fire({
          title: "Success!",
          text: "Your informations were updated!",
          icon: "sucess",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      })
      .catch(() => {
        setError("An error was occured");
        setTimeout(() => {
          setError("");
        }, 5000);
      });
  };
  return (
    <div className="update-infos-page">
      <form
        onChange={(e) => handleChange(e)}
        className="register-form form-update-infos"
      >
        <input type="text" placeholder="Full Name" name="fullName" />
        <input type="tel" placeholder="Phone" name="phone" />
        <input type="text" placeholder="Address" name="address" />
        <input type="text" placeholder="Age" name="age" />
        <button onClick={handleClick} className="auth-btn" type="button">
          Update
        </button>
      </form>
      {error && <span style={{ color: "red" }}> {error} </span>}
    </div>
  );
}

export default UpdateInformations;
