import _ from 'lodash';

// Función por linea (recibe una linea y devuelve una linea)
const convertLine = (line) => {
    // Línea horizontal
    if (line.match(/^---$/)) {
        return '<hr>\n';
    }
    const proccesedLine = processText(line);
    const firstChar = proccesedLine.split(" ")[0];
    if (countHashtags(firstChar) === firstChar.length){
        return `<h${firstChar.length}>${proccesedLine.slice(firstChar.length+1)}</h${firstChar.length}>\n`;
    }
    else{
        return `<p>${proccesedLine}</p>\n`;
    }
};

//Funcion para contar #
const countHashtags = (str) => _.countBy(str)["#"] || 0;

//Funcion para procesar texto, reemplazando negrita y italica
const processText = (text) => {
    return text
    .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*)__/g, '<strong>$1</strong>')
    .replace(/\*(.*)\*/g, '<em>$1</em>')
    .replace(/_(.*)_/g, '<em>$1</em>');
}

//Funcion para procesar una lista
const processList = (lines) => {
    const listLines = lines.map(line => {
        return processText(line.replace('* ', `   <li>`) + '</li>\n');
    });
    const result = ["<ul>\n"].concat(listLines).concat(["</ul>\n"]);
    return result;
};

//Funcion para procesar una lista ordenada
const processOrderdList = (lines) => {
    const listLines = lines.map((value,index) => {
      return processText(value.replace(`${index+1}. `, `   <li>`) + '</li>\n');
    });
    const result = ["<ol>\n"].concat(listLines).concat(["</ol>\n"]);
    return result;
};

// Funcion para procesar un bloque *k hfhdifhe
export function processBlock(lines) {
    if (lines[0].trim().split(" ")[0] === "*") {
        //procesar lista
        return processList(lines);
    }
    else if (lines[0].trim().split(" ")[0] === "1.") {
        //procesar lista ordenada
        return processOrderdList(lines);
    }
    else {
        //procesar lineas
        return lines.map(line => convertLine(line));
    }
};

