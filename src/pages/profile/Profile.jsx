import MyRequests from "../../components/myRequests/MyRequests";
import UserData from "../../components/userData/UserData";
import "./style.css";
function Profile() {
  return (
    <div id="profile-page">
      <UserData />
      <MyRequests />
    </div>
  );
}

export default Profile;
