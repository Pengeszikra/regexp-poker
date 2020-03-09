const assertEquals = (a,b, stirngify = JSON.stringify ) => stirngify(a) === stirngify(b);

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
    const typeNames = ['nothing','pair','two pair','three-of-a-kind','straight','flush','full house','four-of-a-kind','straight-flush']
    const runOrder = '234567890JQKA'
    let type  = 0

    const matrix = cards.reduce( (r,card) => {            
      let parse = card.match(/(2|3|4|5|6|7|8|9|0|J|Q|K|A)+(♠|♦|♣|♥)/);   
      let f = parse[1];
      let c = parse[2];
      let cw = runOrder.indexOf(f.slice(-1)) // handle 10 -> 0     
      r[f] = r[f] ? [...r[f],{card,cw}] : [{card,cw}]
      r[c] = r[c] ? [...r[c],{card,cw}] : [{card,cw}]
      r.suitMax = r[c].length > r.suitMax.length ? r[c] : r.suitMax
      if( r[f].length >= r.runMax[0].length ){ r.runMax.unshift(r[f]) }
      return r
    }, {suitMax:[],runMax:[[]]} )

    matrix

    const matrixRank = [...Object.keys(matrix)]
      .filter(key => runOrder.indexOf(key) !== -1)
      .map( key => matrix[key][0])
      .sort( (a,b) => a.cw<b.cw?1:-1 );
    
    const straightFirst = cards =>
        cards
          .sort( (a,b) => a.cw<b.cw?1:-1 )
          .map( e => e.cw )
          .findIndex( (e,i,arr,[f,g,h,j,k]=arr.slice(i,i+4)) => i<arr.length-5 && f-g===1 &&  g-h===1 && h-j===1 && j-k===1 )

    let suSt = -1;
    let isSt  = straightFirst( matrixRank )    

    let ranked = []
    const rankValue = (card, cw = type * 100 + card.cw ) => Object.assign({}, card, {cw});    
    const rankedExtra = set => set.map( card => ranked.push(rankValue(card)) );
    
    if ( matrix.suitMax.length >= 4 ){ 
       suSt = straightFirst( matrix.suitMax ) 
       type =  suSt !== -1  ? 8 : 5;             
       rankedExtra([...matrix.suitMax.slice(suSt,suSt+4)]);
    } else if (isSt !== -1){ 
      type = 4 
      rankedExtra([...matrixRank.slice(isSt,isSt+4)])
    }

    let [{length:rml0},{length:rml1}] = matrix.runMax;

    
    if ( rml0 === 2 ){ type = rml1 == 2 ? 2 : 1 }
    if ( rml0 === 3 ){ type = rml1 >= 2 ? 6 : 3 }
    if ( rml0 === 4 ){ type = 7 }   
    if( type === 2 || type === 6 ){ rankedExtra([...matrix.runMax[0],...matrix.runMax[1]]); }
    if( type === 1 || type === 3 || type === 7 ){ rankedExtra(matrix.runMax[0]); }

    rml0
    rml1
    type

    let ranks = [...matrixRank, ...ranked]
      .sort( (a,b) => a.cw<b.cw?1:-1 )
      .map( card => Object.assign({},card,{card:card.card.slice(0,card.card.length-1)}) )
      .map( e => e.card )
      .filter( (e,i,arr) => arr.indexOf(e) === i );
   
    ranks = ranks.slice(0,[5,4,3,3,5,5,2,2,5,5][type]);     
    return {type:typeNames[type], ranks};
  },
  {type, ranks} = texas( cards )
) => ({ type, ranks});

console.log(hand(['K♠','A♦'],['J♣','Q♥','9♥','2♥','3♦']))
console.log(hand(['K♠','Q♦'],['J♣','Q♥','9♥','2♥','3♦']))
console.log(hand(['K♠','J♦'],['J♣','K♥','9♥','2♥','3♦']))
console.log(hand(['4♠','9♦'],['J♣','Q♥','Q♠','2♥','Q♦']))
console.log(hand(['Q♠','2♦'],['J♣','10♥','9♥','K♥','3♦']))
console.log(hand(['A♠','K♦'],['J♥','5♥','10♥','Q♥','3♥']))
console.log(hand(['A♠','A♦'],['K♣','K♥','A♥','Q♥','3♦']))
console.log(hand(['2♠','3♦'],['2♣','2♥','3♠','3♥','2♦']))
console.log(hand(['8♠','6♠'],['7♠','5♠','9♠','J♠','10♠']))
// console.log(test())
