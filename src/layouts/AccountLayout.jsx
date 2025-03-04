import { NavLink, Outlet } from "react-router-dom";
import "./style.css";
function AccountLayout() {
  const activeCss = {
    borderBottom: "2px solid #E1E1E1",
    transition: "border-bottom 0.5s",
  };
  const inactiveCss = {
    borderBottom: "2px solid transparent",
    transition: "border-bottom 0.5s",
  };
  return (
    <div id="account-layout">
      <header>
        <NavLink
          style={({ isActive }) => {
            return isActive ? activeCss : inactiveCss;
          }}
          to="/add-act"
        >
          Add act
        </NavLink>
        <NavLink
          style={({ isActive }) => {
            return isActive ? activeCss : inactiveCss;
          }}
          to="/my-acts"
        >
          My Acts
        </NavLink>
        <NavLink
          style={({ isActive }) => {
            return isActive ? activeCss : inactiveCss;
          }}
          to="/join-request"
        >
          Join Requests
        </NavLink>
      </header>
      <Outlet />
    </div>
  );
}

export default AccountLayout;
