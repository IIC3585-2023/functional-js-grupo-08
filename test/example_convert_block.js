
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
