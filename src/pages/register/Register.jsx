import { useSelector } from "react-redux";
import RegisterAssociation from "../../components/registerAssociation/RegisterAssociation";
import RegisterUser from "../../components/registerUser/RegisterUser";

function Register() {
  const { toggleRegister } = useSelector((store) => store.connexionReducer);
  return (
    <div className="cnx-page">
      {toggleRegister ? <RegisterAssociation /> : <RegisterUser />}
    </div>
  );
}

export default Register;
