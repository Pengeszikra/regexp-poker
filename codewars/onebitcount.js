const bitchache = [...Array(256)].map((e,i)=>i.toString(2).split('0').join('').length);

const countLow = n => bitchache[(n - ( n >> 8 * 1 << 8))];

const bitCount = n => {
  let count = 0;
  do { 
	  count += countLow(n);
	  n = n >> 8;
  } while(n)
  return count;
}

const countOnes = (left, right) => {
  let count = 0
  for( let i = left; i <= right; i++) count += bitCount(i);
  return count;  
}

hex = n => n.toString(16).toUpperCase()
hc = (l,r) => hex(countOnes(l,r))
hcz = n => hc(0,n)
hczc = (n, hexL = n.toString(16).length) => hex( 2*hexL << 4*hexL )