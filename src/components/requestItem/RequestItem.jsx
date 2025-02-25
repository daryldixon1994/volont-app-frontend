/*eslint-disable */
import "./style.css";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { CiClock1 } from "react-icons/ci";

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
        <h3 class="act-item">{actId.actName}</h3>
      </div>
      <div className="item-head">
        <img src={actId.associationId.logo} alt="" />

        <h3 class="asso-item">{actId.associationId.associationName}</h3>
      </div>
      <div className="div3">
        {isAccepted && <FaCheck color="green" />}
        {isDeclined && <IoClose />}
        {isPending && <CiClock1 />}
      </div>
    </div>
  );
}

export default RequestItem;
