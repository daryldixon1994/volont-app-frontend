/*eslint-disable */
import { Card } from "primereact/card";
import { Link } from "react-router-dom";

export default function AssoItem({
  associationName,
  logo,
  description,
  category,
  _id,
}) {
  const header = (
    <Link to={`/associations/${_id}`}>
      {" "}
      <img alt="Card" src={logo} />
    </Link>
  );

  return (
    <div className="card flex justify-content-center">
      <Card
        title={
          <Link to={`/associations/${_id}`} style={{ color: "#4C596F" }}>
            {associationName}
          </Link>
        }
        subTitle={`#${category}`}
        header={header}
        className="md:w-25rem"
      >
        <p className="m-0">
          {description.substr(0, 26)}..{" "}
          <Link to={`/associations/${_id}`}>see more</Link>{" "}
        </p>
      </Card>
    </div>
  );
}
