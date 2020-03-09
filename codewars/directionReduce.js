// https://www.codewars.com/kata/550f22f4d758534c1100025a/train/javascript

const test = (a, b) => a == b;

["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"].reduce( (r, e) => 
(r.length)
? ((last = r.pop() , pair = (a,b) => ['NS','SN','EW','WE'].indexOf(a.slice(0,1)+b.slice(0,1)) >= 0 ) => 
    pair(last,e) ? [...r] : [...r,last,e]
  )()
: [e]
, [])

["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"].reduce( r,e,arr => {

} , [] )