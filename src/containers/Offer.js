import "./Offer.css";

import { useParams, useHistory } from "react-router-dom";

import axios from "axios";

import { useEffect, useState } from "react";

const Offer = ({ tokenId, userId, setModalLogin, setEditMode }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL_API}/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  let history = useHistory();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://benalgo-vinted-server.herokuapp.com/offer/delete/${id}`,
        { headers: { authorization: `Bearer ${tokenId}` } }
      );
      history.push("/");
      window.location.reload();
    } catch (error) {
      console.log(error.mesage);
    }
  };

  return isLoading ? (
    <div className="roller-container">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  ) : (
    <div className="Offer">
      <div className="Offer-container">
        <img
          src={data.product_image.secure_url}
          alt={data.product_name}
          className="Offer-img"
        />
        <div className="Offer-details">
          <div>
            <span className="Offer-price">
              {data.product_price.toFixed(2)} €
            </span>
            <ul className="Offer-list">
              {data.product_details.map((item, index) => {
                const keys = Object.keys(item);
                return (
                  <li key={index}>
                    <span>{keys[0]}</span>
                    <span className="Offer-infos-item">
                      {item[keys[0]].toUpperCase()}
                    </span>
                  </li>
                );
              })}
              <li>
                <span>MODE DE PAIEMENT</span>
                <span className="Offer-infos-item">CARTE BANCAIRE, PAYPAL</span>
              </li>
            </ul>
          </div>
          <div className="Offer-divider"></div>
          <div className="Offer-content">
            <p className="Offer-name">{data.product_name}</p>
            <p className="Offer-description">{data.product_description}</p>
            <div className="Offer-username">
              {data.owner.account.avatar ? (
                <img
                  className="Card-img-user"
                  alt="avatar"
                  src={data.owner.account.avatar.secure_url}
                ></img>
              ) : (
                <div className="Card-img-user anon">
                  <span>{data.owner.account.username[0].toUpperCase()}</span>
                </div>
              )}
              <span>{data.owner.account.username}</span>
            </div>
          </div>
          <button
            className="Offer-btn"
            onClick={() => {
              if (tokenId) {
                history.push("/payment", { offer: data });
                setEditMode({ active: false, offer: {} });
              } else {
                setModalLogin(true);
              }
            }}
          >
            Acheter
          </button>
          {tokenId && userId === data.owner._id && (
            <div className="Offer-btn-container">
              <button
                className="Offer-btn edit"
                onClick={() => {
                  history.push("/publish");
                  setEditMode({ active: true, offer: data });
                }}
              >
                Modifier
              </button>
              <button
                className="Offer-btn delete"
                onClick={() => {
                  handleDelete();
                }}
              >
                Supprimer
              </button>
            </div>
          )}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Offer;
