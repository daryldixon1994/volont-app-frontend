import { useState } from "react";
import "./style.css";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import axios from "axios";
import { baseAssoUrl } from "../../lib";
import { BeatLoader } from "react-spinners";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
function RegisterAssociation() {
  const [registerData, setRegisterData] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkFields, setCheckFields] = useState(false);
  const [error, setError] = useState({});
  console.log(error);
  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };
  const handleClick = () => {
    setCheckFields(true);
    setLoading(true);
    axios
      .post(`${baseAssoUrl}/register`, registerData)
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          MySwal.fire({
            title: "Done!",
            text: "Please verify your mailbox 📬",
            icon: "success",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err.response.data.error);
        setTimeout(() => {
          setError({});
        }, 5000);
      });
  };
  return (
    <div className="auth-page">
      <form
        autoComplete="off"
        className="register-form-asso"
        onChange={handleChange}
      >
        <div className="field-box">
          <input
            style={
              checkFields && !registerData.associationName
                ? { border: "1px red solid" }
                : {}
            }
            type="text"
            placeholder="Association Name"
            name="associationName"
          />
          {error.associationName && <span> {error.associationName.message} </span>}
        </div>
        <div className="field-box">
          <input
            style={
              (checkFields && !registerData.email) || error.email?.message
                ? { border: "1px red solid" }
                : {}
            }
            type="email"
            placeholder="Email"
            name="email"
            autoComplete="off"
          />
          {error.email && <span> {error.email.message} </span>}
        </div>
        <div className="field-box" id="pwd-box">
          <input
            type={showPwd ? "text" : "password"}
            placeholder="Password"
            name="password"
            style={
              checkFields && !registerData.password
                ? { border: "1px red solid" }
                : {}
            }
          />
          {showPwd ? (
            <LuEyeClosed
              id="eye-icon"
              size={25}
              color="#212A3E"
              onClick={() => setShowPwd(false)}
            />
          ) : (
            <LuEye
              id="eye-icon"
              size={25}
              color="#212A3E"
              onClick={() => setShowPwd(true)}
            />
          )}
          {error.password && <span> {error.password.message} </span>}
        </div>
        <div className="field-box">
          <input
            style={
              checkFields && !registerData.phone
                ? { border: "1px red solid" }
                : {}
            }
            type="tel"
            placeholder="Phone"
            name="phone"
          />
          {error.phone && <span> {error.phone.message} </span>}
        </div>
        <div className="field-box">
          <input
            type="text"
            style={
              checkFields && !registerData.location
                ? { border: "1px red solid" }
                : {}
            }
            placeholder="Location"
            name="location"
          />
          {error.location && <span> {error.location.message} </span>}
        </div>
        <div className="field-box">
          <input
            type="text"
            style={
              checkFields && !registerData.category
                ? { border: "1px red solid" }
                : {}
            }
            placeholder="Category"
            name="category"
          />
          {error.category && <span> {error.category.message} </span>}
        </div>
        <div className="field-box">
          <input
            type="text"
            style={
              checkFields && !registerData.description
                ? { border: "1px red solid" }
                : {}
            }
            placeholder="Description"
            name="description"
          />
          {error.description && <span> {error.description.message} </span>}
        </div>
        <div className="field-box">
          <input
            type="text"
            style={
              checkFields && !registerData.refNumber
                ? { border: "1px red solid" }
                : {}
            }
            placeholder="Ref. Number"
            name="refNumber"
          />
          {error.refNumber && <span> {error.refNumber.message} </span>}
        </div>
        <button className="auth-btn" type="button" onClick={handleClick}>
          {loading ? (
            <BeatLoader width={2} height={8} color="white" />
          ) : (
            "Register"
          )}
        </button>
      </form>
    </div>
  );
}

export default RegisterAssociation;
