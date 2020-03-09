// tokenizer 

// fo = "A *(B ^& C)".match(/\([^\(]*?\)/g)
// "()()()()(())()((()))".match(/\([^\(]*?\)/g)


const tokenise = string => {
  const deep = ar => Array.isArray(ar[ar.length-1]) ? deep(ar[ar.length-1]) : ar;
  const par = (ar,last) => Array.isArray(ar[ar.length-1] != last) ? par(ar,last) : ar;
  const res = string.replace(/(\(|\))/g," $1 ")
  .split(/\b|\s+/)
  .map( e=> e.trim() )
  .reduce( (r,e,i) => {
   const last = deep(r);
   if(last[last.length-1] === ')'){
     last.pop();
     let parent = par(r,last);
     parent.push(e);
     return r   
   }
   e = e === '(' ? [] : e;
   last.push(e)
   return r	
  },[]).filter( v => v !== '' );
 return res;
}

/*
let last = false, stack = []
ss = s.replace(/(\(|\))/g," $1 ").split(/\s+/).reduce( (r,e,i) => {
 if( e === '(' ){ last = []; stack.push(last) }
 if( e === ')' ){  }
 if( last ){
   last.push(e)
 }
},[])

*/