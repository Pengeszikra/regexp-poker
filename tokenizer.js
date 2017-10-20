// tokenizer

/*
  const token = ( arr, nest = nesting( arr ) ) => 
  [ ...nest.preNested, [ token( nest.firstGroup ) ] , token( nest.leftOver ) ];
*/  


let sor = 'eleje-->(--hello( nem baj ha van benne )--)<--->(..(--(+belso)--12--)..1)<-- end'

const prepare = s => s.replace(/(\(|\))/g,' $1 ').split(/\b|\s+/).map( e => e.trim() ).filter( e => e.length );
const nestSearch = (
  arr,
  pos = 0,
  lvl = 0,  
  {begin, end} = { begin: arr.indexOf('(',pos), end: arr.indexOf(')',pos) }
) => {
  let justLeftOver = begin == -1 && end == -1    
  let isOpen = begin != -1 && begin < end
  lvl += justLeftOver ? 0 : isOpen ? +1 : -1
  pos ++
  return {justLeftOver, isOpen, begin, end, pos, lvl }
};

const nesting = arr => {  
  let nest = nestSearch(arr)
  if( nest.justLeftOver ){ return arr }  
  do {
    nest = nestSearch(arr, nest.pos+1, nest.lvl )    
  } while( nest.lvl >= 0 )  
  return nest
}

const tokenizer = s => nesting( prepare(s) )

console.log( tokenizer('sor') )
//console.log( JSON.stringify(found(sor)) )
console.log( JSON.stringify(tokenizer('(())()')) )
//console.log( found(found(sor)[1][0]) )
console.log( '[`'+sor.replace(/\(/g, '`,[`' ).replace(/\)/g, '`],`' )+'`]' )

const next = s => { let poz = s.search(/\(|\)/); return poz< 0 ? null : {poz,st:s[poz] == '('} }
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


// console.log( next(sor) )