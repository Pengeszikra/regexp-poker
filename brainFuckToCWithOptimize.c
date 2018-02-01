#include  <stdio.h>
#include  <string.h>
#include  <stdlib.h>
#define   ERROR "Error!"
#define   BRANFUCK_SET "<>[]+-.,"
#define   OPPOSITE_PAIRS "><<>+--+[]"

char * buffer;
int bufferLength = 0;
int tab = 0;

int isOppositePair(const char * code) {
    const char * pairs = OPPOSITE_PAIRS;
    int isPair = 0;
    for ( ;*pairs; pairs += 2) {
        isPair = pairs[0] == code[0] && pairs[1] == code[1];
        if (isPair) break;
    };
    return isPair;
}

int repeatCode(const char* const source) {
    const char key = *source;
    if (key == '.' || key == ',' || key == '[' || key == ']') return 1;
    const char * counter = source;
    for (;key == *counter;counter++);
    return counter - source;
}

void appendCode( int n, const char * code){    
    for(int ident=tab;ident;ident--) bufferLength += sprintf(buffer + bufferLength, "  ");
    bufferLength += n
        ? sprintf(buffer + bufferLength, code, n)
        : sprintf(buffer + bufferLength, code)
        ; 
}

const char* filter(const char* source) {
    char *filtered, *i, *e;
    filtered = malloc((char *) strlen(source) + 1);
    i = filtered;
    e = source;
    int ttab = 0;
    for(;*e;) {
        char key = *e++;
        if (strchr(BRANFUCK_SET, key)) *i++ = key;
        if (key == '[') ttab++; 
        if (key == ']') ttab--;
        if (ttab < 0) return ERROR;
        if (i>=2 && isOppositePair(i-2)) {
            i-=2;
            i[0] = '\0';
            i[1] = '\0';
        }
    }
    return filtered;
}

const char* brainfuck_to_c(const char* source) {
    //printf("%s",source, 100);
    tab = 0;  
    buffer = malloc(80000);
    bufferLength = 0;
    const char * codeStart = filter(source);    
    char * code = codeStart;
    // printf("%s\n",code);
    if (!strcmp(code,ERROR)) return ERROR;
    if (!strlen(code)) return "";
    for ( ;*code; ) {
        int repeat = repeatCode(code);
        if ( code[0] == '[' && code[1] == ']') { 
            code += 2; 
            continue; 
        } else {
            switch(*code) {
              case '.' : appendCode(0, "putchar(*p);\n"); code++; continue; break;
              case ',' : appendCode(0, "*p = getchar();\n"); code++; continue; break;
              case '[' : appendCode(0, "if (*p) do {\n"); tab++; code ++; continue;
              case ']' : tab--; appendCode(0, "} while (*p);\n"); code ++; continue;
              case '-' : appendCode(repeat, "*p -= %d;\n"); break;
              case '+' : appendCode(repeat, "*p += %d;\n"); break;
              case '<' : appendCode(repeat, "p -= %d;\n");  break;
              case '>' : appendCode(repeat, "p += %d;\n");  break;
            }
            code += repeat;
        }
    } 
    free(codeStart);
    return tab == 0
        ? buffer
        : ERROR
        ;
}


int 
main(void) {        
    //printf("\n%s\n",brainfuck_to_c("<-.[,,+]---><[][-,>[[+[],>+>..,><+[<.,+<>..-+,[[+,.><>[><><<-.-,<->>>.++<-,.<][++--,<[-,],++[,->+[-]]]]]]]]]"));
    //printf("\n%s\n",filter("<-.[,,+]---><[][-,>[[+[],>+>..,><+[<.,+<>..-+,[[+,.><>[><><<-.-,<->>>.++<-,.<][++--,<[-,],++[,->+[-]]]]]]]]]"));
    //printf("\n%s\n",brainfuck_to_c(",>,.,><+.,.,,[[[.>,,,..+-]<-+[+]+>[,[>+><-.+<[-[-],]]+.<[[><>-.[>,,+.<[[+..,++.][--+.[+[].<>[++[]..++,<]-..+>.<]-.+<-,,<,.]]>,,[.-.+>.<+,+<>>-++[,.<].],-+[]..-,..]<,-,.<,+,[<,.[-+[<+<->>.+[++--]][.[,,[]-[->.->]+,<-]].-><[,]-.><]-+]-[[+-+.]>+<].]]>>>-+>[<+>]>-[+>]<,>,><[<+]+,[.[.<>[[[>.+]..<-,><[+>]+..>>-[<->->-+>++.-++<-.[.+-,+->-],+<]+>]<.[>>]-<[>--,+,+>[.,[]<>.>[<>>-<-]-],[+]--,]<.,.+>[++],]<>>],.]-,>[-.+,[<]][,.[<,.[<>]<[++>-[<++<-.[.][[.-[]]<[>[+,[.]<,<--[++>-,[.+[.+[-<]>.[<><><>>]-.<++>[.[[<+.<->.[..<.++,>>[<++]+++>>,[<>][,.,,].+[[<]<<.<].>]<>[>,-.<+,-+.<+,-],.->[.]>[+][+->>]-++[[,<[--.>[<-]-,.+.>>]],[+++++.[<,]+.>,.>-.-+<,<>]->+>[[>+.]>,-+,,,.<+[,[-.+--->><.-+,,.>],-<>[<>+.[,>.-<>[,>..,..<-+>[[<>><<.-<-.>,-,[,+.>]>[.+,,>[--<<>[><->[[+.,<<-[+->[-++][<[-.+>>]>>-.---+,-<,+.[[>-++[]->-,-,[>.-+>[,.--]]-<].<<<-,]+]<.>]]],+-[<+..].,-,[-[.][<<++]]],[>.>],]+]]>]],[]],<,-]]--]+>>[.]][-][-+.,<-,<,>].<][+]<-][>>-,>>.[-[.]+-]-<>-[->+-.<[>.-,[..<],,+,[>>-+>+-><>[[[+<<[,,++..[,<][,[<,><.+>+,[]+]]]]]]]]]]]]]]]]]]]]]]]]"));
    printf("\n%s\n",brainfuck_to_c(",>,.,><+.,.,,[[[.>,,,..+-]<-+[+]+>[,[>+><-.+<[-[-],]]+.<[[><>-.[>,,+.<[[+..,++.][--+.[+[].<>[++[]..++,<]-..+>.<]-.+<-,,<,.]]>,,[.-.+>.<+,+<>>-++[,.<].],-+[]..-,..]<,-,.<,+,[<,.[-+[<+<->>.+[++--]][.[,,[]-[->.->]+,<-]].-><[,]-.><]-+]-[[+-+.]>+<].]]>>>-+>[<+>]>-[+>]<,>,><[<+]+,[.[.<>[[[>.+]..<-,><[+>]+..>>-[<->->-+>++.-++<-.[.+-,+->-],+<]+>]<.[>>]-<[>--,+,+>[.,[]<>.>[<>>-<-]-],[+]--,]<.,.+>[++],]<>>],.]-,>[-.+,[<]][,.[<,.[<>]<[++>-[<++<-.[.][[.-[]]<[>[+,[.]<,<--[++>-,[.+[.+[-<]>.[<><><>>]-.<++>[.[[<+.<->.[..<.++,>>[<++]+++>>,[<>][,.,,].+[[<]<<.<].>]<>[>,-.<+,-+.<+,-],.->[.]>[+][+->>]-++[[,<[--.>[<-]-,.+.>>]],[+++++.[<,]+.>,.>-.-+<,<>]->+>[[>+.]>,-+,,,.<+[,[-.+--->><.-+,,.>],-<>[<>+.[,>.-<>[,>..,..<-+>[[<>><<.-<-.>,-,[,+.>]>[.+,,>[--<<>[><->[[+.,<<-[+->[-++][<[-.+>>]>>-.---+,-<,+.[[>-++[]->-,-,[>.-+>[,.--]]-<].<<<-,]+]<.>]]],+-[<+..].,-,[-[.][<<++]]],[>.>],]+]]>]],[]],<,-]]--]+>>[.]][-][-+.,<-,<,>].<][+]<-][>>-,>>.[-[.]+-]-<>-[->+-.<[>.-,[..<],,+,[>>-+>+-><>[[[+<<[,,++..[,<][,[<,><.+>+,[]+]]]]]]]]]]]]]]]]]]]]]]]]"));
}