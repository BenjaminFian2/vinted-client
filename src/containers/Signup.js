import "./Signup.css";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = ({
  setUser,
  setUser_Id,
  setModalRegister,
  setModalLogin,
  redirectPublish,
}) => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });
  const [errorMessage, setErrormessage] = useState("");

  let history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `https://benalgo-vinted-server.herokuapp.com/user/signup`,
        data
      );
      if (response.data.token) {
        setUser(response.data.token);
      }
      if (response.data._id) {
        setUser_Id(response.data._id);
      }

      if (redirectPublish) {
        history.push("/publish");
      }
      setModalRegister(false);
    } catch (error) {
      if (error.response.status === 409) {
        setErrormessage("Un compte portant cet email existe déja !");
      }
      console.log(error.response.data.message);
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
            placeholder="Téléphone"
            type="text"
            onChange={(event) => {
              const obj = { ...data };
              obj.phone = event.target.value;
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
          <p>{errorMessage}</p>
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
        <span
          onClick={() => {
            setModalLogin(true);
            setModalRegister(false);
          }}
          className="Signup-redirect"
        >
          Tu as déjà un compte ? Connecte-toi !
        </span>
      </div>
    </div>
  );
};

export default Signup;
