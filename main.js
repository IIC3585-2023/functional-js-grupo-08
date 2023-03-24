
import { ProcessMarkdownFile} from "./process_markdown.js";

const args = process.argv;


if (args[2] === undefined) {
    console.log("Especifique la ruta del archivo Markdown")
} else if (args[3] === undefined) {
    console.log("Especifique el nombre del archivo HTML")
} else {
    ProcessMarkdownFile(args[2], args[3]);
}


