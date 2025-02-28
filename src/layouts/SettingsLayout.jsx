import { NavLink, Outlet } from "react-router-dom";
import "./style.css";
function SettingsLayout() {
  const activeLink = {
    textDecoration: "underline",
    cursor: "pointer",
  };
  const inactiveLink = {
    textDecoration: "none",
    cursor: "pointer",
  };
  return (
    <div id="settings-layout">
      <div className="settings-nav-section">
        <NavLink
          style={({ isActive }) => {
            return isActive ? activeLink : inactiveLink;
          }}
          to="/update-email"
        >
          Update email
        </NavLink>
        <NavLink
          style={({ isActive }) => {
            return isActive ? activeLink : inactiveLink;
          }}
          to="/update-password"
        >
          Update password
        </NavLink>
        <NavLink
          style={({ isActive }) => {
            return isActive ? activeLink : inactiveLink;
          }}
          to="/update-infos"
        >
          Update informations
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}

export default SettingsLayout;
