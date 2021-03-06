// https://www.codewars.com/kata/challenge-fun-number-18-freak-contaz-sequence/train/javascript
// https://blog.rinatussenov.com/collatz-conjecture-calculation-in-reverse-with-javascript-a768fab10425

const freakContazSequence = (s, smallest = 2) =>  {
  const sequence = ( 
    n, 
    denote = '',
    contaz = (n, remainder = n%3) => 
          remainder === 0 
          ? [n / 3 , 'D']
          : remainder === 1
            ? [(4 * n + 2) / 3, 'U']
            : [(2 * n - 1) / 3, 'd']
  ) => {            
    while ( n > 1) {
      [n, d] =  contaz(n);
      denote += d;
    } 
    return denote;
  };
  while (sequence(smallest).indexOf(s) !== 0) smallest++;
  return smallest;
};

console.log(freakContazSequence("dUddUDUD"))

/*
console.log(freakContazSequence("d") === 2)

console.log(freakContazSequence("D") === 3)

console.log(freakContazSequence("U") === 4)

console.log(freakContazSequence("DdDddUUdDD") === 231)

console.log(freakContazSequence("UddUDUD") === 1450)

console.log(freakContazSequence("UDUDUDUddDUUUdd") === 9193711)

console.log(freakContazSequence("ddDddUDUDUDUddDUUUdd") === 1883021696)
*/

// https://www.codewars.com/kata/collatz/train/javascript
const collatz = (n, r = [n], next = n % 2 !== 0 ? 3 * n + 1 : n / 2 ) => n > 1 ? collatz( next, [...r,next] ) : r.join('->');

/*

You may get very unlucky and get only hard numbers: try submitting 2-3 times if it times out; if it still does, probably you need to optimize your code more;

Optimisation 1: when calculating the length of a sequence, if n is odd, what 3n+1 will be ?

Optimisation 2: when looping through 1 to n, take i such that i<n/2, what will be the lenght of the sequence for 2i ?

*/