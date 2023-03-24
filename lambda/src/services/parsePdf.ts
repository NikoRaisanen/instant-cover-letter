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

export const parsePdf = () => {
    return new Promise((resolve, reject) => {
        const resolvedPath = path.resolve(__dirname, 'testResume.pdf')
        console.log('resolvedPath: ', resolvedPath);
        const pdfParser = new PDFParser();
        pdfParser.on("pdfParser_dataError", (errData: any) => {
            console.error(errData);
            reject(errData);
        });
        pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
            const finalText = getTextContent(pdfData);
            console.log('Final extracted text: ', finalText);
            resolve(finalText);
        });
        pdfParser.loadPDF(resolvedPath);
    });
}