import useFetch from "../../lib/useFetch";
import { baseUserUrl } from "../../lib";
import { PuffLoader } from "react-spinners";
import "./style.css";
import ActItem from "../../components/actItem/ActItem";
function Acts() {
  const { data } = useFetch(`${baseUserUrl}/getActs`);
  return (
    <div className="acts-page">
      <h1>Acts:</h1>
      {data.length > 1 ? (
        <div className="acts-bloc">
          {data.map((act, i) => (
            <ActItem key={i} {...act} />
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

export default Acts;
