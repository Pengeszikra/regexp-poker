https://www.codewars.com/kata/simple-assembler-interpreter

// https://www.codewars.com/kata/simple-assembler-interpreter/train/javascript

const simple_assembler = (
  code, 
  ip = -1,
  cpu = {}
) => {
  const regOrConst = ro => cpu[ro] !== undefined ? cpu[ro] : parseInt(ro)
  
  const parse = line => {
    let parts = line.split(/\s+/);
    let command = parts[0];
    let reg = parts[1];
    let extra = parts[2] ? regOrConst(parts[2]) : 0;
    return { command, reg, extra };
  } 

  const rules = {
    mov(run){ cpu[run.reg] = regOrConst(run.extra) },
    inc(run){ cpu[run.reg] ++ },
    dec(run){ cpu[run.reg] -- },
    jnz(run){ 
			if( cpu[run.reg] != 0){ 				
				ip += regOrConst(run.extra)-1;				
			} 
		},
  }

  for(;++ip<code.length;){ 
    let run = parse(code[ip]);     
    rules[run.command] && rules[run.command]( run );
  };
  
  return cpu;
};

// const test = (a,b) => a === b

console.log(simple_assembler(['mov a 5','inc a','dec a','dec a','jnz a -1', 'inc a']) )  
  // {'a': 1}

console.log(simple_assembler(['mov a -10','mov b a','inc a','dec b','jnz a -2'])) 
  // {'a': 0, 'b': -20}

