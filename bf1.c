#include  <stdio.h>
#include  <string.h>

#define   BRANFUCK_SET "<>[]+-.,"
#define   EGYEB "sima defek összeadása: "
// never press F5!!

int
isBrainfuck (const char letter) {
    const char* brainfuckSet = BRANFUCK_SET;
    for(;*brainfuckSet;brainfuckSet++) if(*brainfuckSet == letter) return 1;
    return 0;
}

void 
filterCharset (const char* source) {
    for( ;*source;source++ ) if(strchr(BRANFUCK_SET, *source)) printf("\n[%c:%X]", *source, *source);    
}

const char*
constCharAdd ( const char* a, const char* b) {
    //char result[strlen(a) + strlen(b) + 1];
    const size_t asize = strlen(a);
    const size_t bsize = strlen(b);
    const size_t size = asize + bsize + 1;
    char * result = (char *)malloc(size);
    strcpy( result, a );
    strcpy( result + asize, b );
    return result;
}
/*
const char* const constCharAdd2( const char* a, const char* b, char* const dst, size_t* len)
{
    const size_t asize = strlen(a);
    const size_t bsize = strlen(b);
    const size_t size = asize + bsize + 1;

    if ( dts == NULL )
    {
        *len = size;
        return NULL;
    }
    
    assert( *len >= size && "Size too small" );
    
    strncpy( dts, a, asize );
    strncpy( dts + asize, b, bsize );
    
    return dst;
}

typedef void(*cb_free)( void* d );

struct sRefObject
{
    cb_free free;
    
    int RefCount;
    void* Data;
};
*/
#define DH_REF( o ) do { o.RefCount++; } while( false )
#define DH_UNREF( o ) do { o.RefCount--; \
                           if ( o.RefCount == 0 ) \
                           { \
                               if ( o.free != NULL ) \
                               { \
                                   o.free( o.Data ); \
                               } \
                               else \
                               { \
                                   free( o.Data ); \
                               } \
                           } \
                         } while( false )

#define DH_CREF( n ) do { sRefObject n; n.free = NULL; n.Data = NULL; } while ( false )
#define DH_REFDATA( o ) o.Data
/*
sRefObject constCharAdd( const char* a, const char * b )
{
    DH_CREF( test );
    DH_REFDATA( test ) = malloc( strlen( a ) + strlen( b ) + 1 );
    
    const size_t asize = strlen(a);
    const size_t bsize = strlen(b);
    const size_t size = asize + bsize + 1;
    char * result = (char *)malloc(size);
    strcpy( DH_REFDATA( test ), a );
    strcpy( (char*)DH_REFDATA( test ) + asize, b );
    
    DH_REF( test );
    return test;
}

sRefOjbect obj = constCharAdd( "asd", "qwqwe" );
DH_UNREF( obj );

{
    size_t l = 0;
    consCharAdd2( "aa", "bbb", NULL, &l );
    char* p = (char*)malloc( l );
    consCharAdd2( "aa", "bbb", p, &l );
    buff.
    
}
*/

const char* 
brainf (const char* source) {
    const char* extra = "Ez az eleje {";
    const char* result = constCharAdd(source, extra);
        //[strlen(source)+strlen(extra)+1];
    
    return result;
}

void 
shouldBe (const char* input, const char* result) {
    printf("\n___[ %s ]___\n%s\n\n%s", input, result, brainf(input));
    // static int count = 0; count ++; printf("=={%i}",count); // https://infoc.eet.bme.hu/ea08/#1  static var of function !!!
}

void 
test () {
    printf("\n\n");
    shouldBe ("++++", "*p += 4;\n");
    shouldBe ("----", "*p -= 4;\n");
    shouldBe (">>>>", "p += 4;\n");
    shouldBe ("<<<<", "p -= 4;\n");
    /*
    shouldBe (".", "putchar(*p);\n");
    shouldBe (",", "*p = getchar();\n");
    shouldBe ("[[[]]", "Error!");
    shouldBe ("[][]", "");
    shouldBe ("[.]", "if (*p) do {\n  putchar(*p);\n} while (*p);\n");
    */
}

int 
main(void) {
    filterCharset("  <>[]+-., szuper ezt is kiszuri ----");
    test();    
    char plusz[] = EGYEB BRANFUCK_SET;    
    printf("\n%s",plusz);
    return 0;
}


/*
Hogyan lehetne C-ben egyszerűen összeadni két dinamikus char[]-t úgy, hogy ne kelljen a felhasználó helyen törődni a free-el ?

type* functionName( p1, p2 ){
  type* some = malloc(type_size);
  some = working(p1);
  return some;
}

type* z = functionName(a, b);
other(z);
free(z);





*/