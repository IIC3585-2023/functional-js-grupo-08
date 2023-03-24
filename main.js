
import { ProcessMarkdownFile} from "./process_markdown.js";

const args = process.argv;
ProcessMarkdownFile(args[2], args[3]);

