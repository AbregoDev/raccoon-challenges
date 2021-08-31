// Dada una cadena, devuelve el primer carácter recurrente en ella,
// o nulo si no hay ningún carácter recurrente

function firstRecurrentCharacter(string) {
    let previousChar = '';
    for(const char of string) {
        if(char === previousChar) {
            return char;
        } else {
            previousChar = char;
        }
    }

    return null;
}

let cadena = 'afewdcsfrewdamkleffwacsasac';
console.log(`Primer carácter recurrente en '${cadena}' es: '${firstRecurrentCharacter(cadena)}'`)
cadena = 'sdajaa';
console.log(`Primer carácter recurrente en '${cadena}' es: '${firstRecurrentCharacter(cadena)}'`)
cadena = 'dsr3f';
console.log(`Primer carácter recurrente en '${cadena}' es: '${firstRecurrentCharacter(cadena)}'`)
cadena = 'gtjfsesastowpwp[[s';
console.log(`Primer carácter recurrente en '${cadena}' es: '${firstRecurrentCharacter(cadena)}'`)