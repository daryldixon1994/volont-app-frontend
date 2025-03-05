import "./style.css";
import {
  MdEmail,
  MdLocationOn,
  MdLocalPhone,
  MdCalendarMonth,
} from "react-icons/md";
import { baseUserUrl, getToken } from "../../lib";
import useFetch from "../../lib/useFetch";
import { TbPhotoEdit } from "react-icons/tb";
import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
function UserData() {
  const token = getToken();
  // const [userData, setUserData] = useState(null);
  const [newImg, setNewImg] = useState(null);
  const [newImgUrl, setNewImgUrl] = useState("");
  // console.log(newImgUrl);
  const { data, error } = useFetch(`${baseUserUrl}/getOwnInfos`, token);

  if (error?.status === 401) {
    localStorage.clear();
    return window.location.assign("/login");
  }
  const handleChange = (e) => {
    // console.log(e.target.files[0].name);
    setNewImgUrl(URL.createObjectURL(e.target.files[0]));
    setNewImg(e.target.files[0]);
  };
  const handleCancelUpdate = () => {
    setNewImgUrl("");
  };
  const handleUpdate = () => {
    const imageFomData = new FormData();
    imageFomData.append("photo", newImg);
    axios
      .patch(`${baseUserUrl}/updateUserImage`, imageFomData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token,
        },
        onUploadProgress: (progressEvent) =>
          MySwal.fire({
            position: "center",
            icon: "success",
            title: "Photo uploaded Successfully",
            text: `Upload Progress : ${Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            )}
            "%`,
            showConfirmButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          }),
      })
      .then(() => {
        setNewImgUrl("");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div id="user-data">
      <div id="user-img-box">
        <input
          type="file"
          name=""
          id="img-input"
          onChange={(e) => handleChange(e)}
        />
        <label style={{ cursor: "pointer" }} htmlFor="img-input">
          <TbPhotoEdit size={25} id="edit-img-icon" />
        </label>
        {newImgUrl && (
          <div id="save-cancel-box">
            <MdCancel
              style={{ cursor: "pointer" }}
              size={25}
              color="red"
              onClick={handleCancelUpdate}
            />
            <FaSave
              style={{ cursor: "pointer" }}
              onClick={handleUpdate}
              size={25}
              color="green"
            />
          </div>
        )}
        <img
          style={{ objectFit: "cover" }}
          src={newImgUrl ? newImgUrl : data.img}
          alt=""
        />
      </div>
      <div>
        <h1>{data.fullName}</h1>
        <h3>
          <MdEmail />
          {data.email}
        </h3>
        <h3>
          <MdLocationOn />
          {data.address}
        </h3>
        <h3>
          <MdLocalPhone />
          {data.phone}
        </h3>
        <h3>
          <MdCalendarMonth />
          {data.age}
        </h3>
      </div>
    </div>
  );
}

export default UserData;
