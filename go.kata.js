const go = (height, width = height) => {
  
  let turn = true;
  let moves = [];
  let board = [];
  const ACODE = "A".charCodeAt(0);

  const turnColor = _ => turn ? 'black' : 'white' ;
  const turnFigure = _ => turn ? 'x' : 'o' ;
  const size = _ => ({height, width});
  const pass = p => {};
  const position = (pos, parse = /(\d+)([A-Z])/.exec(pos)) => parse ? [ + parse[1], parse[2].charCodeAt(0) - ACODE] : [-1,-1];
  //const inside = (xy, [x,y] = xy) => x >=0 && x < width && y >= 0 && y < height;
  const inside = (xy, [x,y] = xy) => (x ^ x - width) < 0 && (y ^ y - height) < 0;
  const getPosition = p => {};
  const placeStone = pos => {
      
  };
  const handicapStones = p => {};
  const move = (...positions) => positions.map(pos => placeStone(pos));
  const rollback = p => {};
  const reset = p => [...Array(height*width)].map( _ => '.');

  const board2D = _ => 111;

  const log = _ => board.join('').split();

  board = reset();
  
  return ({
    get board(){ return board2D() },
    get turn(){ return turnColor() },
    get size(){ return size() },
    pass, getPosition, handicapStones, move, rollback, pass, reset, inside, 
    get log(){ return log() }
  });
}

function Go(x, y){ return go(x, y); }

let game = new Go(5);
console.log(game.size)
console.log(game.board)
console.log(game.turn)
game.move("7A")
console.log(game.board)
console.log(game.inside([1,3]))
console.log(game.log)

const chunker = chunk => arr => [...Array(arr.length / chunk |0)].map( (_, i) => arr.slice(i*chunk,(i+1)*chunk) )
console.log(
  JSON.stringify( chunker(3)([...'123456789ABCD']) )
)