import { Component } from "preact";
import Hand from "./Hand";

export default class Player extends Component {
  render({ player }){    
    return (
      <div className = "player">        
        <p>{player.name} : </p>        
        <Hand cards={player.hand} />
        <p>{player.chips}</p>
      </div>
    );
  }
}