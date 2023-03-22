// Función por liena (recibe una linea y devuelve una liena)
const convertirLinea = (linea) => {
      
    //linea vacia
    if (linea.trim() === ""){return '';}
    
    // Negrita
    linea = linea.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    linea = linea.replace(/__(.*?)__/g, '<strong>$1</strong>');

    // Cursiva
    linea = linea.replace(/\*(.*?)\*/g, '<em>$1</em>');
    linea = linea.replace(/_(.*?)_/g, '<em>$1</em>');

    /*
    //Enlaces
    linea = linea.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    // Imágenes
    linea = linea.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');
    */

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

//Funcion para contar #
let header = (string, counter) => string[counter]==="#"?header(string,counter+1):counter;

//Funcion para procesar una lista
const procesarLista = (lineas) => {
    lineas = lineas.map(linea => {return linea.replace('* ', '<li>') + '</li>\n'});

    lineas.push("</ul>\n");
    lineas.unshift("<ul>\n");
    return lineas;
}

const procesarListaOrdenada = (lineas) => {
    let counter = 0;
    lineas = lineas.map(linea => {
      counter++;
      return linea.replace(`${counter}. `, '<li>') + '</li>\n'
    });
    lineas.push("</ol>\n");
    lineas.unshift("<ol>\n");
    return lineas;
}

// Funcion para procesar un bloque
const procesarBloque = (lineas) => {
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
}

// Script para correr un ejemplo
const convertirMarkdownAHtml = (textoMarkdown) => {
    //separar lineas
    const lineas = textoMarkdown.split('\n');
    
    const lineasHtml = procesarBloque(lineas);

    //const lineasHtml = lineas.map(convertirLinea);
    const resultadoHtml = lineasHtml.join('');
    return resultadoHtml;
};

// Ejemplo del profesor
const textoMarkdown = `
# El formato Markdown
## Parte 1
El formato de markdown es ampliamente utilizado porque permite describir un **contenido en forma estructurada** en forma sencilla.


Por ejemplo se puede usar en *GitHub* para documentar el código, escribir manuales, etc.


## Parte 2
Markdown puede ser usado para muchas cosas. Por ejemplo la gente lo utiliza para


* crear páginas web
* publicar documentos, 
* escribir notas
* hacer presentaciones
* redactar correos
* generar documentación técnica
* escribir libros 

`;

const textoBloque = `# El formato Markdown 
## Parte 1
El formato de markdown es ampliamente utilizado porque permite describir un **contenido en forma estructurada** en forma sencilla.`;

const textoLista = `* crear páginas web
* publicar documentos, 
* escribir notas
* hacer presentaciones
* redactar correos
* generar documentación técnica
* escribir libros `;

const textoListaORD = `1. Primer elemento
2. Segundo elemento 
3. Tercer elemento`;
//corre funcion y printea retorno en consola

const resultadosBloque = convertirMarkdownAHtml(textoBloque);
console.log(resultadosBloque);

const resultadosLista = convertirMarkdownAHtml(textoLista);
console.log(resultadosLista);

const resultadosListaORD = convertirMarkdownAHtml(textoListaORD);
console.log(resultadosListaORD);
