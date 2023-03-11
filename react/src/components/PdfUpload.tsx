import React, { useEffect, useState, useRef, useCallback } from 'react';
const { Buffer } = require('buffer');
const pdfjsLib = require("pdfjs-dist/build/pdf");
const pdfjsWorker = require("pdfjs-dist/build/pdf.worker.entry");

const PdfUpload = (props: any) => {
    const parsePdf = async (file: any) => {
        pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
        console.log('type of file', typeof file);
        const buffer = Buffer.from(file);
        console.log('buffer', buffer);
        // const pdfData = atob(file);
        // console.log(pdfData);
        // const fileData = fileReader.readAsArrayBuffer(buffer);
        const pdf = await pdfjsLib.getDocument(buffer);
        const numPages = pdf.numPages;
        const pages = [];
        for (let i = 1; i <= numPages; i++) {
            const page = await pdf.getPage(i);
            const text = await page.getTextContent();
            pages.push(text.items.map((item: any) => item.str).join(' '));
        }
        console.log('pages', pages);
        return pages;
    }

    return (
        <div className="pdf-upload">
            <h1>Upload a pdf</h1>
            <p className="titles">Try going back to the home page and try again.</p>
            <p style={{"fontSize": "14px", "paddingBottom": "25px"}}>{props.msg}</p>
            <button onClick={() => parsePdf('./test.pdf')}>
                Take me back
            </button>
        </div>
    );
}

export default PdfUpload;