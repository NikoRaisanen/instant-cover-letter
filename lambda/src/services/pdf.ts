const pdfjs = require('pdfjs-dist/legacy/build/pdf.js')


export const getContent = async (src: any): Promise<string> => {
    console.log('inside getContent for src: ', src)
    try {
        const fileContents = [];
        const doc = await pdfjs.getDocument(src).promise;
        const numPages = doc.numPages;

        for (let currPage = 1; currPage <= numPages; currPage++) {
            const page = await doc.getPage(currPage);
            const content = await page.getTextContent();
            const returned = concatStrings(content);
            fileContents.push(...returned);
        }

        return fileContents.join(' ');
    } catch (err) {
        console.error('error parsing pdf for content', err);
        throw new Error('Failed to parse pdf, try writing a prompt instead or ensure that the uploaded file is a valid pdf', err.message);
    }
}

const concatStrings = (content: any): string[] => {
    return content.items.map((item: { str: any; }) => item.str);
}
