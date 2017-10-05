// https://www.codewars.com/kata/t-dot-t-t-dot-53-fighting-for-love-knights-of-the-round/train/javascript

function duel(names, guns){
  let alives = [...names];
  const duelist = Object.assign({},...names.map( name => { 
    let gun = name.replace(/[a-z]|\s/g,''); 
    return {[name]:{name,gun}};
  }));
  console.log(duelist);
  const turn = () => { let gun = guns.pop(); guns.unshift(gun) }; 
  const fight = () => {
    let killers = guns.filter( (gun,i) => duelist[names[i]].gun === gun && alives.indexOf(names[i]) >= 0 );
    alives = alives.filter( (name,i) => killers.map( killer => { 
      let j = alives.indexOf(killer);
      return j+1 == i || j-1 == i || ( i == 0 && j == alives.lengh-1 ) || ( j == 0 && i == alives.lengh-1 );
    }).length === 0 );
  }  	
  while( alives.length > 1 ){
	fight();
    console.log( alives.join(' - ') );
    turn();
  }
  return alives.join('');
}

let alives = [..."12345678"]
let killers = [..."1"]
alives.filter( (na,i,ar) => 
  killers.filter( kill => { 
    let j = ar.indexOf(kill)    
    let dif = Math.abs(i-j)
    let alive = dif!=alives.length-1 && dif!=1	
	return alive
  }).length == killers.length
)


// duel(["Asda Btry","Csrt Dks","Gjhgj Hewr","Kewrwe Lhgj","Osdf Psde","Mretb Njhk","Isdf Jjhkhj","Eyui Ferd"],["CD","AB","MN","IJ","GH","EF","OP","KL"])