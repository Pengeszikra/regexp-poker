import { Component } from "preact";
import Hand from "./Hand";

export default class Player extends Component {
  render({ player }){    
    console.log(player.name,player.key)
    return (
      <div className = "player">        
        <p>{player.name} : </p>        
        <Hand cards={player.hand} />
      </div>
    );
  }
}