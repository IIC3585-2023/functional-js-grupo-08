// Función por liena (recibe una linea y devuelve una liena)
const convertirLinea = (linea) => {

    // Negrita
    const line = linea
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/__(.*?)__/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/_(.*?)_/g, '<em>$1</em>');

    /*
    //Enlaces
    linea = linea.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    // Imágenes
    linea = linea.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');
    */

    // Línea horizontal
    if (line.match(/^---$/)) {
        return '<hr>\n';
    }

    let counter =header(line,0); //  ###3 => va a desaparecer el 3
    if(counter>0){
      return `<h${counter}>${line.slice(counter+1)}</h${counter}>\n`;
    }
    else{
        return `<p>${line}</p>\n`;
    }
};

//Funcion para contar #
let header = (string, counter) => string[counter]==="#"?header(string,counter+1):counter;

//Funcion para procesar una lista
const procesarLista = (lineas) => {
    lineas = lineas.map(linea => {return linea.replace('* ', '<li>') + '</li>\n'});

    lineas.push("</ul>\n"); // agregar tabs en lo que imprime
    lineas.unshift("<ul>\n");
    return lineas;
};

//Funcion para procesar una lista ordenada
const procesarListaOrdenada = (lineas) => {
    let counter = 0;
    lineas = lineas.map(linea => {
      counter++;
      return linea.replace(`${counter}. `, '<li>') + '</li>\n'
    });
    lineas.push("</ol>\n");
    lineas.unshift("<ol>\n");
    return lineas;
};

// Funcion para procesar un bloque *k hfhdifhe
export function procesarBloque(lineas) {
    if (lineas[0].trim()[0] === "*") {
        //procesar lista
        return procesarLista(lineas);
    }
    else if (lineas[0].trim()[0] === "1" && lineas[0].trim()[1] === ".") {
        //procesar lista ordenada
        return procesarListaOrdenada(lineas);
    }
    else {
        //procesar lineas
        return lineas.map(linea => convertirLinea(linea));
    }
};

