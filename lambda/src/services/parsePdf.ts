import consumers from 'node:stream/consumers'
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import path from "path"
import { readFileSync, writeFileSync } from 'fs';
import Constants from '../Constants';
import type { Readable } from 'stream';
const { RESUME_BUCKET } = Constants;
const PDFParser = require("pdf2json");

// // Apparently the stream parameter should be of type Readable|ReadableStream|Blob
// // The latter 2 don't seem to exist anywhere.
// async function streamToString (stream: Readable): Promise<string> {
//     return await new Promise((resolve, reject) => {
//       const chunks: Uint8Array[] = [];
//       stream.on('data', (chunk) => chunks.push(chunk));
//       stream.on('error', reject);
//       stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
//     });
//   }

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
export const parsePdf = async (s3Key: string) => {
    // TODO: parse the s3 file instead of hardcoded file
    return new Promise(async (resolve, reject) => {
        console.log('before s3 call');
        const client = new S3Client({
            region: 'us-east-1',
        })
        const cmd = new GetObjectCommand({
            Bucket: RESUME_BUCKET,
            Key: s3Key,
        });
        const { Body } = await client.send(cmd);
        console.log('after s3 call');
        // await streamToString(Body as Readable);
        // pdf.Body?.pipe(createWriteStream('/tmp/')
        const buffer = await consumers.buffer(Body as Readable);
        console.log('buffer: ', buffer);
        console.log('before writing to tmp')
        writeFileSync('/tmp/filename.pdf', buffer, 'binary');
        console.log('after writing to tmp');
        
        // read file to verify it was written
        const myFile = readFileSync('/tmp/filename.pdf', 'binary');
        console.log('printing myFile: ', myFile);
        const resolvedPath = path.resolve('/tmp/', 'filename.pdf')
        console.log('resolvedPath: ', resolvedPath);
        const pdfParser = new PDFParser();
        pdfParser.on("pdfParser_dataError", (errData: any) => {1
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