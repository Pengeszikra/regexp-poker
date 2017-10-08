// https://www.codewars.com/kata/esoteric-language-poohbear-interpreter/train/javascript

const poohbear = source => {

  const memSize = 90000;
  const cells = new Uint8Array( memSize );
  const copy = new Uint8Array(1);
  let result = '';   
  let ip = -1;
  let cp = memSize / 2;
  let nx = 0;
  let stack = [];
  let jumps = (source.match(/W|E/g) || []).reduce( (r, e) => {    
    nx = source.indexOf(e,nx+1);  
    if (e=="W") { stack.push(nx); } 
    else { let p = stack.pop(); r[p] = nx; r['E'+nx] = p; }
    return r;
  }, {} );

  const rules = {
    ['+']() { cells[cp]++ },
    ['-']() { cells[cp]-- },
    ['>']() { cp++ },
    ['<']() { cp-- },
        c() { copy[0] = cells[cp] },
        p() { cells[cp] = copy[0] },
        W() { if(cells[cp] == 0){ ip = jumps[ip]; } },
        E() { ip = jumps['E'+ip] - 1; },
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

  for(;++ip<source.length;){ rules[source[ip]] && rules[source[ip]](); };
  return result;
};

let rr = poohbear( 'LQTcQAP>pQBBTAI-PA-PPL+P<BVPAL+T+P>PL+PBLPBP<DLLLT+P' );
rr
console.log(poohbear('+LTQIIWP+E'));
let res = poohbear('LILcABNBpYDYYYYLLL+P-+W-EQNW-ELLQUTTTT+P');
res
console.log( res === "2'0A" )

