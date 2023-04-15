import consumers from 'node:stream/consumers'
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import Constants from '../Constants';
import type { Readable } from 'stream';
const { RESUME_BUCKET } = Constants;
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
            if (pdfData.Pages[pageNum].Texts[textNum].R.length > 1) {
                console.log('pdfData.Pages[pageNum].Texts[textNum].R.length: ', pdfData.Pages[pageNum].Texts[textNum].R.length);
                console.log('pdfData.Pages[pageNum].Texts[textNum].R: ', pdfData.Pages[pageNum].Texts[textNum].R);
            }
            const token = pdfData.Pages[pageNum].Texts[textNum].R[0].T
            if (token == "_") { continue };
            rawText = rawText.concat(token);
        }
    }
    // TODO: spaces are not handled well... maybe chatGPT could fix it?
    return decodeURIComponent(rawText);
}

export const parsePdf = async (s3Key: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        const client = new S3Client({
            region: 'us-east-1',
        })
        const cmd = new GetObjectCommand({
            Bucket: RESUME_BUCKET,
            Key: s3Key,
        });
        const { Body } = await client.send(cmd);
        const buffer = await consumers.buffer(Body as Readable);
        const pdfParser = new PDFParser();
        pdfParser.on("pdfParser_dataError", (errData: any) => {1
            console.error(errData);
            reject(errData);
        });
        pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
            const finalText = getTextContent(pdfData);
            resolve(finalText);
        });
        pdfParser.parseBuffer(buffer);
    });
}