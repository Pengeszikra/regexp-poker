export const gui = () => Math.random().toString(32).slice(2).toUpperCase();

export class PokerPlayer {
  constructor( name, chips = 0 ){
    this.name = name;
    this.chips = chips;
    this.hands = [];
    this.key = gui();
  }
}

export class PokerCard {
  constructor( suit, run, hasRevealed ){
    this.suit = suit;
    this.run = run;
    this.hasRevealed = hasRevealed;
    this.key = gui();
  }

  get toString(){
    return suit+run;
  }
}

