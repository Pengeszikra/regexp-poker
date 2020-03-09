let isAtom = /^(H|He|Li|Be|B|C|N|O|F|Ne|Na|Mg|Al|Si|P|S|Cl|Ar|K|Ca|Sc|Ti|V|Cr|Mn|Fe|Co|Ni|Cu|Zn|Ga|Ge|As|Se|Br|Kr|Rb|Sr|Y|Zr|Nb|Mo|Tc|Ru|Rh|Pd|Ag|Cd|In|Sn|Sb|Te|I|Xe|Cs|Ba|La|Ce|Pr|Nd|Pm|Sm|Eu|Gd|Tb|Dy|Ho|Er|Tm|Yb|Lu|Hf|Ta|W|Re|Os|Ir|Pt|Au|Hg|Tl|Pb|Bi|Po|At|Rn|Fr|Ra|Ac|Th|Pa|U|Np|Pu|Am|Cm|Bk|Cf|Es|Fm|Md|No|Lr|Rf|Db|Sg|Bh|Hs|Mt|Ds|Rg|Cn|Nh|Fl|Mc|Lv|Ts|Og)$/
let isMolecule = /(H|He|Li|Be|B|C|N|O|F|Ne|Na|Mg|Al|Si|P|S|Cl|Ar|K|Ca|Sc|Ti|V|Cr|Mn|Fe|Co|Ni|Cu|Zn|Ga|Ge|As|Se|Br|Kr|Rb|Sr|Y|Zr|Nb|Mo|Tc|Ru|Rh|Pd|Ag|Cd|In|Sn|Sb|Te|I|Xe|Cs|Ba|La|Ce|Pr|Nd|Pm|Sm|Eu|Gd|Tb|Dy|Ho|Er|Tm|Yb|Lu|Hf|Ta|W|Re|Os|Ir|Pt|Au|Hg|Tl|Pb|Bi|Po|At|Rn|Fr|Ra|Ac|Th|Pa|U|Np|Pu|Am|Cm|Bk|Cf|Es|Fm|Md|No|Lr|Rf|Db|Sg|Bh|Hs|Mt|Ds|Rg|Cn|Nh|Fl|Mc|Lv|Ts|Og)|(0..9)/

let parseFormula = /(H|He|Li|Be|B|C|N|O|F|Ne|Na|Mg|Al|Si|P|S|Cl|Ar|K|Ca|Sc|Ti|V|Cr|Mn|Fe|Co|Ni|Cu|Zn|Ga|Ge|As|Se|Br|Kr|Rb|Sr|Y|Zr|Nb|Mo|Tc|Ru|Rh|Pd|Ag|Cd|In|Sn|Sb|Te|I|Xe|Cs|Ba|La|Ce|Pr|Nd|Pm|Sm|Eu|Gd|Tb|Dy|Ho|Er|Tm|Yb|Lu|Hf|Ta|W|Re|Os|Ir|Pt|Au|Hg|Tl|Pb|Bi|Po|At|Rn|Fr|Ra|Ac|Th|Pa|U|Np|Pu|Am|Cm|Bk|Cf|Es|Fm|Md|No|Lr|Rf|Db|Sg|Bh|Hs|Mt|Ds|Rg|Cn|Nh|Fl|Mc|Lv|Ts|Og)|(\d+)|\{|\}|\[|\]|\(|\)/g

console.log(isAtom.test("He"))
console.log(isMolecule.test("K4[ON(SO3)2]2"))
console.log("As2{Be4C5[BCo3(CO2)3]2}4Cu5".match(parseFormula))


console.log("As2{Be4C5[BCo3(CO2)3]2}4Cu5".match(/([A-Z][a-z]*\d*)|(\W\d*)/g))


let pf = molecula => molecula.match(/([A-Z][a-z]*\d*)|(\W\d*)/g).reduce( (r,e,i)=>{   
let bont = e.match( /([A-Z][a-z]*)(\d*)|(|\W)(\d*)/ )
  bont[2] = bont[2] ? bont[2] : 1
  r[bont[1]] = r[bont[1]] ? r[bont[1]] + parseInt(bont[2]) : parseInt(bont[2]) ; 
  return r
} , {} )

console.log( pf("B2H6") ) 

//{[Co(NH3)4(OH)2]3Co}(SO4)3 Should parse hexol sulphate: {[Co(NH3)4(OH)2]3Co}(SO4)3

/*
H2O - Should parse water
B2H6 - Should parse diborane: B2H6
C6H12O6 - Should parse glucose: C6H12O6
Mo(CO)6 - Should parse molybdenum hexacarbonyl: Mo(CO)6
Mg(OH)2 - Should parse magnesium hydroxide: Mg(OH)2
Fe(C5H5)2 - Should parse ferrocene: Fe(C5H5)2
(C5H5)Fe(CO)2CH3 - Should parse cyclopentadienyliron dicarbonyl dimer: (C5H5)Fe(CO)2CH3
Pd[P(C6H5)3]4 - Should parse tetrakis(triphenylphosphine)palladium(0): Pd[P(C6H5)3]4
K4[ON(SO3)2]2 - Should parse Fremy's salt: K4[ON(SO3)2]2
As2{Be4C5[BCo3(CO2)3]2}4Cu5 - Should parse really weird molecule: As2{Be4C5[BCo3(CO2)3]2}4Cu5
{[Co(NH3)4(OH)2]3Co}(SO4)3 - Should parse hexol sulphate: {[Co(NH3)4(OH)2]3Co}(SO4)3
*/

let parseMolecule = formula => 1


8930945057