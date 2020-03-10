import React from "react";
import Card from "./Card";

export default ({ cards = [] }) => (
  <div className="hand">
    {cards.map(({suit, run, id, hasReveal}) => (
      <Card 
        suit={suit} 
        run={run} 
        id={id} 
        hasReveal={hasReveal}
      />
    ))}
  </div>
);