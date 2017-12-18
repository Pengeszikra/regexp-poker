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
  const insideArr = (xy, [x,y] = xy) => (x ^ x - width) < 0 && (y ^ y - height) < 0;
  const inside = (x, y) => (x ^ x - width) < 0 && (y ^ y - height) < 0;
  const getPosition = p => {};
  const getBoardXY = (x, y) => board[x+y*height];
  const setBoardXY = (stone, x, y) => board[x+y*height] = stone;
  const steppDone = _ => turn != turn;
  const turnOver = pos => {
      let [x,y] = position(pos);
      let ins = inside(x, y);
      // let actual = boardXY(x, y);
      setBoardXY(x, y) = turnFigure();
      turnOver();
  };
  const handicapStones = p => {};
  const move = (...positions) => positions.map(pos => placeStone(pos));
  const rollback = p => {};
  const reset = p => [...Array(height*width)].map( _ => '.');
  const chunker = chunk => arr => [...Array(arr.length / chunk |0)].map( (_, i) => arr.slice(i*chunk,(i+1)*chunk) )

  const board2D = _ => chunker(width)(board);

  const log = _ => board; //.join('').split();

  const instance = _ => {
    board = reset();
    
    return ({
      get board(){ return board2D() },
      get turn(){ return turnColor() },
      get size(){ return size() },
      pass, getPosition, handicapStones, move, rollback, pass, reset, inside, 
      get log(){ return log() }
    });
  }

  return instance();
}

function Go(x, y){ return go(x, y); }

let game = new Go(5);
console.log(game.size)
console.log(game.board)
console.log(game.turn)
game.move("4B")
console.log(game.board)
console.log(game.inside(1,3))
console.log(game.log)