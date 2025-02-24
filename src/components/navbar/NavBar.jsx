import { NavLink } from "react-router-dom";
import "./style.css";
function NavBar() {
  const navlinks = [
    { path: "/", key: "Home" },
    { path: "/about", key: "About" },
    { path: "/contact-us", key: "Contact Us" },
    { path: "/acts", key: "Acts" },
    { path: "/associations", key: "Associations" },
    { path: "/register", key: "Register" },
    { path: "/login", key: "Login" },
  ];
  const activeLink = {
    all: "unset",
    boxSizing: "border-box",
    color: "#B8CABA",
    fontWeight: 600,
    textDecoration: "underline",
    cursor: "pointer",
  };
  const inactiveLink = {
    all: "unset",
    boxSizing: "border-box",
    color: "#5A6B5D",
    fontWeight: 600,
    cursor: "pointer",
  };
  return (
    <div id="navbar-container">
      <h3>BetterTogether</h3>
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
      </nav>
    </div>
  );
}

export default NavBar;
