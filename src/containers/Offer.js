import "./Offer.css";

import { useParams } from "react-router-dom";

import axios from "axios";

import { useEffect, useState } from "react";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://benalgo-vinted-server.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  console.log(data);

  return isLoading ? (
    <span>En cours de chargement...</span>
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
            <span className="Offer-price">{data.product_price} €</span>
            <ul className="Offer-list">
              {data.product_details.map((item, index) => {
                const keys = Object.keys(item);
                return (
                  <li>
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
              {data.owner.account.avatar && (
                <img
                  className="Card-img-user"
                  alt="avatar"
                  src={data.owner.account.avatar.secure_url}
                ></img>
              )}
              <span>{data.owner.account.username}</span>
            </div>
          </div>
          <button className="Offer-btn">Acheter</button>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Offer;
