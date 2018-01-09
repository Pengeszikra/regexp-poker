const go = (height, width = height) => {
  
  let isBlackTurn = true;
  let historyOfMoves = [];
  let board = [];
  let oboard = {};
  const ACODE = "A".charCodeAt(0);
  const EMPTY = '.';

  const xyToPoz = (x, y) => (x + 1) + String.fromCharCode(y + ACODE);
  const pozToXy = poz => [+poz.slice(0,-1) - 1, poz.slice(-1).codePointAt(0) - ACODE];
  const arounds = (poz, x = +poz.slice(0,-1), yCode = poz.slice(-1).codePointAt(0) ) => [
    x + String.fromCharCode(yCode - 1),
    (x-1) + poz.slice(-1),
    x + String.fromCharCode(yCode + 1),
    (x+1) + poz.slice(-1),
  ];
  const boardObject = () =>
    [...Array(width)].reduce( (r,_,i) => {
      [...Array(height)].map( (_,j) => r[(i+1) + String.fromCharCode(ACODE+j)] = EMPTY )
      return r;
    }, {}
  );
  const to2dBoard = () =>
    [...Array(width)].map( (_,x) => 
      [...Array(height)].map( (_,y) => oboard[xyToPoz(x,y)] ) 
  );
  const liberty = (poz, stone = getPosition(poz)) => arounds(poz).filter(around => [EMPTY, stone].indexOf(getPosition(around)) !== -1 );
  const turnColor = () => isBlackTurn ? 'black' : 'white';
  const turnFigure = () => isBlackTurn ? 'x' : 'o';
  //const same = figure => figure ? 'x' : 'o';
  const turnOver = () => isBlackTurn = !isBlackTurn;
  const size = () => ({height, width});
  const pass = () => turnOver();
  const inside = poz => !!oboard[poz];
  const getPosition = poz => oboard[poz];
  const setBoard = (poz, stone) => oboard[poz] = stone;
  const throwError = err => {throw new Error(err)};
  const legalMove = (poz, figure) => {
    let place = getPosition(poz);
    let lives = arounds(poz).filter(live => oboard[live]);
    return place === EMPTY && lives.length > 0;
  };
  const capture = pick => {
    // after placeStone check opposite arrounds is capture or not.
    let stone = getPosition(pick);
    if (stone === EMPTY){ return false; }
    let block = stone === 'x' ? 'o' : 'x';
    let captured = [pick];
    let shape = possibles => {
      let inside = possibles.map( origo => 
        arounds(origo)
        .reduce(poz => getPosition(poz) === stone)
      );
      return inside
      /*
      let short = lives.map(poz => getPosition(poz) ).join('');
      let lives.filter(poz => captured.indexOf(poz) === -1 && getPosition(poz) === stone);
      return short.indexOf(EMPTY) !== -1
        ? false
        : captured
        */
    };
    return shape(arounds(pick))
  };
  const placeStone = poz => {
    if (legalMove(poz, isBlackTurn)) {
      historyOfMoves.push( setBoard(poz, turnFigure()) );
      //console.log(capture(poz))
      return turnOver();
    } 
    throwError('illegal move: ' + poz);
  };
  const handicapStones = p => {};
  const move = (...positions) => positions.map(pos => placeStone(pos));
  const rollback = p => {};
  //const reset = p => (height-3 ^ height-26) < 0 || (width-3 ^ width-26 ) < 0 ? [...Array(height*width)].map( _ => EMPTY) : throwError('illegal board size');
  const reset = () => (height-3 ^ height-26) < 0 || (width-3 ^ width-26 ) < 0 ? boardObject() : throwError('illegal board size');
  //const chunker = chunk => arr => [...Array(arr.length / chunk |0)].map( (_, i) => arr.slice(i*chunk,(i+1)*chunk) );
  //const board2D = () => chunker(width)(board);

  const instance = () => {

    oboard = reset();

    return ({
      get board(){ return to2dBoard() },
      get turn(){ return turnColor() },
      get size(){ return size() },
      pass, getPosition, handicapStones, move, rollback, pass, reset, 
      oboard,
      inside,
      capture,
    });
  }

  return instance();
}

// turn arrow to class like function
function Go(x, y){ return go(x, y); }

let game = new Go(9);
console.log(game.size)
game.move("1A")
console.log(game.board)
console.log(game.turn)
//console.log(game.oboard)
//game.move("4D","3D","4H","5D","3H","4C","5B","4E")
game.move("6D","7E","6E","6F","4D","5E","5D","7D",
"5C","6C","7H","3D","4E","4F","3E","2E",
"3F","3G","2F","1F","2G","2H","1G","1H",
"4C","3C","6H","4B","5H","5B");
console.log(game.getPosition("4D"))
console.log(game.board)
console.log(game.getPosition("4C"))
console.log(game.capture("4C")) 