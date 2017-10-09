// https://www.codewars.com/kata/my-smallest-code-interpreter-aka-brainf-star-star-k/train/javascript

// [...'+-<>[].,'].map( c => c.charCodeAt(0) ).map( n => String.fromCharCode(65-43+n)+String.fromCharCode(n) ).join(" ")

const brainLuck = (
  code, 
  input,
  irp = 0,
  memSize = 90000,
  cells = new Uint8Array( memSize ),
  result = '',
  ip = -1,
  cp = memSize / 2,
  nx = 0,
  stack = []
) => {
  let jumps = (code.match(/\[|\]/g) || []).reduce( (r, e) => {
    nx = code.indexOf(e,nx+1);  
    if (e=="[") { stack.push(nx); } 
    else { let p = stack.pop(); r[p] = nx; r[']'+nx] = p; }
    return r;
  }, {} );  

  const strToIn = String.fromCharCode;

  // "A+ C- R< T> q[ s] D. B,"

  const rules = {
    A() { cells[cp]++ },
    C() { cells[cp]-- },
    T() { cp++ },
    R() { cp-- },    
    D() { result += strToIn( cells[cp] ) },
    B() { cells[cp] = input.charCodeAt(irp++) },    
    s() { ip = jumps[']'+ip] - 1; },
    q() { !(cells[cp]) && ( _=> ip = jumps[ip])() },
  }

  for(;++ip<code.length;){ 
    console.log( code[ip] )        
    console.log( result )
    let com = strToIn(code.charCodeAt(ip)+22);
    //console.log( com )
    rules[com] && rules[com](); 
  };
  cells = null;
  return result;
};

const test = (a,b) => a === b;

let r1 = brainLuck(',+[-.,+]','Codewars'+String.fromCharCode(255))
r1
let t1 = test ( r1 , 'Codewars' );
t1
