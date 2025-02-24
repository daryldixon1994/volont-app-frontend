import { useDispatch, useSelector } from "react-redux";
import { Outlet, useHref } from "react-router-dom";
import "./style.css";
function ConnexionLayout() {
  const dispatch = useDispatch();
  const { toggleLogin, toggleRegister } = useSelector(
    (store) => store.connexionReducer
  );
  const location = useHref();
  return (
    <div id="connexion-layout-container">
      <header>
        <h1>
          {location === "/login" && !toggleLogin
            ? "User Login"
            : location === "/login" && toggleLogin
            ? "Association Login"
            : location === "/register" && !toggleRegister
            ? "User Register"
            : location === "/register" &&
              toggleRegister &&
              "Association Register"}
        </h1>
        <h5>
          {location === "/login" && !toggleLogin
            ? "Login as"
            : location === "/login" && toggleLogin
            ? "Login as"
            : location === "/register" && !toggleRegister
            ? "Register as"
            : location === "/register" && toggleRegister && "Register as"}
          <button
            onClick={() => {
              location === "/login"
                ? dispatch({ type: "TOGGLE_LOGIN" })
                : dispatch({ type: "TOGGLE_REGISTER" });
            }}
            className="cnx-layout-btn"
          >
            {toggleLogin || toggleRegister ? "User" : "Association"}
          </button>
        </h5>
      </header>
      <Outlet />
    </div>
  );
}

export default ConnexionLayout;
