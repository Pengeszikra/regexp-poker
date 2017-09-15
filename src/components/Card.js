import { Component } from "preact";

export default class Desk extends Component {
  render({ suit, run, hasReveal }) {
    return hasReveal
      ? <div className={`${suit} c${run}`} />
      : <div className="B" />
  }
}
