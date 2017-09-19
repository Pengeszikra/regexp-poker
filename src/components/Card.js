import { Component } from "preact";

export default class Desk extends Component {
  render({ suit, run, hasReveal, id }) {    
    return hasReveal
      ? <div className={`${suit} c${run}`} key={id} />
      : <div className="B" />
  }
}
