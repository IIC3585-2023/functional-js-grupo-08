var fs = require('fs');

// IMPORTANTE HAY QUE HACERLO CON LINUX SALTO DE LINEAS SON TRATADOS DE MANERA DISTINTA CON WINDOWS Y MACOS

const content = fs.readFileSync('test.md', {encoding:'utf8', flag:'r'});
const uwu = content
    .split('\n\n')
    .map((l) =>l.split("\n"))
    .filter(n => JSON.stringify(n) !== '[""]' )
    .map(block => block.filter(line => line));
console.log(uwu)

function ProcessMarkdownFile(markdownFilePath){
    const content = fs.readFileSync(markdownFilePath, {encoding:'utf8', flag:'r'});
    const contentByBlocks = content
        .split('\n\n')
        .map((l) =>l.split("\n"))
        .filter(n => JSON.stringify(n) !== '[""]' )
        .map(block => block.filter(line => line));
    // Queda testear y ver ConvertHtmlBlock
    const htmlFileContent = contentByBlocks
        .map(block => ConvertToHtmlBlock(block))
        .map(htmlBlock => htmlBlock.join("\n"))
        .join("\n");
    // CAMBIAR NOMBRE DE ARCHIVO
    fs.writeFile('output/test.html',htmlFileContent , (err) => {
        if (err) throw err;
    })
    return console.log(`file succesfully saved at output/test.html`)

};
function ProcessMarkDownRawText(markdownRawText){
    const contentByBlocks = markdownRawText
        .split('\n\n')
        .map((l) =>l.split("\n"))
        .filter(n => JSON.stringify(n) !== '[""]' )
        .map(block => block.filter(line => line));
    const htmlBlocks = contentByBlocks.map(block => ConvertToHtmlBlock(block));
    return htmlBlocks.map(htmlBlock => htmlBlock.join("\n")).join("\n")
};
