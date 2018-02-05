const go = (height, width = height) => {
  
  let isBlackTurn = true;
  let historyOfMoves = [];
  let board = [];
  let oboard = {};
  const ACODE = "A".charCodeAt(0);
  const EMPTY = '.';
  const BLACK = 'x';
  const WHITE = 'o';
  const HEADER = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z"; // TODO debug
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
  const turnFigure = () => isBlackTurn ? BLACK : WHITE;
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
    let stone = getPosition(pick);
    if (stone === EMPTY){ return false; }
    let block = stone === BLACK ? WHITE : BLACK;
    let captured = [pick];
    let inputLength = captured.length;
    let shape = possibles => {
      return possibles
      .filter( poz => getPosition(poz) === stone )
      .map( origo => arounds(origo)
        .map( poz => {
          let check = getPosition(poz);
          if(check === EMPTY) throw "capture fail";
          check === stone
            && captured.indexOf(poz) === -1
            && captured.push(poz);
        })
      );
    };
    shape(arounds(pick));
    while (captured.length !== inputLength) {
      inputLength = captured.length;
      try { shape(captured) } catch(err){ return []; }
    } 
    return captured
  };
  const placeStone = poz => {
    if (legalMove(poz, isBlackTurn)) {
      historyOfMoves.push( setBoard(poz, turnFigure()) );
      return turnOver();
    } 
    throwError('illegal move: ' + poz);
  };
  const handicapStones = p => {};
  const move = (...positions) => positions.map(pos => placeStone(pos));
  const rollback = p => {};
  const reset = () => (height-3 ^ height-26) < 0 || (width-3 ^ width-26 ) < 0 ? boardObject() : throwError('illegal board size');

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
      //------------------------------------ debug functions -----------------------------------------------
      logCapture(pos){
        let debug = new Go(width,height);
        debug.move(...capture(pos));
        return debug.boardd.map(e=>e.replace(/o/g,'x'))
      },
      get boardd(){ return [HEADER.slice(0,2*width),...to2dBoard().map( e => e.join(' '))] },  // TODO debug
    });
  };

  return instance();
}

// turn arrow to class like function
function Go(x, y){ return go(x, y); }

let game = new Go(9);
let debug = new Go(9)
console.log(game.size)
//console.log(game.oboard)
//game.move("4D","3D","4H","5D","3H","4C","5B","4E")
game.move("6D","7E","6E","6F","4D","5E","5D","7D",
"5C","6C","7H","3D","4E","4F","3E","2E",
"3F","3G","2F","1F","2G","2H","1G","1H",
"4C","3C","6H","4B","5H","5B");
console.log(game.getPosition("4D"))
console.log(game.boardd)

console.log(game.getPosition("4C"))

//console.log(game.capture("4C").sort())
//console.log(game.capture("4E").sort()) 
console.log(game.logCapture("4E")) 

//console.log(game.capture("5D").sort()) 