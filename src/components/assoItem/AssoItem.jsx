/*eslint-disable */
import { Card } from "primereact/card";
import { Link } from "react-router-dom";

export default function AssoItem({
  associationName,
  logo,
  description,
  category,
}) {
  const header = (
    <Link>
      {" "}
      <img alt="Card" src={logo} />
    </Link>
  );

  return (
    <div className="card flex justify-content-center">
      <Card
        title={<Link style={{ color: "#4C596F" }}>{associationName}</Link>}
        subTitle={`#${category}`}
        header={header}
        className="md:w-25rem"
      >
        <p className="m-0">{description}</p>
      </Card>
    </div>
  );
}
