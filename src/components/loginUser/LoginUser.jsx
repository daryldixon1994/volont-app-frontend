import { useState } from "react";
import "./style.css";
import axios from "axios";
import { baseUserUrl } from "../../lib";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
import { Flip, toast, ToastContainer } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { LuEye, LuEyeClosed } from "react-icons/lu";

// const MySwal = withReactContent(Swal);
function LoginUser() {
  const [showPwd, setShowPwd] = useState(false);
  const [loginData, setLoginData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const handleLogin = async () => {
    setLoading(true);
    axios
      .post(`${baseUserUrl}/login`, loginData)
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("id", res.data.data.userId);
          // setTimeout(() => {
          //   navigate("/profile");
          // }, 3500);
          window.location.assign("/profile");
        }
      })
      .catch((err) => {
        setLoading(false);
        setLoading(false);

        if (err.response.status === 406) {
          setErrorMsg(err.response.data.error);
          // MySwal.fire({
          //   icon: "error",
          //   title: "Oops...!",
          //   text: err.response.data.error,
          // });
          toast.error(err.response.data.error, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
          });
          setTimeout(() => {
            setErrorMsg("");
          }, 5000);
        }
      });
  };
  return (
    <div className="auth-page">
      <form onChange={(e) => handleChange(e)} className="register-form">
        <input
          style={errorMsg ? { border: "1px red solid" } : {}}
          type="email"
          name="email"
        />
        {/* <input
          style={errorMsg ? { border: "1px red solid" } : {}}
          type="password"
          name="password"
        /> */}
        <div className="field-box" id="pwd-box">
          <input
            style={errorMsg ? { border: "1px red solid" } : {}}
            type={showPwd ? "text" : "password"}
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
        {/* {errorMsg && <span style={{ color: "red" }}>{errorMsg}</span>} */}
        <button type="button" onClick={handleLogin} className="auth-btn">
          {loading ? (
            <BeatLoader width={2} height={8} color="white" />
          ) : (
            "Login"
          )}
        </button>
      </form>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Flip}
      />
    </div>
  );
}

export default LoginUser;
