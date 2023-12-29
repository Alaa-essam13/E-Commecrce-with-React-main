import { specialOffers } from "../../data/special-offers.js";
import Offer from "./Offer";
import "./special-offers.css";

const SpecialOffers = () => {
    
  return (
    <div className="special-offers">
      <h1 className="special-offers-title">
      Big offers of the day  
        <span className="special-offers-icon-wrapper">
          <i className="bi bi-stopwatch"></i> For 24 hours only
        </span>
      </h1>
      <div className="special-offers-wrapper">
        {specialOffers.map( offer => (
          <Offer key={offer.id} offer={offer} />
        ))}
      </div>
    </div>
  );
};

export default SpecialOffers;
