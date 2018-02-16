const go = (width, height = width) => {
  let isBlackTurn = true;
  let history = [];
  // let board = [];
  let oboard = {};
  const ACODE = "A".charCodeAt(0);
  const EMPTY = '.';
  const BLACK = 'x';
  const WHITE = 'o';
  const ILLEGAL_MOVE = 'illegal move: '
  const HANDICAPS = {
    '9x9'   : ['3G','7C','7G','3C','5E'],
    '13x13' : ['10K','4D','4K','10D','7G','7D','7K','10G','4G'],
    '19x19' : ['16Q','4D','4Q','16D','10K','10D','10Q','16K','4K'],      
  };
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
  const another = stone => stone === BLACK ? WHITE : BLACK; 
  const turnOver = () => isBlackTurn = !isBlackTurn;
  const size = () => ({width: height, height: width});
  const pass = () => {
    historyKO();
    turnOver();
  }
  const inside = poz => !!oboard[poz];
  const getPosition = poz => oboard[poz];
  const setBoard = (poz, stone) => oboard[poz] = stone;
  const throwError = err => {throw new Error(err)};
  const capture = pick => {
    let stone = getPosition(pick);
    if (stone === EMPTY) return false;
    let block = another(stone);
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
    shape([pick]);
    while (captured.length !== inputLength) {
      inputLength = captured.length;
      try { shape(captured) } catch(err){ return []; }
    } 
    return captured
  };
  const legalMove = (poz, figure) => {
    if (getPosition(poz) !== EMPTY) throwError(ILLEGAL_MOVE + poz);
  };
  const selfCapturing = (poz, figure) => {
    let captured;
    try { 
      setBoard(poz, figure);
      captured = capture(poz);
      setBoard(poz, EMPTY);
    } catch(err){}
    if (captured && captured.length) throwError(ILLEGAL_MOVE + poz);
    setBoard(poz, turnFigure());
  };
  const historyKO = (poz) => {
    let board = to2dBoard();
    if (poz && history.length > 1 && history[history.length-2].board.join() === board.join()) {
      setBoard(poz, EMPTY);
      throwError("Illegal KO move.");
    } 
    history.push({isBlackTurn, board});    
  };
  const from2dBoard = board => board.map( (w,x) => w.map( (e,y) => oboard[xyToPoz(x,y)] = e ));
  const rollback = n => {
    if (history.length >= n) {
      history = history.slice(0,-n);
      let rolled = history.pop();
      from2dBoard(rolled.board);
      isBlackTurn = rolled.isBlackTurn;
    }
  };
  const placeStone = poz => {
    legalMove(poz, isBlackTurn);
    setBoard(poz, turnFigure());
    let enemy = another(turnFigure());
    let enemyes = arounds(poz).filter( p => getPosition(p) === enemy );
    enemyes.map( p => {
      try {
        let captured = capture(p)
        captured.map(poz => setBoard(poz, EMPTY));
      } catch(err){}
    });
    selfCapturing(poz, turnFigure());    
    historyKO(poz);
    turnOver();
  };
  const handicapStones = (n, stones = HANDICAPS[width+'x'+height]) => {
    if (history.length > 1) throwError('Handicap stones cannot be initialized after moves have been made');
    if (!stones) throwError('Board is not 9x9, 13x13 or 19x19');
    if (n > stones.length) throwError('Handicap stone amount is more than allowed');
    stones
      .filter( (_,i) => i < n )
      .map( poz => setBoard( poz ,turnFigure()) );
  };
  const move = (...positions) => positions.map(pos => placeStone(pos));  
  const reset = () => {     
     isBlackTurn = true;
     oboard = (height-3 ^ height-26) < 0 || (width-3 ^ width-26 ) < 0 ? boardObject() : throwError('illegal board size');
     historyKO();
  }

  const instance = () => {
    reset();
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
      get boardd(){ return [HEADER.slice(0,2*height),...to2dBoard().map( e => e.join(' '))] },  // TODO debug
    });
  };

  return instance();
}

// turn arrow to class like function
function Go(x, y){ return go(x, y); }


let game = new Go(9);
let debug = new Go(9)
console.log(game.size)
game.move("6D","7E","6E","6F","4D","5E","5D","7D",
"5C","6C","7H","3D","4E","4F","3E","2E",
"3F","3G","2F","1F","2G","2H","1G","1H",
"4C","3C","6H","4B","5H","5B");
console.log(game.getPosition("4D"))
console.log(game.boardd)
game.rollback(1)
console.log(game.boardd)
game.reset()
console.log(game.boardd)