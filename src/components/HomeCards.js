import "./HomeCards.css";

import Card from "./Card";

const HomeCards = ({ data }) => {
  return (
    <div className="HomeCards">
      {data.offers.map((offer, index) => {
        return <Card offer={offer} key={offer._id} />;
      })}
    </div>
  );
};

export default HomeCards;
