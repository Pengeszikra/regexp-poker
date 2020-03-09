const go = (width, height = width) => {
  let isBlackTurn = true;
  let memory = [];
  let oboard = {};
  const HEADERS = "ABCDEFGHJKLMNOPQRSTUVWXYZ"; // KIHAL
  const EMPTY = '.';
  const BLACK = 'x';
  const WHITE = 'o';
  const ILLEGAL_MOVE = 'illegal move: '
  const HANDICAPS = {
    '9x9'   : ['7G','3C','3G','7C','5E'],
    '13x13' : ['10K','4D','4K','10D','7G','7D','7K','10G','4G'],
    '19x19' : ['16Q','4D','4Q','16D','10K','10D','10Q','16K','4K'],      
  };
  const HEADER = HEADERS.split('').join(' ');
  const xyToPoz = (x, y) => (x + 1) + HEADERS[y];
  const pozToXy = poz => [+poz.slice(0,-1) - 1, HEADERS[poz.slice(-1)] ];
  const arounds = (poz, x = +poz.slice(0,-1), yCode = poz.slice(-1).codePointAt(0) ) => [
    x + String.fromCharCode(yCode - 1),
    (x-1) + poz.slice(-1),
    x + String.fromCharCode(yCode + 1),
    (x+1) + poz.slice(-1),
  ];
  const boardObject = () =>
    [...Array(width)].reduce( (r,_,i) => {
      [...Array(height)].map( (_,j) => r[(i+1) + HEADERS[j]] = EMPTY )
      return r;
    }, {}
  );
  const to2dBoard = () =>
    ([...Array(width)].map( (_,x) => [...Array(height)].map( (_,y) => oboard[xyToPoz(x,y)] ) ).reverse()
  );
  const liberty = (poz, stone = getPosition(poz)) => arounds(poz).filter(around => [EMPTY, stone].indexOf(getPosition(around)) !== -1 );
  const turnColor = () => isBlackTurn ? 'black' : 'white';
  const turnFigure = () => isBlackTurn ? BLACK : WHITE;
  const another = stone => stone === BLACK ? WHITE : BLACK; 
  const turnOver = () => isBlackTurn = !isBlackTurn;
  const size = () => ({width: height, height: width});
  const pass = () => {
    memoryKO();
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
  const board2json = () => JSON.stringify(oboard);
  const memoryKO = (poz) => {
    let json = board2json();
    let turn = isBlackTurn;
    if (poz && memory.length > 1 && memory[memory.length-2].json === json ) {
      setBoard(poz, EMPTY);
      throwError("Illegal KO move.");
    } else {
      memory.push({turn, json});
    } 
  };
  const rollback = n => {
    if (memory.length <= n || n < 1 ) throwError('too much rollback !');
    let {json, turn} = memory.splice(-n,n)[0];
    oboard = JSON.parse(json);
    console.log('----',turn)
    isBlackTurn = turn;
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
    memoryKO(poz);
    turnOver();
  };
  const handicapStones = (n, stones = HANDICAPS[width+'x'+height]) => {
    if (memory.length > 1) throwError('Handicap stones cannot be initialized after moves have been made');
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
     // memoryKO();
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
      json(){ return JSON.stringify(oboard) },
      get boardd(){ return [HEADER.slice(0,2*height),...to2dBoard().map( e => e.join(' ')),'--> ' + turnColor()] },  // TODO debug
      memory,
      isBlackTurn
    });
  };

  return instance();
}

// turn arrow to class like function
function Go(x, y){ return go(x, y); }

let g = new Go(9)
g.move('3B','2B','1B')
console.log(g.boardd)
g.rollback(1)
console.log(g.isBlackTurn)
console.log(g.boardd)

/*
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

let classic = new Go(19);
let movess = '16Q,16D,4Q,4D,3F,6C,4J,14R,17O,16S,17F,14D,16J,17R,13P,3O,13R,13S,14S,12R,13Q,15S,3M,6Q,3P,4O,5P,4M,3L,3R,4R,2P,3Q,2Q,2R,6O,2N,2O,3S,7N,12C,10C,12E,13C,13B,14B,13F,12B,9M,9O,11N,17L,16M,10E,10F,9F,10G,16G,17G,16F,16H,14G,13H,9G,9H,17E,15E,16E,14H,8H,10H,4F,4G,3E,5F,4E,3G,12D,8G,9E,6P,7P,7Q,8P,7R,8R,10P,11P,10O,6R,7S,6S,8S,9R,9S,10S,12S,10Q,13T,18P,5S,8Q,5Q,9N,10M,8M,5O,5N,6M,6N,8L,7L,7M,8N,6L,7K,6K,10N,11O,9P,11Q,17P,11R,10R,7G,4L,4K,17M,16N,16P,14O,17N,16L,17K,16O,18O,7E,7D,2F,2E,15P,11S,12Q,11E,18J,11F,12G,18E,6E,9T,5R,15Q,8D,8C,8E,9D,6D,7C,18F,19F,19G,19E,17J,3N,1E,1D,1F,2D,2M,18K,19K,19L,19J,8F,7F,3K,2K,8T,6T,14F,13E,11G,11H,14E,13G,5K,5L,3J,5J,1L,2J,1N,2L,1M,19M,18M,18L,9L,8K,19L,13D,11C,18L,11M,10L,19L,15R,16R,18L,12O,12P,19L,14Q,15R,18L,12N,11P,19L,5D,5C,18L,18H,17H,19L,1K,1O,18L,3H,2H,19L,4C,3C,18L,9K,7J,19L,15H,19N,15G,15F,1Q,16K,15K,5E,5G,15T,14T';
movess = movess.split(',')
console.log(...movess)
classic.move(...movess)
console.log(classic.boardd)
classic.rollback(95)
console.log(classic.boardd)
// console.log(classic.json())

let c2 = new Go(19);
let mv2 = '16Q,4D,16C,4R,4P,3P,3O,3Q,6C,3F,4N,5Q,3J,17E,16H,13C,16E,10C,17D,4B,17O,11R,4E,5E,9D,4F,9C,10D,10E,11E,11F,12E,12F,10B,9F,13F,13G,14F,14G,17N,16N,17M,18O,16J,17H,13K,10Q,11Q,10P,11P,11O,12O,12N,13O,13N,11N,10O,14N,11M,15O,16O,10N,14M,9N,15N,14O,12M,10R,9L,9J,11K,12G,10H,15G,15H,16F,17F,11L,10K,10M,12L,12K,8N,9O,8P,9P,9Q,8Q,9R,8O,10L,11J,9S,7P,13Q,8R,4C,5C,15P,8S,9T,10S,13H,10J,7L,11G,10F,8K,8L,8G,8F,7G,12C,15E,18E,13B,13D,13E,6E,5F,14D,12D,7J,9H,6B,14J,16G,15F,14H,12J,12B,11C,5H,5G,2P,13S,6D,3C,2Q,2R,14S,13R,14R,17K,2G,14T,15T,13T,16S,8B,9B,9A,8C,6H,6J,4H,2F,2E,1E,1D,12A,11A,16L,15J,17L,18L,9G,18J,12R,12S,1R,1S,12P,8T,14P,10T,11O,10O,5P,4K'
mv2 = mv2.split(',')
console.log(mv2.indexOf('5H')) // problematick point 
c2.move(...mv2)
console.log(c2.boardd)
console.log(c2.memory.map((e)=>e.turn ? '+' : '-').join(''))
console.log(c2.isBlackTurn)
console.log(c2.memory.slice(-1)[0].turn)
c2.rollback(1)
console.log(c2.isBlackTurn)
console.log(c2.memory.slice(-1)[0].turn)
console.log(c2.turn)
c2.rollback(1)
console.log(c2.memory.slice(-1)[0].turn)
console.log(c2.turn)
c2.rollback(1)
console.log(c2.memory.slice(-1)[0].turn)
console.log(c2.turn)
console.log(c2.memory.map((e)=>e.turn ? '+' : '-').join(''))
*/