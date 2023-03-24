// import fs from "fs";
import path from "path"
const PDFParser = require("pdf2json");

const getTextContent = (pdfData: any) => {
    let rawText = '';
    const pages = pdfData.Pages;
    console.log('number of pages: ', pages.length);
    for (let pageNum = 0; pageNum < pages.length; pageNum++) {
        const numTexts = pdfData.Pages[pageNum].Texts.length;
        // TODO: error if numTexts > some max value
        console.log(`length of text on page ${pageNum}: ${numTexts}`);
        for (let textNum = 0; textNum < numTexts; textNum++) {
            // TODO: pdfData.Pages[pageNum].Texts[textNum] is of type array, might need another loop... Hardcoding index 0 for now
            const token = pdfData.Pages[pageNum].Texts[textNum].R[0].T
            // TODO: can we remove any other useless tokens?
            if (token == "_") { continue };
            rawText = rawText.concat(token);
        }
    }

    // TODO: spaces are not handled well... maybe chatGPT could fix it?
    return decodeURIComponent(rawText);
}

// TODO(1): get file from s3 instead of hardcode
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
            resolve(finalText);
        });
        pdfParser.loadPDF(resolvedPath);
    });
}