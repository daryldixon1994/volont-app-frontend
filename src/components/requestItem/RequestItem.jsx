/*eslint-disable */
import "./style.css";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { CiClock1 } from "react-icons/ci";
import { Link } from "react-router-dom";

function RequestItem({
  actId,
  isAccepted,
  isDeclined,
  isPending,
  userId,
  _id,
}) {
  return (
    <div className="request-item">
      <div className="item-head">
        <img src={actId.img} alt="" />
        <Link to={`/acts/${actId._id}`} style={{}}>
          <h3 className="act-item">{actId.actName}</h3>
        </Link>
      </div>
      <div className="item-head">
        <img src={actId.associationId.logo} alt="" />
        <Link to={`/associations/${actId.associationId._id}`}>
          <h3 className="asso-item">{actId.associationId.associationName}</h3>
        </Link>
      </div>
      <div className="div3">
        {isAccepted && <FaCheck color="green" />}
        {isDeclined && <IoClose color="red" />}
        {isPending && <CiClock1 />}
      </div>
    </div>
  );
}

export default RequestItem;
