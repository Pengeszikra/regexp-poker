/*

JS const instead of class
-------------------------
coding without this

*/

const clazz = config => {
  const foo = 32189;
  const conf = config;

  const instance = () => ({
      set foo(v){ foo = v; },
      get foo(){ return foo; },
      get config(){ return conf; },
  })
  return instance();
}

// export default clazz

let c = clazz()
console.log( c.foo )
// c.foo = 34874
console.log( c.foo )

const clazzShorter = config => {
  const foo = 32189;
  return ({
      get foo(){ return foo; }  
  });
}

// solve new call problem with function wrapper

function clazzWrapper(config){ return clazz(config) }

cc = new clazzWrapper(1)
console.log( cc.foo )
console.log( cc.config )
c2 = new clazzWrapper(2)
console.log( c2.config )
c3 = clazz('first')
console.log( c3.config )
c4 = clazz('second')
console.log( c4.config )

/* good questions:

    -how can I compose these function ?

*/    