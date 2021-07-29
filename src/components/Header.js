import "./Header.css";

import { Link, useHistory } from "react-router-dom";

import logo from "../assets/img/logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Cookies from "js-cookie";

const Header = ({ token }) => {
  let history = useHistory();
  return (
    <div className="Header">
      <Link to={"/"}>
        <img src={logo} alt="logo" className="Header-logo" />
      </Link>
      <div className="box-Header-input">
        <input
          type="text"
          placeholder="Recherche des articles"
          className="Header-input"
        />
        <FontAwesomeIcon
          icon="search"
          color="#bbb"
          className="Header-icon-search"
        />
      </div>
      {token ? (
        <button
          className="Header-disconnected"
          onClick={() => {
            Cookies.remove("token");
            if (window.location.pathname !== "/") {
              history.push("/");
            } else {
              window.location.reload();
            }
          }}
        >
          Se Déconnecter
        </button>
      ) : (
        <button
          className="Header-register"
          onClick={() => {
            history.push("/signup");
          }}
        >
          S'inscrire
        </button>
      )}
      {!token && (
        <button
          className="Header-login"
          onClick={() => {
            history.push("/login");
          }}
        >
          Se connecter
        </button>
      )}
      <button className="Header-sell">Vends tes articles</button>
    </div>
  );
};

export default Header;
