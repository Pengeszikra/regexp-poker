export const suit = "CDHS";
export const run = "234567890JQKA";
export const suitArray = [...suit];
export const runArray = [...run];
export const runSuitArray = [...run, ...suit];

export const check = {
  "2": /.2/g, "3": /.3/g, "4": /.4/g, "5": /.5/g, "6": /.6/g, "7": /.7/g,
  "8": /.8/g, "9": /.9/g, "0": /.0/g, "J": /.J/g, "Q": /.Q/g, "K": /.K/g,
  "A": /.A/g, "C": /C./g, "D": /D./g, "H": /H./g, "S": /S./g,
}

export const pokerHands = {
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

// export const originDeck = [...suit].map(s => [...run].map(r => [s, r])).reduce((a, b) => [...a, ...b]);

export const originDeck = [].concat.apply([],
    [].slice.call(suit).map(s => [].slice.call(run).map(r => [s, r]))
  )

export const shuffle = () => Math.random() > .5 ? 1 : -1;

export const gui = () => Math.random().toString(32).slice(2).toUpperCase();