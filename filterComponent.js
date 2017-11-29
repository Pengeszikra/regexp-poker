let testData =  {
  selector : {
    selected: 0,
    options: ['- add selector -','Work','Fork','Dan']
  },
  tag : {
    selected: 0,
    options: ['- tag -','-work-','-fork-','-dan-']
  }
}

function filterLine(selector, tag){  

  let visible = false

  const choose = (selector, m) => selector.selected = m // || ~~(Math.random()*selector.options.length)

  return ({
    hide(){ visible = false },
    show(){ visible = true },
    doesSelect(m){
       selector
       choose(selector, m) 
       selector
       m
    },
    doesTag(m){ choose(tag, m) },
    doesOff(){ visible = false },
    dataProvider(data){ 
      selector = data.selector
      tag = data.tag 
      selector
    },
    stateButton(){},
    get render(){ return visible ? `${selector.options[selector.selected]} :: ${tag.options[tag.selected]}` : '' },
    get isVisible(){ return visible },
    get selector(){return selector}
  })  
}

function filtersComponent( state ){



  let ui = [
    filterLine(),
    filterLine(),
    filterLine(),    
  ]

  const filterResults = views => views
    .filter( view => view.isVisible )
    .map(  view => view.result  ).join('+')

  let name = "?name=ggg";

  const api = ({
    dataProvider( data ){ 
      ui.map( v=> v.dataProvider(data) )   
      ui[0].show()
    },
    doesSelect(n, m){ 
      ui[n].show()
      ui[n].doesSelect(m) 
    },
    doesTag(n, m){ ui[n].doesTag(m) },
    doesOff(n){  ui[n].doesOff() },
    get render(){ return ui.map( v => v.render ) },
    get embedCode(){ return `${name}${filterResults(ui)}` },
    get u(){ return ui }
  })
  return api
}

let filter = filtersComponent({})

// test sequence

filter.dataProvider(testData)
console.log(filter.render)
filter.doesSelect(0,1)
filter.doesTag(0,0)
console.log(filter.render)
filter.doesSelect(1,2)
filter.doesTag(1,3)
console.log(filter.render)
filter.doesSelect(2,3)
filter.doesTag(2,1)
console.log(filter.render)
filter.doesOff(1)
console.log(filter.render)
console.log(filter.embedCode)

console.log(filter.u[0] === filter.u[1])
console.log(filter.u[0].selector)
console.log(filter.u[1].selector)

// nem mukodik az elkepzelesem, met let-ek kozosek