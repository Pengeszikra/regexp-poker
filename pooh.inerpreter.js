const descript = {
  '+':  "Add 1 to the current cell" ,
  '-':  "Subtract 1 from the current cell" ,
  '>':  "Move the cell pointer 1 space to the right" ,
  '<':  "Move the cell pointer 1 space to the left" ,
  c:  "'Copy' the current cell" ,
  p:  "Paste the 'copied' cell into the current cell" ,
  W:  "While loop - While the current cell is not equal to 0" ,
  E:  "Closing character for loops" ,
  P:  "Output the current cell's value as ascii" ,
  N:  "Output the current cell's value as an integer" ,
  T:  "Multiply the current cell by 2" ,
  Q:  "Square the current cell" ,
  U:  "Square root the current cell's value" ,
  L:  "Add 2 to the current cell" ,
  I:  "Subtract 2 from the current cell" ,
  V:  "Divide the current cell by 2" ,
  A:  "Add the copied value to the current cell's value" ,
  B:  "Subtract the copied value from the current cell's value" ,
  Y:  "Multiply the current cell's value by the copied value" ,
  D:  "Divide the current cell's value by the copied value." ,
}

const heapSize = 50000;
const cells = new Uint8Array( heapSize );
const copy = new Uint8Array(1);
const stack = [];
const source = 'LQTcQAP>pQBBTAI-PA-PPL+P<BVPAL+T+P>PL+PBLPBP<DLLLT+P';
const ip = 0;
const cp = heapSize / 2;
const outString = '';
let out = { set out(val){ outString += val } };

const rules = {
  ['+']() { cells[cp]++ },
  ['-']() { cells[cp]-- },
  ['>']() { cp++ },
  ['<']() { cp-- },
      c() { copy = cells[cp] },
      p() { cells[cp] = copy },
      W() { if (cells[cp] != 0){ 
             stack.push(ip);
           } else { 
             while (source[++ip] === 'E' || ip>source.length ){}; 
           } 
         },
      E() { ip = stack.pop() },
      P() { out = String.fromCharCode(cells[cp]) },
      N() { out = cells[cp] },
      T() { cells[cp] *= 2 },
      Q() { cells[cp] *= cells[cp] },
      U() { cells[cp] = Math.sqrt(cells[cp]) },
      L() { cells[cp] += 2 },
      I() { cells[cp] -= 2 },
      V() { cells[cp] /= 2 },
      A() { cells[cp] += copy },
      B() { cells[cp] -= copy },
      Y() { cells[cp] *= copy },
      D() { cells[cp] /= copy },
}

