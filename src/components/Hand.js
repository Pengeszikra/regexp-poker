import React from "react";
import Card from "./Card";

export default ({ cards }) => (
  <div className="hand">
    {cards.map(card => (
      <Card 
        suit={card.suit} 
        run={card.run} 
        id={card.id} 
        hasReveal={card.hasReveal}
      />
    ))}
  </div>
);