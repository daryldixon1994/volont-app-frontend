import { useParams } from "react-router-dom";
import { baseUserUrl } from "../../lib";
import useFetch from "../../lib/useFetch";
import { FaUsersLine } from "react-icons/fa6";
import "./style.css";

function SingleAct() {
  const { id } = useParams();
  const { data, error, loading } = useFetch(`${baseUserUrl}/getAct/${id}`);

  return (
    <div className="single-act-container">
      <div className="image-box">
        <img src={data?.img} alt=""  />
      </div>
      <div className="details-box">
        <div>
          <div className="details-header">
            <h5> {new Date(data?.actDate).toDateString()} </h5>
            <h5> {data?.actHour}h </h5>
            <h5> {data?.location} </h5>
          </div>
          <h1> {data?.actName} </h1>
          <div className="act-sub-header">
            <h3 id="asso-name">
              Association: {data.associationId?.associationName}{" "}
            </h3>
            <h3 id="participants">
              <FaUsersLine size={18} color="#969684" />
              {data.users?.length}{" "}
            </h3>
          </div>
        </div>
        <p> {data?.description} </p>
        {data?.volonteersNbr && (
          <h5>Limit number of volonteers: {data?.volonteersNbr} </h5>
        )}
        <h6> #{data?.category} </h6>
      </div>
    </div>
  );
}

export default SingleAct;
