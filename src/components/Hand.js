import { Component } from "preact";
import Card from "./Card";

export default class Hand extends Component {
  render({ cards }) {
    return (
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
  }
}
