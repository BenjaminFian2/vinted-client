import "./Signup.css";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [data, setData] = useState({ username: "", email: "", password: "" });

  let history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL_API}/user/signup`,
        data
      );
      console.log(response);
      history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="Signup">
      <div className="Signup-container">
        <h2>S'inscrire</h2>
        <form className="Signup-form" onSubmit={(event) => handleSubmit(event)}>
          <input
            placeholder="Nom d'utilisateur"
            type="text"
            onChange={(event) => {
              const obj = { ...data };
              obj.username = event.target.value;
              setData(obj);
            }}
          />
          <input
            placeholder="Email"
            type="email"
            onChange={(event) => {
              const obj = { ...data };
              obj.email = event.target.value;
              setData(obj);
            }}
          />
          <input
            placeholder="Mot de passe"
            type="password"
            onChange={(event) => {
              const obj = { ...data };
              obj.password = event.target.value;
              setData(obj);
            }}
          />
          <div className="Signup-checkbox-container">
            <div>
              <input type="checkbox" />
              <span>S'inscrire à notre newsletter</span>
            </div>
            <p>
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>
          </div>
          <input type="submit" />
        </form>
        <Link to="/login" className="Signup-redirect">
          Tu as déjà un compte ? Connecte-toi !
        </Link>
      </div>
    </div>
  );
};

export default Signup;
