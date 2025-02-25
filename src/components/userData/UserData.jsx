import "./style.css";
import {
  MdEmail,
  MdLocationOn,
  MdLocalPhone,
  MdCalendarMonth,
} from "react-icons/md";
import { baseUserUrl, getToken } from "../../lib";
import useFetch from "../../lib/useFetch";

function UserData() {
  const token = getToken();
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get(`${baseUserUrl}/getOwnInfos`)
  //     .then((res) => console.log(res))
  //     .catch((err) => console.dir(err));
  // }, [token]);
  const { data, error } = useFetch(`${baseUserUrl}/getOwnInfos`, token);
  
  if (error.status === 401) {
    localStorage.clear();
    return window.location.assign("/login");
  }
  return (
    <div id="user-data">
      <img src={data.img} alt="" />
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
