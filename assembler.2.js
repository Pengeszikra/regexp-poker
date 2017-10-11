// https://www.codewars.com/kata/assembler-interpreter-part-ii

// http://www.onjava.com/pub/a/python/excerpt/PythonPocketRef/index.html

assembler = (
    source, 
    ip = 0,
    cpu = {},
    comp = { e:false, g:false },  
    stack = [],
    out = ''
  ) => {
    const code = source.split(/\n/).map( e=>e.split(';')[0].trim()).filter(e=>e.length);
    const regInt = ro => cpu[ro] !== undefined ? cpu[ro] : +ro;
    const parseLine = line => {
      let parts = line.split(/[,|\s]+/);
      return { cmd:parts[0], reg:parts[1], extra:parts.length > 2 ? parts[2] : 0, line };
    }     
    const labels = code.reduce( (r,e,i) => {
        if( e.slice(-1) === ":" ){ r[e.slice(0,e.length-1)] = i }
        return r;
    },{})
    const jump = (label, go = true) => ip = go && labels[label] ? labels[label] : ip + 1;  
    const process = {
      mov(run){ cpu[run.reg] = regInt(run.extra); ip++ },
      inc(run){ cpu[run.reg] ++; ip++ },
      dec(run){ cpu[run.reg] --; ip++ },
      add(run){ cpu[run.reg] += regInt(run.extra); ip++ },
      sub(run){ cpu[run.reg] -= regInt(run.extra); ip++ },
      mul(run){ cpu[run.reg] *= regInt(run.extra); ip++ },
      div(run){ cpu[run.reg] /= regInt(run.extra); ip++ },
      jmp(run){ ip = jump(run.reg) },
      cmp(run){ let dif = regInt(run.reg) - regInt(run.extra); comp.g = dif > 0; comp.e = dif === 0; },
      jne(run){ jump(run.reg, !comp.e) },
      je(run){ jump(run.reg, comp.e) },
      jge(run){ jump(run.reg, comp.e || comp.g) },
      jg(run){ jump(run.reg, comp.g) },
      jle(run){ jump(run.reg, !comp.g || comp.e) },
      jl(run){ jump(run.reg, !comp.g) },
      call(run){ stack.push(ip+1); jump(run.reg) },
      ret(run){ let rtn = stack.pop(); ip = rtn || ip + 1 },
      msg(run){ 
                out += run.line.match(/(^msg\s+)|(["|']([^']*)["|'])|([^,|^\s])/g).slice(1)
                    .map( e => cpu[e] ? cpu[e] : e.replace(/^'|^"|'$|"$/g,'') ).join('');
                    ;ip ++
              },
      end(run){ out+=';end;'; ip = code.length },
    }

    let n = 0;        
    for(;n++<30 && ip<code.length;){ 
      let run = parseLine(code[ip]);             
      ip            
      if (process[run.cmd]){ process[run.cmd]( run ) } else { ip++ };      
    };
    
    labels
    stack
    cpu
    out
    
    return cpu;
  };

  const Test = { assert_equals(a,b){ console.log( b, a===b );return a === b } }
  
  program = `
  ; My first program
  mov  a, 5
  inc  a
  call function
  msg  '(5+1)/2 = ', a    ; output message
  end
  
  function:
      div  a, 2
      ret
  `
  console.log(assembler(program))

  program_gcd = `
  mov   a, 81         ; value1
  mov   b, 153        ; value2
  call  init
  call  proc_gcd
  call  print
  end
  
  proc_gcd:
      cmp   c, d
      jne   loop
      ret
  
  loop:
      cmp   c, d
      jg    a_bigger
      jmp   b_bigger
  
  a_bigger:
      sub   c, d
      jmp   proc_gcd
  
  b_bigger:
      sub   d, c
      jmp   proc_gcd
  
  init:
      cmp   a, 0
      jl    a_abs
      cmp   b, 0
      jl    b_abs
      mov   c, a            ; temp1
      mov   d, b            ; temp2
      ret
  
  a_abs:
      mul   a, -1
      jmp   init
  
  b_abs:
      mul   b, -1
      jmp   init
  
  print:
      msg   'gcd(', a, ', ', b, ') = ', c
      ret
  `
  
  console.log(assembler(program_gcd))
  

  //Test.assert_equals(, '(5+1)/2 = 3')  

/*
assembler_interpreter = (
  source, 
  ip = 0,
  cpu = {},
  labels = {},
  comp = { e:false,g:false },  
  out = ''
) => {
  const code = source.split(/\n/g);
  const regInt = ro => cpu[ro] !== undefined ? cpu[ro] : +ro;
  const jumpToLabel = label => console.log(label);  
  const parse = line => {
    let parts = line.split(/\s+/);
    return { cmd:parts[0], reg:parts[1], extra:parts.length > 2 ? parts[2] : 0 };
  } 

  const rules = {
    // mov x, y - copy y (either an integer or the value of a register) into register x.
    mov(run){ cpu[run.reg] = regInt(run.extra); ip++ },
    // inc x - increase the content of register x by one.
    inc(run){ cpu[run.reg] ++; ip++ },
    // dec x - decrease the content of register x by one.
    dec(run){ cpu[run.reg] --; ip++ },
    // add x, y - add the content of the register x with y (either an integer or the value of a register) and stores the result in x (i.e. register[x] += y).
    add(run){ cpu[run.reg] += regInt(run.extra); ip++ },
    // sub x, y - subtract y (either an integer or the value of a register) from the register x and stores the result in x (i.e. register[x] -= y).
    sub(run){ cpu[run.reg] -= regInt(run.extra); ip++ },
    // mul x, y - same mith multiply (i.e. register[x] *= y).
    mul(run){ cpu[run.reg] *= regInt(run.extra); ip++ },
    // div x, y - same with integer division (i.e. register[x] /= y).
    div(run){ cpu[run.reg] /= regInt(run.extra); ip++ },
    // jmp lbl - jumps to to the label lbl.
    jmp(run){ ip = jumpToLabel(run.reg) },
    // label: - define a label position (label = identifier + ":", an identifier being a string that does not match any other command). Jump commands and call are aimed to these labels positions in the program.
    //_label(run){},
    // cmp x, y - compares x (either an integer or the value of a register) and y (either an integer or the value of a register). The result is used in the conditional jumps (jne, je, jge, jg, jle and jl)
    cmp(run){ 
      let dif = regInt(run.reg) - regInt(run.extra);
      comp.g = dif > 0;
      comp.e = dif === 0;
    },
    // jne lbl - jump to the label lbl if the values of the previous cmp command were not equal.
    jne(run){ !comp.e && jumpToLabel(run.reg) },
    // je lbl - jump to the label lbl if the values of the previous cmp command were equal.
    je(run){ comp.e && jumpToLabel(run.reg) },
    // jge lbl - jump to the label lbl if x was greater or equal than y in the previous cmp command.
    jge(run){ comp.e || comp.g && jumpToLabel(run.reg) },
    // jg lbl - jump to the label lbl if x was greater than y in the previous cmp command.
    jg(run){ comp.g && jumpToLabel(run.reg) },
    // jle lbl - jump to the label lbl if x was less or equal than y in the previous cmp command.
    jle(run){ !comp.g || comp.e && jumpToLabel(run.reg) },
    // jl lbl - jump to the label lbl if x was less than y in the previous cmp command.
    jl(run){ !comp.g && jumpToLabel(run.reg) },
    // call lbl - call to the subroutine identified by lbl. When a ret is found in a subroutine, the instruction pointer should return to the instruction next to this call command.
    call(run){},
    // ret - when a ret is found in a subroutine, the instruction pointer should return to the instruction that called the current function.
    ret(run){},
    // msg 'Register: ', x - this instruction stores the output of the program. It may contain text strings (delimited by single quotes) and registers. The number of arguments isn't limited and will vary, depending on the program.
    msg(run){  },
    // end - this instruction indicates that the program ends correctly, so the stored output is returned (if the program terminates without this instruction it should return the default output: see below).
    end(run){},
    // ; comment - comments should not be taken in consideration during the execution of the program.
    //_comment(run){},
  }

  for(;ip<code.length;){ 
    let run = parse(code[ip]);     
    rules[run.cmd] && rules[run.cmd]( run );
  };
  
  return cpu;
};


const Test = { assert_equals(a,b){ console.log( b, a===b );return a === b } }

program = `
; My first program
mov  a, 5
inc  a
call function
msg  '(5+1)/2 = ', a    ; output message
end

function:
    div  a, 2
    ret
`

Test.assert_equals(assembler_interpreter(program), '(5+1)/2 = 3')

program_factorial = `
mov   a, 5
mov   b, a
mov   c, a
call  proc_fact
call  print
end

proc_fact:
    dec   b
    mul   c, b
    cmp   b, 1
    jne   proc_fact
    ret

print:
    msg   a, '! = ', c ; output text
    ret
`

Test.assert_equals(assembler_interpreter(program_factorial), '5! = 120')

program_fibonacci = `
mov   a, 8            ; value
mov   b, 0            ; next
mov   c, 0            ; counter
mov   d, 0            ; first
mov   e, 1            ; second
call  proc_fib
call  print
end

proc_fib:
    cmp   c, 2
    jl    func_0
    mov   b, d
    add   b, e
    mov   d, e
    mov   e, b
    inc   c
    cmp   c, a
    jle   proc_fib
    ret

func_0:
    mov   b, c
    inc   c
    jmp   proc_fib

print:
    msg   'Term ', a, ' of Fibonacci series is: ', b        ; output text
    ret
`

Test.assert_equals(assembler_interpreter(program_fibonacci), 'Term 8 of Fibonacci series is: 21')

program_mod = `
mov   a, 11           ; value1
mov   b, 3            ; value2
call  mod_func
msg   'mod(', a, ', ', b, ') = ', d        ; output
end

; Mod function
mod_func:
    mov   c, a        ; temp1
    div   c, b
    mul   c, b
    mov   d, a        ; temp2
    sub   d, c
    ret
`

Test.assert_equals(assembler_interpreter(program_mod), 'mod(11, 3) = 2')

program_gcd = `
mov   a, 81         ; value1
mov   b, 153        ; value2
call  init
call  proc_gcd
call  print
end

proc_gcd:
    cmp   c, d
    jne   loop
    ret

loop:
    cmp   c, d
    jg    a_bigger
    jmp   b_bigger

a_bigger:
    sub   c, d
    jmp   proc_gcd

b_bigger:
    sub   d, c
    jmp   proc_gcd

init:
    cmp   a, 0
    jl    a_abs
    cmp   b, 0
    jl    b_abs
    mov   c, a            ; temp1
    mov   d, b            ; temp2
    ret

a_abs:
    mul   a, -1
    jmp   init

b_abs:
    mul   b, -1
    jmp   init

print:
    msg   'gcd(', a, ', ', b, ') = ', c
    ret
`

Test.assert_equals(assembler_interpreter(program_gcd), 'gcd(81, 153) = 9')

program_fail = `
call  func1
call  print
end

func1:
    call  func2
    ret

func2:
    ret

print:
    msg 'This program should return -1'
`

Test.assert_equals(assembler_interpreter(program_fail), -1)

program_power = `
mov   a, 2            ; value1
mov   b, 10           ; value2
mov   c, a            ; temp1
mov   d, b            ; temp2
call  proc_func
call  print
end

proc_func:
    cmp   d, 1
    je    continue
    mul   c, a
    dec   d
    call  proc_func

continue:
    ret

print:
    msg a, '^', b, ' = ', c
    ret
`

Test.assert_equals(assembler_interpreter(program_power), '2^10 = 1024')

*/
