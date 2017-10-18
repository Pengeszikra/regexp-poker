// tokenizer

let sor = 'eleje-->(--hello( nem baj ha van benne )--)<--->(..(--(+belso)--12--)..1)<-- end'
const next = s => { let poz = s.search(/\(|\)/); return poz< 0 ? null : {poz,st:s[poz] == '('} }

const found = s => {
  return s.replace(/(\(|\))/,' $1 ')
          .split(/\b|\s+/)
          .map( e => e.trim() )
          .filter( e => e.length )
}


console.log( next(sor) )
console.log( found(sor) )
console.log( JSON.stringify(found(sor)) )
console.log( JSON.stringify(found('(())()')) )
//console.log( found(found(sor)[1][0]) )
//console.log( found(found(found(found(sor)[1][0])[1][0])) )


const foundEr = s => {  
  let lvl = 0  
  let po = 0
  let deep = first = next(s);
  do {
    deep = next(s.slice(po));
    if(!deep){ return s }
    lvl += deep.st ? +1 : -1
    po += deep.poz + 1     
  } while( lvl > 0 )   
  return lvl<0 
    ? s
    : [
        s.slice(0,first.poz),
        [foundEr(s.slice(first.poz+1,po-1))],
        foundEr(s.slice(po))
      ]
}
