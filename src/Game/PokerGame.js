import PokerPlayer from "./PokerPlayer";

class PokerGame {
  constructor(deck = originDeck, smallBlind = 2, chipsAmount = n => 1000) {
    this.setSmallBlind(smallBlind)
    this.originDeck = deck
    this.shuffle()
    this.state = 'dealing'
    this.fly = null
    this.all = 'Jack|McMee|Wheeler|Amigo|Banx|Lucy'.split('|')
      .map((name, i) => new PokerPlayer(name, playerDom(i + 1), chipsAmount(i)))
    this.all.forEach(player => player.handView = '')
    //this.dealer = new PokerPlayer("Street", $('#street'))
    //$street.text('')
    this.inactive()
  }

  shuffle() {
    this.deck = [...this.originDec].sort(shuffle)
  }

  inactive() { 
    //$('.player,#dealer').removeClass('active') 
  }

  dealOneCard() { let card = this.deck.pop(); return card.join("") }

  dealCardToPlayer(n) {
    info(`Deal card to:${this.all[n].name}`)
    this.all[n].handAdd(this.dealOneCard())
  }

  setSmallBlind(amount) {
    info(`Big Blind amount is:${amount}`)
    this.smallBlindAmount = amount
  }

  nextPlayer(n) {
    info(`Active player is: ${this.all[n].name}`)
  }

  *theFlop(co) {
    info("The Flop")
    yield this.dealer.handAdd(this.dealOneCard())
    yield this.dealer.handAdd(this.dealOneCard())
    yield this.dealer.handAdd(this.dealOneCard())
  }

  theTurn() {
    info("The Turn")
    this.dealer.handAdd(this.dealOneCard())
  }

  theRiver() {
    info("The River")
    this.dealer.handAdd(this.dealOneCard())
  }

  theShowdown(winnerIs) {

    let winner = winnerIs.sort((a, b) => a.score.value + a.score.high < b.score.value + b.score.high ? 1 : -1)
    winner[0].player.setAsActive()
    let winnerMessage = `Winner is: ${winner[0].player.name} :: ${winner[0].score.name}`
    // log = "--------\n" + winnerMessage
    info(winnerMessage)
    return winner[0].player
    // this.all.filter( player => player.name == winner[0].player.name )[0]
  }

  reShuffle() {
    // log = "Shuffle ..."
    this.shuffle()
    this.all.forEach(player => player.handClear())
    this.dealer.handClear()
    this.inactive()
  }

  matrixLine(cards) {
    let matrix = runSuitArray.map(run => cards.match(check[run]))
    let line = matrix.map(n => n && n.length ? "" + n.length : "0").join("")
    let run = line.slice(12, 13) + line.slice(0, 13)
    let suit = line.slice(-4)
    return { matrix, run, suit }
  }

  highCard(result, found) {
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
        high = result.run.lastIndexOf(3) 
        break;

      case pokerHands.STRAIGHT_FLUSH.name:
        break;

      case pokerHands.FLUSH.name:
        break;
    }
    return high
  }

  score(result) {
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
      let flushLine = this.matrixLine(flushCards[0].join(""))
      if (flushLine.run.match(/[^0]{5}/g)) {
        found = (flushLine.run.match(/[^0]{5}$/)) ? pokerHands.ROYAL_FLUSH : pokerHands.STRAIGHT_FLUSH
      }
    }

    if (result.run.match(/4/g)) { found = pokerHands.FOUR_OF_KIND }


    found.high = this.highCard(result, found)

    return found
  }

  result(player) {
    let cards = player.hand + this.dealer.hand
    let result = this.matrixLine(cards)
    let score = this.score(result)

    return { player, cards, result, score }
  }

  *theBetRound(phase) {
    for (let player of this.all) {
      let amount = ~~(Math.random() * 5) * 10
      yield player.placeBet(amount)
    }

    let collect = 0
    this.all.forEach(player => collect += player.drawBet())
    yield this.dealer.bet += collect
  }

  *dealing() {
    for (let i = 0; i < this.all.length; i++) {
      yield this.dealCardToPlayer(i)
      yield this.dealCardToPlayer(i)
    }
  }

  *showScores(winnerIs) {
    for (let player of this.all) {
      let res = this.result(player)
      winnerIs.push(res)
      yield player.nameView = `${res.player.name} : ${res.score.name}`
    }
  }

  // ------------ main game flow -----------------

  *singleRound() {

    for (let deal of this.dealing()) yield deal

    for (let flop of this.theBetRound('Flop')) yield flop

    for (let flop of this.theFlop()) yield

    for (let turn of this.theBetRound('Turn')) yield turn
    yield this.theTurn();

    for (let river of this.theBetRound('River')) yield river
    yield this.theRiver();

    for (let showdown of this.theBetRound('Showdown')) yield showdown

    let winnerIs = []
    for (let score of this.showScores(winnerIs)) yield score
    let winner = this.theShowdown(winnerIs)
    yield winner
    winner.chips += this.dealer.drawBet()
    for (let pause of Array(10)) yield winner

  }

  *match(amount) {
    for (let round of Array(amount)) {
      this.reShuffle()
      for (let step of this.singleRound()) yield step
    }
  }

  runner(amount) {
    let play = this.match(amount);
    this.stopPlay = setInterval(() => play.next(), 70)
  }

  stop() { clearInterval(this.stopPlay) }

}