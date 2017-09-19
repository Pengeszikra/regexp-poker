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

export const matrixLine = cards => {
  let matrix = runSuitArray.map(run => cards.match(check[run]))
  let line = matrix.map(n => n && n.length ? "" + n.length : "0").join("")
  let run = line.slice(12, 13) + line.slice(0, 13)
  let suit = line.slice(-4)
  return { matrix, run, suit }
}

export const highCard = (result, found) => {
  let high = 0
  switch (found.name) {
    case pokerHands.HIGH_CARD.name:
    case pokerHands.ONE_PAIR.name:
    case pokerHands.TWO_PAIR.name:
    case pokerHands.THREE_OF_KIND.name:
    case pokerHands.FOUR_OF_KIND.name:
    case pokerHands.STRAIGHT.name:
      high = result.run.lastIndexOf(1)
      break;

    case pokerHands.FULL_HOUSE.name:
      high = result.run.lastIndexOf(3) // result.run.lastIndexOf(2)/10
      break;

    case pokerHands.STRAIGHT_FLUSH.name:
      break;

    case pokerHands.FLUSH.name:
      break;
  }
  return high
}

export const score = result => {
  let found = pokerHands.HIGH_CARD

  let pairs = result.run.slice(1).match(/2/g)
  if (pairs && pairs.length) {
    if (pairs.length > 1) { found = pokerHands.TWO_PAIR } else { found = pokerHands.ONE_PAIR }
  }

  if (result.run.match(/3/g)) {
    if (pairs && pairs.length) { found = pokerHands.FULL_HOUSE } else { found = pokerHands.THREE_OF_KIND }
  }

  if (found != pokerHands.FULL_HOUSE && result.run.match(/[^0]{5}/g)) { found = pokerHands.STRAIGHT }

  let flushCards = result.matrix.slice(13).filter(e => e && e.length >= 5)

  if (flushCards.length) {
    if (found != pokerHands.FULL_HOUSE) { found = pokerHands.FLUSH }
    let flushLine = matrixLine(flushCards[0].join(""))
    if (flushLine.run.match(/[^0]{5}/g)) {
      found = (flushLine.run.match(/[^0]{5}$/)) ? pokerHands.ROYAL_FLUSH : pokerHands.STRAIGHT_FLUSH
    }
  }

  if (result.run.match(/4/g)) { found = pokerHands.FOUR_OF_KIND }


  found.high = highCard(result, found)

  return found
}

const handToString = hand => {
  hand.map( card => card.suit + card.run ).join("");
}

export const result = ({player, dealer}) => {
  let cards = handToString([...player.hand,...dealer.hand]); // TDOD slow 
  let result = matrixLine(cards)
  let score = score(result)
  return { player, cards, result, score }
}