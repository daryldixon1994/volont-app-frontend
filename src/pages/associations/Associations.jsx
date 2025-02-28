import { PuffLoader } from "react-spinners";
import { baseUserUrl } from "../../lib";
import useFetch from "../../lib/useFetch";
import "./style.css";
import AssoItem from "../../components/assoItem/AssoItem";
function Associations() {
  const { data } = useFetch(`${baseUserUrl}/getAssociations`);

  return (
    <div className="acts-page">
      <h1>Associations:</h1>
      {data.length > 1 ? (
        <div className="acts-bloc">
          {data.map((act, i) => (
            <AssoItem key={i} {...act} />
          ))}
        </div>
      ) : (
        <div className="acts-loading-box">
          <PuffLoader color="#f24638" size={200} />
        </div>
      )}
    </div>
  );
}

export default Associations;
