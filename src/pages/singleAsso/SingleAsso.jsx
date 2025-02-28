import { useParams } from "react-router-dom";
import { baseUserUrl } from "../../lib";
import useFetch from "../../lib/useFetch";
import { FaUsersLine } from "react-icons/fa6";
import "./style.css";

function SingleAsso() {
  const { id } = useParams();
  const { data, error, loading } = useFetch(
    `${baseUserUrl}/getAssociation/${id}`
  );

  return (
    <div className="single-act-container">
      <div className="image-box">
        <img src={data?.logo} alt="" />
      </div>
      <div className="details-box">
        <div>
          <h1> {data?.associationName} </h1>
          <div className="act-sub-header">
            <h3 id="asso-name">Association: {data?.email} </h3>
            <h3 id="participants">{data?.phone} </h3>
            <h3 id="participants">{data?.location} </h3>
          </div>
        </div>
        <p> {data?.description} </p>

        <h6> #{data?.category} </h6>
      </div>
    </div>
  );
}

export default SingleAsso;
