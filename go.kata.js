const go = (height, width = height) => {
  
  let turn = true;
  let moves = [];
  let board = [];
  const ACODE = "A".charCodeAt(0);

  const funXY = fun => (xy, [x,y] = xy) => fun(x, y);
  const turnColor = _ => turn ? 'black' : 'white' ;
  const turnFigure = _ => turn ? 'x' : 'o' ;
  const same = figure => figure ? 'x' : 'o' ;
  const turnOver = _ => turn = !turn;
  const size = _ => ({height, width});
  const pass = p => {};
  const position = (pos, parse = /(\d+)([A-Z])/.exec(pos)) => parse ? [ + parse[1] - 1, parse[2].charCodeAt(0) - ACODE] : [-1,-1];
  const xyToPos = (x, y) => (x+1) + String.fromCharCode(ACODE + y);
  const inside = (x, y) => (x ^ x - width) < 0 && (y ^ y - height) < 0;
  const insideXY = funXY(inside);
  const getBoard = (x, y) => inside(x, y) ? board[x+y*width] : false;
  const getBoardXY = funXY(getBoard);
  const getPosition = (pos, [x, y] = position(pos)) => getBoard(x, y);
  const setBoard = (x, y, stone) => {
    board[x+y*width] = stone;
    return [x,y,stone];
  };
  const throwError = err => {throw new Error(err)};
  const livesLeft = (x, y) => [[x,y+1],[x+1,y],[x,y-1],[x-1,y]].filter( pos => inside(pos[0],pos[1]) )
  const legalMove = (x, y, figure, place = getBoard(x,y) ) => {
    let lives = livesLeft(x,y).filter( xy => [same(figure),'.'].indexOf(getBoardXY(xy)) !== -1);
    lives
    return place === '.' && lives.length > 0;
  };
  const capture = (x, y, figure) => {
    let lives = livesLeft(x,y).filter( xy => getBoardXY(xy) === same(!figure) )
  };
  const captureXY = funXY(capture);
  const placeStone = pos => {
    let [x,y] = position(pos);
    if(legalMove(x,y,turn)) {
      moves.push(
        setBoard(x,y,turnFigure())
      );
      return turnOver();
    } 
    throwError('illegal move: ' + pos );
  };
  const handicapStones = p => {};
  const move = (...positions) => positions.map(pos => placeStone(pos));
  const rollback = p => {};
  const reset = p => (height-3 ^ height-26) < 0 || (width-3 ^ width-26 ) < 0 ? [...Array(height*width)].map( _ => '.') : throwError('illegal board size');
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

let game = new Go(25);
console.log(game.size)
console.log(game.board)
console.log(game.turn)
game.move("4D","3D","4H","5D","3H","4C","5B","4E")
console.log(game.getPosition("4D"))
console.log(game.board)
console.log(game.inside([1,3]))

console.log(game.log)