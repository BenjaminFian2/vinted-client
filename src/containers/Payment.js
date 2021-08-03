import "./Payment.css";

import { useLocation, Redirect } from "react-router";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51JKMwKFErpohNBSsaQEK58QH8ynigF9TxWiPQgs4eQFU95XEH1RtoxMjYvSthusuzQaulLEnTkJTfdQJ1BhplUpM00MRWxwPA6"
);

const Payment = ({ userId, tokenId }) => {
  const location = useLocation();
  const { offer } = location.state;

  return !tokenId ? (
    <Redirect to="/" />
  ) : (
    <div className="Payment">
      <div className="Payment-container">
        <div className="Payment-card">
          <div className="Payment-card-title">Résumé de la commande</div>
          <div className="Payment-card-content">
            <ul>
              <li>
                Commande
                <span>{offer.product_price.toFixed(2)} €</span>
              </li>
              <li>
                Frais protection acheteurs
                <span>0.80 €</span>
              </li>
              <li>
                Frais de port
                <span>1.60 €</span>
              </li>
            </ul>
          </div>
          <div className="Payment-divider"></div>
          <div className="Payment-card-content">
            <ul>
              <li className="Payment-bold">
                Total <span>{(offer.product_price + 2.4).toFixed(2)} €</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="Payment-card">
          <div className="Payment-card-content">
            Il ne vous reste plus qu'un étape pour vous offrir{" "}
            <span> {offer.product_name}. </span>Vous allez payer{" "}
            <span>{(offer.product_price + 2.4).toFixed(2)} € </span>(frais de
            protection et frais de port inclus).
            <div className="Payment-divider"></div>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                userId={userId}
                price={offer.product_price}
                description={offer.product_name}
              />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
