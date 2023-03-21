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

    if (linea.match(/^#\s/)) {
        return `<h1>${linea.slice(2)}</h1>\n`;
    }
    else if (linea.match(/^##\s/)) {
        return `<h2>${linea.slice(3)}</h2>\n`;
    }
    else if (linea.match(/^###\s/)) {
        return `<h3>${linea.slice(4)}</h3>\n`;
    }
    else if (linea.match(/^####\s/)) {
        return `<h4>${linea.slice(5)}</h4>\n`;
    }
    else if (linea.match(/^#####\s/)) {
        return `<h5>${linea.slice(6)}</h5>\n`;
    }
    else if (linea.match(/^######\s/)) {
        return `<h6>${linea.slice(7)}</h6>\n`;
    }
    else{
        return `<p>${linea}</p>\n`;
    }
};

// Script para correr un ejemplo
const convertirMarkdownAHtml = (textoMarkdown) => {
    //separar lineas
    const lineas = textoMarkdown.split('\n');
    //
    const lineasHtml = lineas.map(convertirLinea);
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

//corre funcion y printea retorno en consola
const resultadoHtml = convertirMarkdownAHtml(textoMarkdown);
console.log(resultadoHtml);