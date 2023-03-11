const pdfjs = require('pdfjs-dist/legacy/build/pdf.js')


const getContent = async (src: any) => {
    const doc = await pdfjs.getDocument(src).promise;
    const page = await doc.getPage(1);
    return await page.getTextContent();
}

const getItems = async (src: any) => {
    const content = await getContent(src);
    return content.items.map((item: { str: any; }) => item.str);
}

getItems("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf").then((res) => {
    console.log('my result', res);
});