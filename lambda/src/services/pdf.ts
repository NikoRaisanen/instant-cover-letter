const pdfjs = require('pdfjs-dist/legacy/build/pdf.js')


const getContent = async (src: any): Promise<string> => {
    const fileContents = [];
    const doc = await pdfjs.getDocument(src).promise;
    const numPages = doc.numPages;
    console.log('numPages', numPages);

    for (let currPage = 1; currPage <= numPages; currPage++) {
        const page = await doc.getPage(currPage);
        const content = await page.getTextContent();
        const returned = concatStrings(content);
        fileContents.push(...returned);
    }
    
    return fileContents.join(' ');
}

const concatStrings = (content: any): string[] => {
    console.log('content items', content.items);
    return content.items.map((item: { str: any; }) => item.str);
}

// getContent("https://instantcoverletter-resumes.s3.amazonaws.com/3pageResume.pdf").then((res) => {
//     console.log('my result', res);
// });