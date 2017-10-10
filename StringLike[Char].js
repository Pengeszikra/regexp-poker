// https://www.codewars.com/kata/string-like-char/train/javascript

const stringArray = fun => String.prototype[fun] = 
  function(...arr){ return ([...this][fun](...arr))};
const stringJoinerArray = fun => String.prototype[fun] = 
  function(...arr){ return ([...this][fun](...arr)).join("") };
'unshift|shift|pop|push'
  .split('|')
  .forEach( fun => stringArray(fun) );
'splice|map|join|filter|forEach|some|every|reduce|reduceRight|sort|reverse'
  .split('|')
  .forEach( fun => stringJoinerArray(fun) );