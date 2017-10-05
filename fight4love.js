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
    alives.filter( (na,i,ar) => 
      killers.filter( kill => { 
        let dif = Math.abs(i-ar.indexOf(kill));
        return dif!=alives.length-1 && dif!=1;
      }).length == killers.length
    )
  }  	
  //while( alives.length > 1 ){
  	const round = ()=> { fight();console.log( alives.join(' - ') );turn() };
  //}
  //return alives.join('');
  round();
  round();
  round();
}

// duel(["Asda Btry","Csrt Dks","Gjhgj Hewr","Kewrwe Lhgj","Osdf Psde","Mretb Njhk","Isdf Jjhkhj","Eyui Ferd"],["CD","AB","MN","IJ","GH","EF","OP","KL"])

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

function duel(names, guns){  
  const getGun = name => name.replace(/[a-z]|\s/g,'');
  const duelist = Object.assign({},...names.map( name => { 
    let gun = getGun(name); 
    return {[gun]:{name,gun}};
  }));
  let alives = [...names].map( name => getGun(name) );//console.log(alives);
  //console.log(duelist);
  const turn = () => { let gun = guns.pop(); guns.unshift(gun) }; 
  const fight = () => {
    let killers = guns.filter( (gun,i) => alives.indexOf(gun) >= 0 && duelist[getGun(names[i])].gun === gun );
	console.log( `${alives.join('-')}\n${guns.join('-')}\n---\n${killers.join('-')}` );
    alives = alives.filter( (na,i,ar) => 
      killers.filter( kill => { 
        let dif = Math.abs(i-ar.indexOf(kill));
        return dif!=alives.length-1 && dif!=1;
      }).length == killers.length
    )
  }  	
  while( alives.length > 1 ){
    fight();
    turn();
  }
  return alives.map( gun => duelist[gun].name ).join('');
}

// finally done
function duel(names, guns){  
  const getGun = name => name.replace(/[a-z]|\s/g,'');
  const duelist = Object.assign({},...names.map( name => { 
    let gun = getGun(name); 
    return {[gun]:{name,gun}};
  }));
  let alives = [...names].map( name => getGun(name) );  
  const turn = () => { let gun = guns.pop(); guns.unshift(gun) }; 
  const fight = () => {
    let killers = guns.filter( (gun,i) => alives.indexOf(gun) >= 0 && duelist[getGun(names[i])].gun === gun );
    console.log( `${alives.join('-')}\n${guns.join('-')}\n---\n${killers.join('-')}` );
    alives = alives.filter( (na, i, ar) => 
      killers.filter( kill => { 
        let dif = Math.abs(i-ar.indexOf(kill));
        return dif != alives.length-1 && dif != 1;
      }).length == killers.length
    )
  }  	
  let spin = 1;
  while( alives.length > 1 ){
    fight();
    for(var i=0;i<spin;i++){
      turn();
    }
    spin++;
  }
  return alives.map( gun => duelist[gun].name ).join('');
}

duel([
  "Tgpev Qanp","Itwxf Dqfa","Hpjgo Brno","Cahejqs Wyfif",
  "Ffgc Rurwtj","Kfimii Xmtr","Smpym Uoyuqf","Ezlitl Vczcbu"],
  ["TQ","CW","SU","HB","EV","FR","KX","ID"] 
)
