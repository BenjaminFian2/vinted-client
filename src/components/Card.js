import "./Card.css";

import { Link } from "react-router-dom";

const Card = ({ offer }) => {
  return (
    <Link to={`/offer/${offer._id}`} className="Link">
      <div className="Card">
        <div className="Card-user">
          {offer.owner.account.avatar && (
            <img
              className="Card-img-user"
              alt="avatar"
              src={offer.owner.account.avatar.secure_url}
            ></img>
          )}

          <span className="Card-username">{offer.owner.account.username}</span>
        </div>
        <div>
          <div className="Card-container-item-img">
            <img
              src={offer.product_image.secure_url}
              alt={offer.product_name}
              className="Card-item-img"
            />
          </div>

          <div className="Card-item-details">
            <span className="Card-price">{offer.product_price} €</span>
            <span className="Card-size">
              {offer.product_details[1].TAILLE &&
                offer.product_details[1].TAILLE.toUpperCase()}
            </span>
            <span className="Card-brand">
              {offer.product_details[0].MARQUE &&
                offer.product_details[0].MARQUE.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
