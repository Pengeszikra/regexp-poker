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

const hand = ( 
  holeCards, 
  communityCards, 
  cards = holeCards.concat(communityCards),
  texas = cards => {
    const typeNames = [
      'nothing',
      'pair',
      'two pair',
      'three-of-a-kind',
      'straight',
      'flush',
      'full house',
      'four-of-a-kind',
      'straight-flush'
    ]
    let type  = typeNames[0]
    let ranks = cards.map( e => e.charAt(0) ).sort( (a,b) => a>b ? -1:1 )

    let colors = cards.reduce( (r,e,i) => {
      let card = [...e]
      r[card[1]] = r[card[1]] ? [...r[card[1]],card[0]] : [card[0]]
      return r
    } , {} )
    let result = [...'♣♠♥♦'].reduce( (r,e) => {
      let cl = colors[e] ? colors[e].length : 0
      let ty = cl ? colors[e].reduce( (rr,ee) => 0 , [] ) : 0
      return cl ? [...r,e+cl] : [...r]
    }, [])
    return {m:result, type, ranks}
  },
  {type, ranks, m} = texas( cards )
) => ({m, type, ranks})

console.log(hand(['K♠','Q♦'],['J♣','Q♥','9♥','2♥','3♦']))
console.log(hand(['A♠','K♦'],['J♥','5♥','10♥','Q♥','3♥']))
console.log(test())