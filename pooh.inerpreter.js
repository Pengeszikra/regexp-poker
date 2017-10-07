// https://www.codewars.com/kata/esoteric-language-poohbear-interpreter/train/javascript

/*
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
*/

const poohbear = source => {

  const memSize = 70000;
  const cells = new Uint8Array( memSize );
  const copy = new Uint8Array(1);
  const stack = [];  
  
  let result = '';   
  let ip = 0;
  let cp = memSize / 2;

  const rules = {
    ['+']() { cells[cp]++ },
    ['-']() { cells[cp]-- },
    ['>']() { cp++ },
    ['<']() { cp-- },
        c() { copy[0]= cells[cp] },
        p() { cells[cp] = copy[0] },
        W() { if (cells[cp] != 0){ 
              stack.push(ip);
            } else { 
              ip = source.indexOf('E',ip); 
            } 
          },
        E() { ip = stack.pop()-1 },
        P() { result += String.fromCharCode(cells[cp]) },
        N() { result += cells[cp] },
        T() { cells[cp] *= 2 },
        Q() { cells[cp] *= cells[cp] },
        U() { cells[cp] = Math.sqrt(cells[cp]) },
        L() { cells[cp] += 2 },
        I() { cells[cp] -= 2 },
        V() { cells[cp] /= 2 },
        A() { cells[cp] += copy[0] },
        B() { cells[cp] -= copy[0] },
        Y() { cells[cp] *= copy[0] },
        D() { cells[cp] /= copy[0] },
  }

  while( ip>=0 && ip<source.length ){
    //console.log(source[ip],result,cells[cp])
    let command = rules[source[ip]];
    if( typeof command === "function" ) { command() }
    ip++;    
  }

  return result;
};

poohbear( 'LQTcQAP>pQBBTAI-PA-PPL+P<BVPAL+T+P>PL+PBLPBP<DLLLT+P' );
let r = poohbear("++LQTT>W++LQTTWTNEP<NE");
r

//poohbear('+LTQII>+WN<P>+E')

let s = "..WezWabEaWgogogoEzE--";
let o = s.match(/W|E/g).reduce( (r, e) => [...r,[e,s.indexOf(e,r.length?r[r.length-1][1]+1:0)]] , [])
o

let o2 = o.reduce( (r, e) => e[0]=='W' ? [...r,e] : (()=>{ let l=r.pop();l.push(e);return [...r,l]})() , [] )
o2

let o3 = ( nx=0, stack=[] ) => s.match(/W|E/g).reduce( (r, e) => 
{
  nx = s.indexOf(e,nx+1);  
  (e=="W") ? stack.push(nx) : r.push( [stack.pop(),nx] );
  return r;
}
, [])
let z = o3()
z

let test = o3 == [
  [ 2,19 ],
  [ 5,8 ],
  [ 10,17 ]
];
test 


