class PokerPlayer {
  constructor(name, view, chips = 0) {
    this.name = name
    this.view = view

    this._hand = ""
    this._chip = 0
    this._bet = 0

    this.chips = chips

    this.nameView = name
  }

  getHand() {
    return this.hand
  }

  setAsActive() {
    this.view.addClass('active');
  }

  get handView() { return this.view.children('.hand').html() }
  set handView(value) { return this.view.children('.hand').html(value) }

  get nameView() { return this.view.children('p').html() }
  set nameView(value) { return this.view.children('p').html(value) }

  get chipsView() { return this.view.children('.chips').html() }
  set chipsView(value) { return this.view.children('.chips').html(value) }

  get betView() { return this.view.children('.bet').html() }
  set betView(value) { return this.view.children('.bet').html(value) }

  get status() { return this._status } // 
  set status(status) {
    this._status = status
  }

  get chips() { return this._chips }
  set chips(value) {
    this._chips = value
    this.chipsView = value ? value : ""
    this.render()
  }

  get bet() { return this._bet }
  set bet(value) {
    this._bet = value
    this.betView = value ? value : ""
    this.render()
  }

  drawBet() {
    let draw = this.bet
    this.bet = 0
    return draw
  }

  get hand() { return this._hand }
  set hand(cardString) {
    this._hand = cardString
    this.render()
  }

  handAdd(cardString) { this.hand += cardString }

  handClear() { this.hand = "" }

  placeBet(amount) {
    if (amount <= this.chips) {
      this.chips -= amount
      this.bet += amount
    }
  }

  cardClass(which) { return this.hand.slice(which * 2, which * 2 + 2).replace(/(C|D|H|S)/, "$1 c") }

  render() {
    let value = ''
    for (let i = 0; i < this._hand.length / 2; i++)
      value += `<div class="${this.cardClass(i)}"></div>`
    this.handView = value
  }

}
