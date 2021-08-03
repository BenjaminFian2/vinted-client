import "./Header.css";

import { Link, useHistory } from "react-router-dom";

import logo from "../assets/img/logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Header = ({
  setUser,
  setUser_Id,
  setNumItems,
  queries,
  setQueries,
  setPage,
  prices,
  setPrices,
  setModalLogin,
  setModalRegister,
  tokenId,
  setRedirectPublish,
}) => {
  let history = useHistory();
  return (
    <div className="Header">
      <Link to={"/"}>
        <img src={logo} alt="logo" className="Header-logo" />
      </Link>
      <div className="Header-box-input">
        <input
          type="text"
          placeholder="Recherche des articles"
          className="Header-input"
          onChange={(event) => {
            const tab = [...queries];
            tab[0] = event.target.value;
            setQueries(tab);
            setPage(1);
            setNumItems(5);
          }}
        />
        <FontAwesomeIcon
          icon="search"
          color="#bbb"
          className="Header-icon-search"
        />
        <div>
          <div className="Header-box-sort-price">
            <span className="Header-label-checkbox">Trier par prix :</span>
            <label className="Header-checkbox">
              <input
                type="checkbox"
                name="price"
                className="Header-checkbox-input"
                onClick={(event) => {
                  const tab = [...queries];
                  if (event.target.checked) {
                    const str = "price-desc";
                    tab[1] = str;
                  } else {
                    const str = "price-asc";
                    tab[1] = str;
                  }
                  setQueries(tab);
                  setPage(1);
                }}
              />
              <div className="Header-checkbox-slider round">
                <span className="on">⇣</span>
                <span className="off">⇡</span>
              </div>
            </label>
            <span className="Header-label-slider">Prix entre : </span>
            <div className="Header-sliderArea">
              <Range
                trackStyle={[{ backgroundColor: "#2cb1ba" }]}
                handleStyle={[{ backgroundColor: "#2cb1ba" }]}
                railStyle={{ backgroundColor: "#cccccc" }}
                min={0}
                max={500}
                defaultValue={[prices[0], prices[1]]}
                tipFormatter={(value) => `${value} €`}
                tipProps={{
                  placement: "top",
                  visible: true,
                  prefixCls: "rc-slider-tooltip",
                }}
                onChange={(values) => {
                  setPrices(values);
                  setPage(1);
                  setNumItems(5);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="Header-container-buttons">
        {tokenId ? (
          <button
            className="Header-disconnected"
            onClick={() => {
              setUser(null);
              setUser_Id(null);
              if (window.location.pathname !== "/") {
                history.push("/");
              } else {
                window.location.reload();
              }
              setRedirectPublish(false);
            }}
          >
            Se Déconnecter
          </button>
        ) : (
          <button
            className="Header-register"
            onClick={() => {
              // history.push("/signup");
              setModalRegister(true);
            }}
          >
            S'inscrire
          </button>
        )}
        {!tokenId && (
          <button
            className="Header-login"
            onClick={() => {
              // history.push("/login");
              setModalLogin(true);
            }}
          >
            Se connecter
          </button>
        )}
        <button
          className="Header-sell"
          onClick={() => {
            if (tokenId) {
              history.push("/publish");
            } else {
              setModalLogin(true);
              setRedirectPublish(true);
            }
          }}
        >
          Vends tes articles
        </button>
      </div>
    </div>
  );
};

export default Header;
