// import fs from "fs";
import path from "path"
const PDFParser = require("pdf2json");

const getTextContent = (pdfData: any) => {
    let rawText = '';
    const pages = pdfData.Pages;
    console.log('number of pages: ', pages.length);
    // for each page
    for (let pageNum = 0; pageNum < pages.length; pageNum++) {
        console.log(pageNum);
        // for each text field
        // console.log('length of Texts: ', pdfData.Pages[pageNum].Texts);
        const numTexts = pdfData.Pages[pageNum].Texts.length;
        console.log('length of texts ', numTexts);
        for (let textNum = 0; textNum < numTexts; textNum++) {
            // pdfData.Pages[pageNum].Texts[textNum] is of type array, might need another loop... Hardcoding index 0 fot now
            const token = pdfData.Pages[pageNum].Texts[textNum].R[0].T
            // TODO: can we remove any other useless tokens?
            if (token == "_") { continue };
            console.log(token)
            rawText = rawText.concat(token);
        }
    }

    // TODO: spaces are not handled well
    return decodeURIComponent(rawText);
}
const parsePdf = () => {
    const resolvedPath = path.resolve(__dirname, 'testResume.pdf')
    // console.log(resolvedPath);
    // console.log(__dirname);
    // console.log(__filename);
    // const curDir = fs.readdirSync("./");
    // console.log(curDir);
    // fs.readFile(path.resolve(__dirname, 'testResume.pdf'), (buf) => {
    //     console.log('read from testResume');
    //     console.log(buf);
    // })
    const pdfParser = new PDFParser();
    pdfParser.on("pdfParser_dataError", (errData: any) => console.error(errData) );
    pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
        // parse the data here
        // pdfData.Pages represents each page of the pdf
        // pdfData.Pages.Texts
        // console.log('Pages: ', pdfData.Pages)
        // console.log('Texts: ', pdfData.Pages[0].Texts[0].R[0].T)
        const finalText = getTextContent(pdfData);
        console.log('Final extracted text: ', finalText);
        // fs.writeFile("./result.txt", JSON.stringify(pdfData), () => {
        //     console.log('done reading file');
        // });
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