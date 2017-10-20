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
  if( !nest.isOpen ){ return null }
  let first = nest.begin + 1
  do {    
    nest = nestSearch(arr, nest.pos+1, nest.lvl )    
  } while( nest.lvl > 0 )
  return arr.slice(first,nest.end)
}

const tokenizer = s => nesting( prepare(s) )

console.log( tokenizer('saae(rwi(o, rw)eo)r--') )
//console.log( JSON.stringify(found(sor)) )