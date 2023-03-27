import { readFileSync, writeFile } from 'fs';
import {processBlock} from "./process_lines.js";
// IMPORTANTE HAY QUE HACERLO CON LINUX SALTO DE LINEAS SON TRATADOS DE MANERA DISTINTA CON WINDOWS Y MACOS
export function ProcessMarkdownFile(markdownFilePath, outpuFileName){
    const content = readFileSync(markdownFilePath, {encoding:'utf8', flag:'r'});
    const contentByBlocks = content
        .split('\n\n')
        .map((l) =>l.split("\n"))
        .filter(n => JSON.stringify(n) !== '[""]' )
        .map(block => block.filter(line => line));
    const htmlFileContent = contentByBlocks
        .map(block => processBlock(block))
        .map(htmlBlock => htmlBlock.join(""))
        .join("");
    writeFile(`output/${outpuFileName}.html`,htmlFileContent , (err) => {
        if (err) throw err;
    })
    return console.log(`file succesfully saved at output/${outpuFileName}.html`)
};

function ProcessMarkDownRawText(markdownRawText){
    //ONLY FOR TESTING
    const contentByBlocks = markdownRawText
        .split('\n\n')
        .map((l) =>l.split("\n"))
        .filter(n => JSON.stringify(n) !== '[""]' )
        .map(block => block.filter(line => line));
    const htmlBlocks = contentByBlocks.map(block => processBlock(block));
    return htmlBlocks.map(htmlBlock => htmlBlock.join("")).join("")
};

