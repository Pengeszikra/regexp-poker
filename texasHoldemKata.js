const assertEquals = (a,b, stirngify = JSON.stringify ) => stirngify(a) === stirngify(b)

test = _ => [
    assertEquals({type:'nothing', ranks:['A','K','Q','J','9']},hand(['K♠','A♦'],['J♣','Q♥','9♥','2♥','3♦'])),
    assertEquals({type:'pair', ranks:['Q','K','J','9']},hand(['K♠','Q♦'],['J♣','Q♥','9♥','2♥','3♦'])),
		assertEquals({type:'two pair', ranks:['K','J','9']},hand(['K♠','J♦'],['J♣','K♥','9♥','2♥','3♦'])),
		assertEquals({type:'three-of-a-kind', ranks:['Q','J','9']},hand(['4♠','9♦'],['J♣','Q♥','Q♠','2♥','Q♦'])),
		assertEquals({type: 'straight', ranks:['K','Q','J','10','9']},hand(['Q♠','2♦'],['J♣','10♥','9♥','K♥','3♦'])),
		assertEquals({type:'flush', ranks:['Q','J','10','5','3']},hand(['A♠','K♦'],['J♥','5♥','10♥','Q♥','3♥'])),
		assertEquals({type:'full house', ranks:['A','K']},hand(['A♠','A♦'],['K♣','K♥','A♥','Q♥','3♦'])),
		assertEquals({type:'four-of-a-kind', ranks:['2','3']},hand(['2♠','3♦'],['2♣','2♥','3♠','3♥','2♦'])),
    assertEquals({type:'straight-flush', ranks:['J','10','9','8','7']},hand(['8♠','6♠'],['7♠','5♠','9♠','J♠','10♠'])),
]

const jj = p => JSON.stringify(p)

const hand = ( 
  holeCards, 
  communityCards, 
  cards = holeCards.concat(communityCards),
  texas = cards => {
    const typeNames = ['nothing','pair','two pair','three-of-a-kind','straight','flush','full house','four-of-a-kind','straight-flush']
    const runOrder = '23456789JQKA'
    //const suit = {'♣':'C','♦':'D','♥':'H','♠':'S'}
    let type  = 0
    let ranks = []
    const isStraight = hand => false
    
    const matrix = cards.reduce( (r,card) => {
      let {f,c} = {f:card.charAt(0),c:card.charAt(1)} 
      let cw = runOrder.indexOf(f)     
      r[f] = r[f] ? [...r[f],{card,cw}] : [{card,cw}]
      r[c] = r[c] ? [...r[c],{card,cw}] : [{card,cw}]
      r.suitMax = r[c].length > r.suitMax.length ? r[c] : r.suitMax
      if( r[f].length > r.runMax[0].length ){ r.runMax.unshift(r[f]) }
      return r
    }, {suitMax:[],runMax:[[]]} )

    if( matrix.runMax[0].length === 2 ){ type = matrix.runMax[1].length == 2 ? 2 : 1 }
    if( matrix.runMax[0].length === 3 ){ type = matrix.runMax[1].length >= 2 ? 6 : 3 }
    if( matrix.runMax[0].length === 4 ){ type = 7 }   
    if( matrix.suitMax.length >= 4 ){ type = isStraight( matrix.suitMax ) ? 8 : 5 }
    else if( isStraight( matrix ) ){ type = 4 }

    ranks = matrix.suitMax.sort( (a, b) => a.cw < b.cw ? 1:-1 ).map( c => c.card.charAt(0) )

    let m = matrix 
    type = typeNames[type]
    return {m, type, ranks}
  },
  {type, ranks, m} = texas( cards )
) => ({ type, ranks})

console.log(hand(['K♠','A♦'],['J♣','Q♥','9♥','2♥','3♦']))
console.log(hand(['K♠','Q♦'],['J♣','Q♥','9♥','2♥','3♦']))
console.log(hand(['K♠','J♦'],['J♣','K♥','9♥','2♥','3♦']))
console.log(hand(['4♠','9♦'],['J♣','Q♥','Q♠','2♥','Q♦']))
console.log(hand(['Q♠','2♦'],['J♣','10♥','9♥','K♥','3♦']))
console.log(hand(['A♠','K♦'],['J♥','5♥','10♥','Q♥','3♥']))
console.log(hand(['A♠','A♦'],['K♣','K♥','A♥','Q♥','3♦']))
console.log(hand(['2♠','3♦'],['2♣','2♥','3♠','3♥','2♦']))
console.log(hand(['8♠','6♠'],['7♠','5♠','9♠','J♠','10♠']))
console.log(test())