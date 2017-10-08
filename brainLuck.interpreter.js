// https://www.codewars.com/kata/my-smallest-code-interpreter-aka-brainf-star-star-k/train/javascript

// [...'+-<>[].,'].map( c => c.charCodeAt(0) ).map( n => String.fromCharCode(65-43+n)+String.fromCharCode(n) ).join(" ")

const brainLuck = (code, input) => {

  const memSize = 90000;
  const cells = new Uint8Array( memSize );
  const copy = new Uint8Array(1);
  let result = '';   
  let ip = -1;
  let cp = memSize / 2;
  let nx = 0;
  let stack = [];
  let jumps = (code.match(/\[|\]/g) || []).reduce( (r, e) => {    
    nx = code.indexOf(e,nx+1);  
    if (e=="[") { stack.push(nx); } 
    else { let p = stack.pop(); r[p] = nx; r[']'+nx] = p; }
    return r;
  }, {} );

  // "A+ C- R< T> q[ s] D. B,"

  const rules = {
    A() { cells[cp]++ },
    C() { cells[cp]-- },
    T() { cp++ },
    R() { cp-- },    
    D() { result += String.fromCharCode(cells[cp]) },
    B() { result += String.fromCharCode(cells[cp]) },    
    s() { ip = jumps['E'+ip] - 1; },
    q() { if(cells[cp] == 0){ ip = jumps[ip]; } },
  }

  for(;++ip<code.length;){ rules[code[ip]] && rules[code[ip]](); };
  return result;
};

const test = (a,b) => a === b;

let r1 = brainLuck(',+[-.,+]','Codewars'+String.fromCharCode(255))
r1
let t1 = test ( , 'Codewars' );
t1
