/*eslint-disable*/
import "./style.css";
function UserItem({ fullName, email, phone, img, address, age }) {
  return (
    <div id="user-item">
      <img src={img} alt="user-avatar" />
      <h5> {fullName} </h5>
      <h5> {email} </h5>
      <h5> {phone} </h5>
      <h5> {address} </h5>
    </div>
  );
}

export default UserItem;
