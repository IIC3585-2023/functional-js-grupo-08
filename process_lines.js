// Función por liena (recibe una linea y devuelve una liena)
const convertLine = (line) => {
    /*
    //Enlaces
    line = line.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    // Imágenes
    line = line.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');
    */
    
    // Línea horizontal
    if (line.match(/^---$/)) {
        return '<hr>\n';
    }
    line = processText(line);
    let counter =headerCounter(line,0); //  ###3 => va a desaparecer el 3
    if(counter>0){
      return `<h${counter}>${line.slice(counter+1)}</h${counter}>\n`;
    }
    else{
        return `<p>${line}</p>\n`;
    }
};

//Funcion para contar #
let headerCounter = (string, counter) => string[counter]==="#"?headerCounter(string,counter+1):counter;

//Funcion para procesar texto
const processText = (text) => {
    return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.*?)_/g, '<em>$1</em>');
}

//Funcion para procesar una lista
const processList = (lines) => {
    lines = lines.map(line => {return processText(line.replace('* ', `   <li>`) + '</li>\n');});

    lines.push("</ul>\n"); // agregar tabs en lo que imprime
    lines.unshift("<ul>\n");
    return lines;
};

//Funcion para procesar una lista ordenada
const processOrderdList = (lines) => {
    let counter = 0;
    lines = lines.map(line => {
      counter++;
      return processText(line.replace(`${counter}. `, `   <li>`) + '</li>\n');
    });
    lines.push("</ol>\n");
    lines.unshift("<ol>\n");
    return lines;
};

// Funcion para procesar un bloque *k hfhdifhe
export function processBlock(lines) {
    if (lines[0].trim()[0] === "*") {
        //procesar lista
        return processList(lines);
    }
    else if (lines[0].trim()[0] === "1" && lines[0].trim()[1] === ".") {
        //procesar lista ordenada
        return processOrderdList(lines);
    }
    else {
        //procesar lineas
        return lines.map(line => convertLine(line));
    }
};

