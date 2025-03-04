import { NavLink } from "react-router-dom";
import "./style.css";
import { getToken } from "../../lib";
import useCheckUser from "../../lib/useCheckUser";
import useCheckAssociation from "../../lib/useCheckAssociation";

function NavBar() {
  const checkUser = useCheckUser();
  const checkAssociation = useCheckAssociation();

  const navlinks = [
    { path: "/", key: "Home" },
    { path: "/about", key: "About" },
    { path: "/contact-us", key: "Contact Us" },
    { path: "/acts", key: "Acts" },
    { path: "/associations", key: "Associations" },
  ];
  const activeLink = {
    all: "unset",
    boxSizing: "border-box",
    color: "white",
    fontWeight: 600,
    textDecoration: "underline",
    cursor: "pointer",
  };
  const inactiveLink = {
    all: "unset",
    boxSizing: "border-box",
    color: "#969696",
    fontWeight: 600,
    cursor: "pointer",
  };
  const token = getToken();
  const handleLogout = () => {
    localStorage.clear();
    window.location.assign("/login");
  };
  return (
    <div id="navbar-container">
      <NavLink
        style={{ all: "unset", boxSizing: "border-box", cursor: "pointer" }}
        to="/"
      >
        <h3>BetterTogether</h3>
      </NavLink>
      <nav>
        {navlinks.map(({ path, key }, i) => (
          <NavLink
            to={path}
            key={i}
            style={({ isActive }) => {
              return isActive ? activeLink : inactiveLink;
            }}
          >
            {key}
          </NavLink>
        ))}

        {checkUser && !checkAssociation ? (
          <NavLink
            to="/profile"
            style={({ isActive }) => {
              return isActive ? activeLink : inactiveLink;
            }}
          >
            Profile
          </NavLink>
        ) : (
          <NavLink
            to="/add-act"
            style={({ isActive }) => {
              return isActive ? activeLink : inactiveLink;
            }}
          >
            Account
          </NavLink>
        )}
        <NavLink
          to="/update-email"
          style={({ isActive }) => {
            return isActive ? activeLink : inactiveLink;
          }}
        >
          Settings
        </NavLink>
      </nav>
      {/* cnx links */}
      <div className="cnx-links">
        {token ? (
          <NavLink
            style={{
              all: "unset",
              fontWeight: "700",
              borderBottom: "1px #E1E1E1 solid",
              // padding: "1.5px 5px",
              color: "#E1E1E1",
              // borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={handleLogout}
          >
            Logout
          </NavLink>
        ) : (
          <>
            <NavLink
              to="/register"
              style={({ isActive }) => {
                return isActive ? activeLink : inactiveLink;
              }}
            >
              Register
            </NavLink>
            <NavLink
              to="/login"
              style={({ isActive }) => {
                return isActive ? activeLink : inactiveLink;
              }}
            >
              Login
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;
