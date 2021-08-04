import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

const CheckoutForm = ({ userId, price, description }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: userId,
      });
      const response = await axios.post(
        `https://benalgo-vinted-server.herokuapp.com/payment`,
        {
          stripeToken: stripeResponse.token.id,
          price: price,
          description: description,
        }
      );
      if (response.data.response.status === "succeeded") {
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {completed ? (
        <p>Merci pour votre achat.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <div className="Payment-container-submit">
            <button type="submit">Payer</button>
          </div>
        </form>
      )}
    </>
  );
};

export default CheckoutForm;
