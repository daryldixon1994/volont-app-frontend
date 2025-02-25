import { useState } from "react";
import "./style.css";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import axios from "axios";
import { baseUserUrl } from "../../lib";


function RegisterUser() {
  const [registerData, setRegisterData] = useState({});
  const [showPwd, setShowPwd] = useState(false);

  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };
  const handleClick = () => {
    axios
      .post(`${baseUserUrl}/api/user/register`, registerData)
      .then((res) => console.log(res))
      .catch((err) => console.dir(err));
  };
  return (
    <div className="auth-page">
      <form className="register-form" onChange={handleChange}>
        <input type="text" placeholder="Full Name" name="fullName" />
        <input type="email" placeholder="Email" name="email" />
        <div id="pwd-box">
          <input
            type={showPwd ? "text" : "password"}
            placeholder="Password"
            name="password"
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
        </div>
        <input type="tel" placeholder="Phone" name="phone" />
        <input type="text" placeholder="Address" name="address" />
        <input type="text" placeholder="Age" name="age" />
        <button className="auth-btn" type="button" onClick={handleClick}>
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterUser;
