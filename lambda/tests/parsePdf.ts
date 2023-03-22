import fs from "fs";
import path from "path"
const PDFParser = require("pdf2json");


const parsePdf = () => {
    const resolvedPath = path.resolve(__dirname, 'testResume.pdf')
    console.log(resolvedPath);
    console.log(__dirname);
    console.log(__filename);
    const curDir = fs.readdirSync("./");
    console.log(curDir);
    fs.readFile(path.resolve(__dirname, 'testResume.pdf'), (buf) => {
        console.log('read from testResume');
        console.log(buf);
    })
    const pdfParser = new PDFParser();
    pdfParser.on("pdfParser_dataError", (errData: any) => console.error(errData) );
    pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
        fs.writeFile("./result.json", JSON.stringify(pdfData), () => {
            console.log('done reading file');
        });
    });
    pdfParser.loadPDF(resolvedPath);


    // fs.readFile("./testResume.pdf", (err, pdfBuffer) => {
    //     if (!err) {
    //       const res = pdfParser.parseBuffer(pdfBuffer);
    //       console.log(res)
    //     }
    //   })
}

console.log('executing main')
parsePdf();