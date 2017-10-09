https://www.codewars.com/kata/boggle-word-checker/train/javascript

const tb = [
  ["E","A","R","A"],
  ["N","L","E","C"],
  ["I","A","I","S"],
  ["B","Y","O","R"]
]

const prep = arr => work => work( tb.reduce( (r,a)=>[...r,...a] , [] ) , tb.length, tb[0]? tb[0].length : 0 )
const bwc( ( t, w, h ) => console.log( t, w, h ) )