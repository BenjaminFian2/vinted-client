import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = ({ setUser }) => {
  const [data, setData] = useState({ email: "", password: "" });

  let history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL_API}/user/login`,
        data
      );
      console.log(response);
      const token = response.data.token;
      setUser(token);
      history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="Login">
      <div className="Login-container">
        <h2>Se connecter</h2>
        <form className="Login-form" onSubmit={(event) => handleSubmit(event)}>
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
          <input type="submit" />
        </form>
        <Link to="/signup" className="Login-redirect">
          Pas encore de compte ? Inscris-toi !
        </Link>
      </div>
    </div>
  );
};

export default Login;
