import { Component } from "preact";

export default class Desk extends Component {
  render({ suit, run, hasReveal, key }) {    
    return hasReveal
      ? <div className={`${suit} c${run}`} key={key} />
      : <div className="B" />
  }
}
