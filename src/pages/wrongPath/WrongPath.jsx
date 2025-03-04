import { Link } from "react-router-dom";
import "./WrongPath.css";

const WrongPath = () => {
  return (
    <div className="wrong-path">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link className="wrong-path-link" to="/">Go to Home</Link>
    </div>
  );
};

export default WrongPath;
