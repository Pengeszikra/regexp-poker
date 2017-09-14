import { Component } from "preact";

export default class Desk extends Component {
  render({ suit, run, secret }) {
    return secret
      ? <div className="B" />
      : <div className={`${suit} c${run}`} />
  }
}
