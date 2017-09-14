const suit = "CDHS";
const run = "234567890JQKA";
const suitArray = [...suit];
const runArray = [...run];
const runSuitArray = [...run, ...suit];

const check = {
  "2": /.2/g, "3": /.3/g, "4": /.4/g, "5": /.5/g, "6": /.6/g, "7": /.7/g,
  "8": /.8/g, "9": /.9/g, "0": /.0/g, "J": /.J/g, "Q": /.Q/g, "K": /.K/g,
  "A": /.A/g, "C": /C./g, "D": /D./g, "H": /H./g, "S": /S./g,
}

const pokerHands = {
  HIGH_CARD: { name: "High Card", value: 0 },
  ONE_PAIR: { name: "One Pair", value: 100 },
  TWO_PAIR: { name: "Two Pair", value: 200 },
  THREE_OF_KIND: { name: "Three of kind", value: 300 },
  STRAIGHT: { name: "Straight", value: 400 },
  FLUSH: { name: "Flush", value: 500 },
  FULL_HOUSE: { name: "Full house", value: 600 },
  FOUR_OF_KIND: { name: "Four of kind", value: 700 },
  STRAIGHT_FLUSH: { name: "Straight flush", value: 800 },
  ROYAL_FLUSH: { name: "Royal flush", value: 900 }
};

const originDeck = [...suit]
  .map(s => [...run]
  .map(r => [s, r]))
  .reduce((a, b) => [...a, ...b]);
