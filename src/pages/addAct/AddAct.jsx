import "./style.css";
import { useRef, useState } from "react";
import axios from "axios";
import { baseAssoUrl, getToken } from "../../lib";
import MySwal from "sweetalert2-react-content";
import Swal from "sweetalert2";
function AddAct() {
  const token = getToken();
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    actName: "",
    description: "",
    actDate: "",
    actHour: "",
    location: "",
    category: "",
    photo: null,
    volonteersNbr: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleClick = async () => {
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    try {
       await axios.post(`${baseAssoUrl}/addAct`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          token,
        },
      });
      const MySwalInstance = MySwal(Swal);
      MySwalInstance.fire({
        icon: "success",
        title: "Success",
        text: "The act has been added successfully!",
      }).then((result) => {
        if (result.isConfirmed) {
          formRef.current.reset();
        }
      });
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="account-outlet">
      <form id="add-act-form" ref={formRef}>
        {/* <h1>Add Act</h1> */}
        <label>
          Act Name
          <input
            type="text"
            name="actName"
            value={formData.actName}
            onChange={handleChange}
          />
        </label>
        <label>
          Act Description
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Act Date
          <input
            type="date"
            name="actDate"
            value={formData.actDate}
            onChange={handleChange}
          />
        </label>
        <label>
          Act Hour
          <input
            type="time"
            name="actHour"
            value={formData.actHour}
            onChange={handleChange}
          />
        </label>
        <label>
          Act Location
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </label>
        <label>
          Act Category
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </label>
        <label>
          Act Image
          <input type="file" name="photo" onChange={handleChange} />
        </label>
        <label>
          Number of Volunteers
          <input
            type="number"
            name="volonteersNbr"
            value={formData.volonteersNbr}
            onChange={handleChange}
          />
        </label>
        <button type="button" onClick={handleClick}>
          Add Act
        </button>
      </form>
    </div>
  );
}

export default AddAct;
