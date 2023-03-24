// Función por liena (recibe una linea y devuelve una liena)
const convertirLinea = (linea) => {

    /*
    //Enlaces
    linea = linea.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    // Imágenes
    linea = linea.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');
    */
    linea = processText(linea);
    // Línea horizontal
    if (linea.match(/^---$/)) {
        return '<hr>\n';
    }

    let counter =header(linea,0);
    if(counter>0){
      return `<h${counter}>${linea.slice(counter+1)}</h${counter}>\n`;
    }
    else{
        return `<p>${linea}</p>\n`;
    }
};

const processText = (texto) =>{
        //linea vacia
        if (texto.trim() === ""){return '';}
    
        // Negrita
        texto = texto.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        texto = texto.replace(/__(.*?)__/g, '<strong>$1</strong>');
    
        // Cursiva
        texto = texto.replace(/\*(.*?)\*/g, '<em>$1</em>');
        texto = texto.replace(/_(.*?)_/g, '<em>$1</em>');
        return texto;
}
//Funcion para contar #
let header = (string, counter) => string[counter]==="#"?header(string,counter+1):counter;

//Funcion para procesar una lista
const procesarLista = (lineas) => {
    lineas = lineas.map(linea => {return processText(linea).replace('* ', `   <li>`) + '</li>\n'});

    lineas.push("</ul>\n");
    lineas.unshift("<ul>\n");
    return lineas;
};

//Funcion para procesar una lista ordenada
const procesarListaOrdenada = (lineas) => {
    let counter = 0;
    lineas = lineas.map(linea => {
      counter++;
      return processText(linea).replace(`${counter}. `, `   <li>`) + '</li>\n'
    });
    lineas.push("</ol>\n");
    lineas.unshift("<ol>\n");
    return lineas;
};

// Funcion para procesar un bloque
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

