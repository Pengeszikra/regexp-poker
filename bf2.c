// never press F5!!
#include  <stdio.h>
#include  <string.h>

#define   BRANFUCK_SET "<>[]+-.,"

// https://infoc.eet.bme.hu/generikus/
typedef struct Item { struct Item *prev, *next; void *data; } Item;
typedef struct Chain { Item *start, *final; } Chain;

inline Item * newItem() { return (Item *) malloc(sizeof(Item)); }

inline Item*
initItem(void * data) {
    Item *item = (Item *) malloc(sizeof(Item));
    item->data = data;
    return item;
}

void
newChain (Chain *chain) {    
    chain->start = newItem();
    chain->final = newItem();
    
    chain->start->prev = NULL;    
    chain->start->next = chain->final;
    chain->start->data = NULL;
    
    chain->final->prev = chain->start;
    chain->final->next = NULL;
    chain->final->data = NULL;    
}

void log(void * pointer){printf("\n%X ",pointer);}

void 
push (Chain *chain, void * data) {
    Item *item = initItem(data);

    item->next = chain->final;
    item->prev = chain->final->prev;
    
    chain->final->prev->next = item;
    chain->final->prev = item;
}

void 
each (Chain *chain, void (*call)(void *)) { 
    Item *item;    
    for(item = chain->start->next; item != chain->final; item = item->next) {
        call(item->data);
    }
        
}

char*
mallocString(const char *string) {
    char* pointer = (char*)malloc(strlen(string)+1);
    strcpy(pointer, string);
    return pointer;
}

void printString(void *string) { printf("%s\n", (char*)string); }

void 
chainTest () {
    printf("chain test\n\n");
    Chain cc;
    newChain(&cc);

    push(&cc, mallocString("First line"));
    push(&cc, mallocString("masodik sor ..."));
    push(&cc, mallocString("-----------------"));
    push(&cc, mallocString("kezd helyre állni a történet"));
    push(&cc, mallocString("ez a láncolt módszer kezd hasznos lenni"));
    each(&cc, printString);
}

void 
filterCharset (const char* source) {
    for( ;*source;source++ ) if(strchr(BRANFUCK_SET, *source)) printf("\n[%c:%X]", *source, *source);    
}

const char*
constCharAdd ( const char* a, const char* b) {
    const size_t asize = strlen(a);
    const size_t bsize = strlen(b);
    char * result = (char *)malloc(asize + bsize + 1);
        strcpy(result, a);
        strcpy(result + asize, b);
    return result;
}

const char* 
brainf (const char* source) {
    const char* combined = constCharAdd(source, " KIHAL!" );
    printf("\n;%X; %s", combined, combined); // debug 
    return combined; // just transfer owner !! 
}

void 
shouldBe (const char* input, const char* expected) {
    char* bfResult = brainf(input);
    printf("\n___[ %s ]___\n%s\n\n%s", input, expected, bfResult);
    free(bfResult);
    // static int count = 0; count ++; printf("=={%i}",count); // https://infoc.eet.bme.hu/ea08/#1  static var of function !!!
}

void 
test () {
    printf("\n\n");
    shouldBe ("++++", "*p += 4;\n");
    shouldBe ("----", "*p -= 4;\n");
    shouldBe (">>>>", "p += 4;\n");
    /*
    shouldBe ("<<<<", "p -= 4;\n");
    shouldBe (".", "putchar(*p);\n");
    shouldBe (",", "*p = getchar();\n");
    shouldBe ("[[[]]", "Error!");
    shouldBe ("[][]", "");
    shouldBe ("[.]", "if (*p) do {\n  putchar(*p);\n} while (*p);\n");
    */
}

int 
main(void) {
    //filterCharset("  <>[]+-., szuper ezt is kiszuri ----");
    //test();    
    chainTest();
    return 0;
}