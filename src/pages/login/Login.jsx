import { useSelector } from "react-redux";
import LoginAssociation from "../../components/loginAssociation/LoginAssociation";
import LoginUser from "../../components/loginUser/LoginUser";
import "./style.css"
function Login() {
  const { toggleLogin } = useSelector((store) => store.connexionReducer);
  return <div className="cnx-page">{toggleLogin ? <LoginAssociation /> : <LoginUser />}</div>;
}

export default Login;
