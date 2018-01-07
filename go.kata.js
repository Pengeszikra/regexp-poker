const go = (height, width = height) => {
  
  let turn = true;
  let historyOfMoves = [];
  let board = [];
  let oboard = {};
  const ACODE = "A".charCodeAt(0);

  // boardObject    

  const xyToPoz = (x, y) => (x + 1) + String.fromCharCode(y + ACODE);
  const pozToXy = poz => [+poz.slice(0,-1) - 1, poz.slice(-1).codePointAt(0) - ACODE];
  const liberty = (poz, x = +poz.slice(0,-1), yCode = poz.slice(-1).codePointAt(0) ) => [
    x + String.fromCharCode(yCode - 1),
    (x-1) + poz.slice(-1),
    x + String.fromCharCode(yCode + 1),
    (x+1) + poz.slice(-1),
  ];
  const boardObject = () => 
    [...Array(width)].reduce( (r,_,i) => {
      [...Array(height)].map( (_,j) => r[(i+1) + String.fromCharCode(ACODE+j)] = '.' )
    return r;
    }, {}
  ); 
  const to2dBoard = _ =>     
    [...Array(width)].map( (_,x) => 
      [...Array(height)].map( (_,y) => oboard[xyToPoz(x,y)] ) 
  );

  const funXY = fun => (xy, [x,y] = xy) => fun(x, y);
  const turnColor = () => turn ? 'black' : 'white' ;
  const turnFigure = () => turn ? 'x' : 'o' ;
  const same = figure => figure ? 'x' : 'o' ;
  const turnOver = () => turn = !turn;
  const size = () => ({height, width});
  const pass = p => {};
  const position = (pos, parse = /(\d+)([A-Z])/.exec(pos)) => parse ? [ + parse[1] - 1, parse[2].charCodeAt(0) - ACODE] : [-1,-1];
  const inside = (x, y) => (x ^ x - width) < 0 && (y ^ y - height) < 0;
  const insideXY = funXY(inside);
  const getPosition = poz => oboard[poz];
  const setBoard = (x, y, stone) => {
    board[x+y*width] = stone;
    return [x,y,stone];
  };
  const throwError = err => {throw new Error(err)};
  const livesLeft = (x, y) => [[x,y+1],[x+1,y],[x,y-1],[x-1,y]].filter( pos => inside(pos[0],pos[1]) );
  const legalMove = (poz, figure, place = getPosition(poz) ) => {
    console.log(poz)  // !number first!
    let lives = liberty(poz)
    console.log( lives )
    console.log( place )
    return place === '.' && lives.length > 0;
  };
  const capture = (x, y, figure) => {
    let lives = livesLeft(x,y).filter( xy => getBoardXY(xy) === same(!figure) )
  };
  const captureXY = funXY(capture);
  const placeStone = poz => {
    console.log(legalMove(poz, turn))
    if (legalMove(poz, turn)) {
      historyOfMoves.push(
        setBoard(poz, turnFigure())
      );
      return turnOver();
    } 
    throwError('illegal move: ' + poz );
  };
  const handicapStones = p => {};
  const move = (...positions) => positions.map(pos => placeStone(pos));
  const rollback = p => {};
  const reset = p => (height-3 ^ height-26) < 0 || (width-3 ^ width-26 ) < 0 ? [...Array(height*width)].map( _ => '.') : throwError('illegal board size');
  const resetObjectBoard = _ => (height-3 ^ height-26) < 0 || (width-3 ^ width-26 ) < 0 ? boardObject() : throwError('illegal board size');
  const chunker = chunk => arr => [...Array(arr.length / chunk |0)].map( (_, i) => arr.slice(i*chunk,(i+1)*chunk) )
  const board2D = () => chunker(width)(board);

  const log = () => board.join('').split();

  const instance = () => {
    
    board = reset();
    oboard = resetObjectBoard();

    return ({
      get board(){ return to2dBoard() },
      get turn(){ return turnColor() },
      get size(){ return size() },
      pass, getPosition, handicapStones, move, rollback, pass, reset, inside, 
      get log(){ return log() },
      oboard,
    });
  }

  return instance();
}

// turn arrow to class like function
function Go(x, y){ return go(x, y); }

let game = new Go(9);
console.log(game.size)
console.log(game.board)
console.log(game.turn)
console.log(game.oboard)
game.move("4D","3D","4H","5D","3H","4C","5B","4E")
console.log(game.getPosition("4D"))
console.log(game.board)
console.log(game.inside([1,3]))
console.log(game.log)
