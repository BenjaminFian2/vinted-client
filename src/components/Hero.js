import "./Hero.css";

import hero from "../assets/img/hero.jpg";
import tear from "../assets/img/tear.svg";

const Hero = () => {
  return (
    <div className="Hero">
      <img src={hero} alt="hero" className="Hero-img" />
      <div>
        <img src={tear} alt="tear" className="Hero-tear" />
        <div className="Hero-ready">
          <p className="Hero-ready-title">
            Prêts à faire du tri dans vos placards ?
          </p>
          <button className="Hero-ready-button">Commencer à vendre</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
